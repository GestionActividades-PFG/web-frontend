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
  fechaMaxima=new Date(this.fecha.getFullYear()+1+"-12-31 00:00:00");
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

    let bodyMomento = {
      nombre: grupo.value.nombre,
      fechaInicio_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaInicio_Inscripcion),
      fechaFin_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaFin_Inscripcion)
    };
    /**
     * Llamada para dar de alta momento
     */
    this.http.post(environment.serverURL + "index.php/C_GestionActividades/addMomento", bodyMomento).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error);
        //Cerrar modal
        document.getElementById("cerrar")!.click();

        mensajeToast.generarToast("ERROR en la Base de Datos al crear el momento", "cancel", "red");

      },
      complete: () => {
        //Cerrar modal
        document.getElementById("cerrar")!.click();

        mensajeToast.generarToast("Alta de momento guardada correctamente", "check_circle", "green");
      }
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
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la BBDD
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    console.log(fecha)
    let date2 = new Date(fecha).toISOString().substr(0, 19).replace('T', ' ');
    return date2
  }

  /**
   * Método para substraer carácteres de fécha mínima y máxima
   * @param fecha
   */
  substringFechas(fecha:String){
    return fecha.substring(0, fecha.length - 8);
  }

}
