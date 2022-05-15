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
    console.log(this.borrarApart)

    if(this.borrarApart=="Momentos"){
      this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeMomento?id=" + this.id).subscribe( () => {

        console.log(document.getElementById("cerrar"))
        //Cerrar modal
        document.getElementById("cerrar")!.click();

        let mensajeToast = new ToastComponent();

        mensajeToast.generarToast("Se eliminó correctamente el momento", "check_circle", "green");
      });
      return;
    }

    this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeActividad?id=" + this.id).subscribe( () => {

      console.log(document.getElementById("cerrar"))
      //Cerrar modal
      document.getElementById("cerrar")!.click();

      let mensajeToast = new ToastComponent();

      mensajeToast.generarToast("Se eliminó correctamente la actividad", "check_circle", "green");
    });


  }
}
