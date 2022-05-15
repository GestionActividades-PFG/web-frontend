import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastComponent } from '../toast/toast.component';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dialogo-formulario-actividad-alta',
  templateUrl: './dialogo-formulario-actividad-alta.component.html',
  styleUrls: ['./dialogo-formulario-actividad-alta.component.css']
})
export class DialogoFormularioActividadAltaComponent implements OnInit {

  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  idMomento=this._route.snapshot.paramMap.get('apartado');

  constructor(private formBuilder:FormBuilder,private http:HttpService,private _route:ActivatedRoute) {
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
      idMomento:[this.idMomento],
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idResponsable:['',[Validators.required]],
      tipo_Participacion:['G',[Validators.required]],
      descripcion:[null,[Validators.maxLength(200)] ],
      material:[null,[Validators.maxLength(100)] ],
      numMaxParticipantes:[null],
      fechaInicio_Actividad:[null],
      fechaFin_Actividad:[null],
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

      mensajeToast.generarToast("ERROR al guardar alta de actividad", "cancel", "red");

      return;
    }

    console.log(grupo.value)

    if(grupo.value.esIndividual){
      grupo.value.esIndividual=1;
    }else{
      grupo.value.esIndividual=0;
    }

    let bodyActividad = {
      idMomento: grupo.value.idMomento,
      nombre: grupo.value.nombre,
      sexo:grupo.value.sexo,
      esIndividual:grupo.value.esIndividual,
      idResponsable:grupo.value.idResponsable,
      tipo_Participacion:grupo.value.tipo_Participacion,
      descripcion:grupo.value.descripcion,
      material:grupo.value.material,
      numMaxParticipantes:grupo.value.numMaxParticipantes,
      fechaInicio_Actividad:this.cambiarFecha(grupo.value.fechaInicio_Actividad),
      fechaFin_Actividad:this.cambiarFecha(grupo.value.fechaFin_Actividad)
    };

    console.log("body"+bodyActividad)

    this.http.post(environment.serverURL + "index.php/C_GestionActividades/addActividades", bodyActividad).subscribe(res => {

      //Cerrar modal
      document.getElementById("cerrar")!.click();

      mensajeToast.generarToast("Alta de actividad guardada correctamente", "check_circle", "green");

    });
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
  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato del tipo de dato datatime
   * @param fecha
   */
  cambiarFecha(fecha:any){
    console.log(fecha)
    let date2 = new Date(fecha).toISOString().substr(0, 19).replace('T', ' ');
    return date2
  }

}
