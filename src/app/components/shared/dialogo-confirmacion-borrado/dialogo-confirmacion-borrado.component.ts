import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../http.service";
import {environment} from "../../../../environments/environment";
import { ToastComponent } from '../toast/toast.component';
import {ActivatedRoute} from "@angular/router";
import { AdministrarComponent } from '../../administrar/administrar.component';
import { ActividadComponent } from '../../actividad/actividad.component';

@Component({
  selector: 'app-dialogo-confirmacion-borrado',
  templateUrl: './dialogo-confirmacion-borrado.component.html',
  styleUrls: ['./dialogo-confirmacion-borrado.component.css']
})
export class DialogoConfirmacionBorradoComponent implements OnInit {

  @ViewChild("ActividadComponent")
  actividad!: ActividadComponent;

  @Input() idActividad: string ="";
  @Input() id: string ="";
  @Input() borrarApart: string ="";
  apartado:any=this._route.snapshot.paramMap.get('apartado');
  
  constructor(private http:HttpService,private _route:ActivatedRoute,
    private administrar:AdministrarComponent
  )
  {}

  ngOnInit(): void {}


  /**
   * Metodo para realizar la operación de borrar el momento, actividad o isncripción seleccionada.
   */
  borrar() {

    let mensajeToast = new ToastComponent();

    switch (this.borrarApart) {
      case "Momentos":
        /**
         * Llamada para borrar momento seleccionado.
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeMomento?id=" + this.id).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar el momento", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente el momento", "check_circle", "green");
            this.administrar.restartDatos();
          }
        });
        break;

      case "InscribirAlumno":
        /**
         * Llamada para borrar alumno inscrito seleccionado.
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeInscripcionAlumno?idAlumno=" + this.id +"&idActividad=" + this.idActividad).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar la inscripción", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la inscripción", "check_circle", "green");
            this.actividad.restartDatos();

          }
        });
        break;

      case "InscribirClase":
        console.log("index.php/C_GestionActividades/removeInscripcionClase?idSeccion=" + this.id +"&idActividad=" + this.idActividad)
        /**
         * Llamada para borrar clase inscrita seleccionada.
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeInscripcionClase?idSeccion=" + this.id +"&idActividad=" + this.idActividad).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrara la inscripción", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la inscripción", "check_circle", "green");
            this.actividad.restartDatos();

          }
        });
        break;
      default:
        /**
         * Llamada para borrar actividad seleccionada.
         */
        this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeActividad?id=" + this.id).subscribe({
          error: error => {
            console.error("Se produjo un error: ", error);
            mensajeToast.generarToast("ERROR en la Base de Datos al borrar la actividad", "cancel", "red");
          },
          complete: () => {
            mensajeToast.generarToast("Se eliminó correctamente la actividad", "check_circle", "green");
            this.administrar.restartDatos();
          }
        });
        break;
    }

  }
}
