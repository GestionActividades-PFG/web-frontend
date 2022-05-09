import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";


@Component({
  selector: 'app-dialogo-confirmacion-borrado',
  templateUrl: './dialogo-confirmacion-borrado.component.html',
  styleUrls: ['./dialogo-confirmacion-borrado.component.css']
})
export class DialogoConfirmacionBorradoComponent implements OnInit {

  constructor(private http:HttpService) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para realizar la operación de borrar
   */
  borrar(){
    console.log("llega a borrar")
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/removeMomento").subscribe(res => {
      console.log("borrado");
    });
  }
}
