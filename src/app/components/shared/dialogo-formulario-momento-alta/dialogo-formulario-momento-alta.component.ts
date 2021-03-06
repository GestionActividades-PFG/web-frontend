import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import { AdministrarComponent } from '../../administrar/administrar.component';
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-dialogo-formulario-momento-alta',
  templateUrl: './dialogo-formulario-momento-alta.component.html',
  styleUrls: ['./dialogo-formulario-momento-alta.component.css']
})
/**
 * @file : dialogo-formulario-momento-alta.componet.ts
 * Modal para dar de alta momentos.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class DialogoFormularioMomentoAltaComponent implements OnInit {

  fecha = new Date();
  fechaMaxima=new Date(this.fecha.getFullYear()+1+"-12-31 00:00:00");
  forma!: FormGroup;


  constructor(private formBuilder:FormBuilder,private http:HttpService, private administrar:AdministrarComponent) {

    this.crearFormulario();

  }

  ngOnInit(): void {

  }
  /**
   * Método para validar los campos del formulario.
   * @param campo campo a validar
   */
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  /**
   * Método para crear el formulario de forma reactiva.
   */
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      fechaInicio_Inscripcion:['',[Validators.required]],
      fechaFin_Inscripcion:['',[Validators.required]],

    })
    this.onValueChanges();
  }

  /**
   * Método para guardar el formulario comprobando si este es valido.
   * @param formulario formulario
   */
  guardar(grupo:FormGroup,botonCerrar:HTMLButtonElement) {

    let mensajeToast = new ToastComponent();

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control,botonCerrar)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar alta de momento", "cancel", "red");

      return;
    }

    let bodyMomento = {
      nombre: grupo.value.nombre,
      fechaInicio_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaInicio_Inscripcion),
      fechaFin_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaFin_Inscripcion)
    };

    /**
     * Llamada para dar de alta momento.
     */
    this.http.post(environment.serverURL + "index.php/C_GestionActividades/addMomento", bodyMomento).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error);

        mensajeToast.generarToast("ERROR en la Base de Datos al crear el momento", "cancel", "red");

      },
      complete: () => {
        mensajeToast.generarToast("Alta de momento guardada correctamente", "check_circle", "green");
        this.administrar.restartDatos();
        botonCerrar.click();
      }
    });

    this.forma.reset();
  }

  /**
   * Resetear formulario.
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la Base de Datos.
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    let date2 = new Date(fecha);
    return new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace('T', ' ');
  }

  /**
   * Método para substraer carácteres de fécha mínima y máxima.
   * @param fecha
   */
  substringFechas(fecha:String){
    return fecha.substring(0, fecha.length - 8);
  }

  /**
   * Método para obtener values a tiempo real mientras que se está modificando el formulario, de esta manera validamos las fechas del formulario.
   */
  onValueChanges(): void {
    this.forma.valueChanges.subscribe(val=>{
      document.getElementById("fechaFin_Inscripcion")!.setAttribute("min", val.fechaInicio_Inscripcion);
      if(val.fechaInicio_Inscripcion>val.fechaFin_Inscripcion){
        this.forma.get("fechaFin_Inscripcion")?.reset()
      }
    })
  }

}
