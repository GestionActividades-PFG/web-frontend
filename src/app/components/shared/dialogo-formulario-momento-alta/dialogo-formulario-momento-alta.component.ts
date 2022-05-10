import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";

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
      fechaInicio_Inscripcion:['',[Validators.required]],
      fechaFin_Inscripcion:['',[Validators.required]],

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

      mensajeToast.generarToast("ERROR al guardar alta de momento", "cancel", "red");

      return;
    }

    console.log(grupo.value)
    let body = {
      nombre: grupo.value.nombre,
      fechaInicio_Inscripcion:grupo.value.fecha_inicio_actividad,
      fechaFin_Inscripcion:grupo.value.fecha_fin_actividad
    };
    this.http.post(environment.serverURL + "index.php/C_GestionActividades/addMomento", body).subscribe(res => {
      //Cerrar modal
      document.getElementById("cerrar")!.click();

      mensajeToast.generarToast("Alta de momento guardada correctamente", "check_circle", "green");

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

}
