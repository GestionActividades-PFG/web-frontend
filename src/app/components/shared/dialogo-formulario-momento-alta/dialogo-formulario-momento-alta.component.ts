import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";

@Component({
  selector: 'app-dialogo-formulario-momento-alta',
  templateUrl: './dialogo-formulario-momento-alta.component.html',
  styleUrls: ['./dialogo-formulario-momento-alta.component.css']
})
export class DialogoFormularioMomentoAltaComponent implements OnInit {

  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpService) {
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
      fechaInicio_Inscripcion:['',[Validators.required]],
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

      let body = {
        nombre: grupo.value.nombre,
        fechaInicio_Inscripcion:grupo.value.fecha_inicio_actividad,
        fechaFin_Inscripcion:grupo.value.fecha_fin_actividad
      };
      this.http.post(environment.serverURL + "index.php/C_GestionActividades/addMomento", body).subscribe(res => {
        //Cerrar modal
        document.getElementById("cerrar")!.click();

        this.generarToast(true);

        this.forma.reset();
      });
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
      contspan.innerHTML = "Alta de momento guardada correctamente";
      toast.style.backgroundColor = "green";
    }else{
      conticono.innerHTML = "cancel";
      contspan.innerHTML = "ERROR al guardar alta de momento";
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
