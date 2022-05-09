import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialogo-formulario-actividad-editar',
  templateUrl: './dialogo-formulario-actividad-editar.component.html',
  styleUrls: ['./dialogo-formulario-actividad-editar.component.css']
})
export class DialogoFormularioActividadEditarComponent implements OnInit {

  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;

  constructor(private http:HttpService,private formBuilder:FormBuilder) {

    this.crearFormulario();
    this.cargarDatosForm();

  }

  ngOnInit(): void {}

  cargarDatosForm() {

    //Coger id de la actividad
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getModificacionActividad?idActividad=1").subscribe(res => {
      console.log(res);
    });
  }


  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }

  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idMomento:['',[Validators.required]],
      idResponsable:['',[Validators.required]],
      descripcion:['',[Validators.maxLength(200)] ],
      material:['',[Validators.maxLength(100)] ],
      numMaxParticipantes:[''],
      fechaInicio_Inscripcion:[''],
      fechaFin_Inscripcion:[''],
    })
  }

  guardar(grupo:FormGroup) {

    console.log(grupo)

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
      this.generarToast(true);

      this.forma.reset();

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
      contspan.innerHTML = "Modificación de actividad guardada correctamente";
      toast.style.backgroundColor = "green";
    }else{
      conticono.innerHTML = "cancel";
      contspan.innerHTML = "ERROR al guardar modificación de actividad";
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
