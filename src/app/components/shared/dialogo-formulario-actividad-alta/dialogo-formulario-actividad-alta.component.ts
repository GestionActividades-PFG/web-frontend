import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-dialogo-formulario-actividad-alta',
  templateUrl: './dialogo-formulario-actividad-alta.component.html',
  styleUrls: ['./dialogo-formulario-actividad-alta.component.css']
})
export class DialogoFormularioActividadAltaComponent implements OnInit {

  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;

  constructor(private formBuilder:FormBuilder) {

    this.crearFormulario();

  }

  ngOnInit(): void {
  }
  /**
   * Método para validar campos del formulario
   * @param campo campo a validar
   */
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  /**
   * Método para crear el formulario de forma reactiva
   */
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idResponsable:['',[Validators.required]],
      descripcion:['',[Validators.maxLength(200)] ],
      material:['',[Validators.maxLength(100)] ],
      numMaxParticipantes:[''],
      fechaInicio_Inscripcion:[''],
      fechaFin_Inscripcion:[''],
    })
  }
  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar(grupo:FormGroup) {

    let mensajeToast = new ToastComponent();
    console.log(grupo)

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      });

      mensajeToast.generarToast("Alta de actividad guardada correctamente", "check_circle", "green");
      return;
    }

    console.log(grupo.value)
    mensajeToast.generarToast("ERROR al guardar alta de actividad", "cancel", "red");

    this.forma.reset();

    //Cerrar modal
    document.getElementById("cerrar")!.click();

  }
  /**
   * Resetear formulario
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

}
