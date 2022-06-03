import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../http.service";
import {environment} from "../../../../environments/environment";
import { ToastComponent } from '../toast/toast.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dialogo-confirmacion-borrado',
  templateUrl: './dialogo-confirmacion-borrado.component.html',
  styleUrls: ['./dialogo-confirmacion-borrado.component.css']
})
export class DialogoConfirmacionBorradoComponent implements OnInit {

  @Input() idActividad: string ="";
  @Input() id: string ="";
  @Input() borrarApart: string ="";
  apartado:any=this._route.snapshot.paramMap.get('apartado');
  constructor(private http:HttpService,private _route:ActivatedRoute) {
  }

  ngOnInit(): void {}


  /**
   * Metodo para realizar la operación de borrar
   */
  borrar() {
    console.log("id: " + this.id)
    console.log("id: " + this.idActividad)
    console.log(this.borrarApart)

    let mensajeToast = new ToastComponent();

    switch (this.borrarApart) {
      case "Momentos":
        //Borramos momento seleccionado
        /**
         * Llamada para borrar momento seleccionado
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeMomento?id=" + this.id).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar el momento", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente el momento", "check_circle", "green");
          }
        });
        break;
        return;

      case "InscribirAlumno":
        /**
         * Llamada para borrar alumno inscrito seleccionado
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeInscripcionAlumno?idAlumno=" + this.id +"&idActividad=" + this.idActividad).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar la inscripción", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la inscripción", "check_circle", "green");
          }
        });
        break;
        return;

      case "InscribirClase":
        /**
         * Llamada para borrar clase inscrita seleccionada
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeInscripcionClase?idSeccion=" + this.id +"&idActividad=" + this.idActividad).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar la inscripción", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la inscripción", "check_circle", "green");
          }
        });
        break;
        return;

      default:
        //Borramos actividad seleccionada
        /**
         * Llamada para borrar actividad seleccionada
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeActividad?id=" + this.id).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar la actividad", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la actividad", "check_circle", "green");
          }
        });
        break;
    }

  }
}
