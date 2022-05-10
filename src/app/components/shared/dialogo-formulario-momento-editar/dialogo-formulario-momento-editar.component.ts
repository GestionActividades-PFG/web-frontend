import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-dialogo-formulario-momento-editar',
  templateUrl: './dialogo-formulario-momento-editar.component.html',
  styleUrls: ['./dialogo-formulario-momento-editar.component.css']
})
export class DialogoFormularioMomentoEditarComponent implements OnInit {

  @Input() id: string ="";
  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;

  toast:any;

  constructor(private formBuilder:FormBuilder) {
    this.crearFormulario();

  }

  ngOnInit(): void {

  }
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      fechaInicio_Inscripcion:['',[Validators.required, ]],
      fechaFin_Inscripcion:['',[Validators.required]],

    })

  }
  guardar(grupo:FormGroup) {

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      })

      this.generarToast(false);

      return;
    } else {

      console.log(grupo.value)
      this.forma.reset();

      this.generarToast(true);

      //Cerrar modal
      document.getElementById("cerrar")!.click();

    }

  }

  /**
   * Resetear formulario
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

  /**
   * Generar y definir toast
   * @param tipotoast tipo de toast a mostrar
   */
  generarToast(tipotoast:boolean){
    //Visualizamos toast
    let toast:any=document.getElementById("toast");
    toast.style.display = "block";
    let conticono:any= document.getElementById("icono");
    let contspan:any= document.getElementById("mensaje");

    //Caracteristicas de toast
    if(tipotoast){
      conticono.innerHTML = "check_circle";
      contspan.innerHTML = "Modificación de momento guardada correctamente";
      toast.style.backgroundColor = "green";
    }else{
      conticono.innerHTML = "cancel";
      contspan.innerHTML = "ERROR al guardar modificación de momento";
      toast.style.backgroundColor = "red";
    }

    //Ocultamos toast al pasar 5 segundos
    setTimeout(this.ocultar, 4000,toast);
  }
  /**
   * Método para ocultar toast al pasar 5 segundos
   * @param toast toast que se encuentra visible actualmente
   */
  ocultar(toast:any){
    toast.style.display = "none";
  }

}
