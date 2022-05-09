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

  ngOnInit(): void {
  }

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

      alert("no ha sido posible guardarlo")
      return;
    } else {

      console.log(grupo.value)
      this.forma.reset();
      alert("guardado")
    }

  }
  resetForm(forma: FormGroup) {
    forma.reset();
  }

}
