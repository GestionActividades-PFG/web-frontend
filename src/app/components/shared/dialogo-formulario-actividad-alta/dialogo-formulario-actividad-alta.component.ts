import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialogo-formulario-actividad-alta',
  templateUrl: './dialogo-formulario-actividad-alta.component.html',
  styleUrls: ['./dialogo-formulario-actividad-alta.component.css']
})
export class DialogoFormularioActividadAltaComponent implements OnInit {

  fecha = new Date();
  fechaMinima = this.fecha.getFullYear() ;
  fechaMaxima = this.fecha.getFullYear() + "-12-31";
  forma!: FormGroup;
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
      nombre:['',[Validators.required, Validators.minLength(5)]],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idMomento:['',[Validators.required]],
      idResponsable:['',[Validators.required]],
      descripcion:[''],
      material:[''],
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

      alert("no ha sido posible guardarlo")
      return;
    } else {

      console.log(grupo.value)
      this.forma.reset();
      alert("guardado")
    }

  }
}
