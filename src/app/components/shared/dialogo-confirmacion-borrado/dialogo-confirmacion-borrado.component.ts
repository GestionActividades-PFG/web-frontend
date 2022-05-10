import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../http.service";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-dialogo-confirmacion-borrado',
  templateUrl: './dialogo-confirmacion-borrado.component.html',
  styleUrls: ['./dialogo-confirmacion-borrado.component.css']
})
export class DialogoConfirmacionBorradoComponent implements OnInit {

  @Input() id: string ="";
  nid:number | undefined;
  constructor(private http:HttpService) {
  }

  ngOnInit(): void {}


  /**
   * Metodo para realizar la operación de borrar
   */
  borrar() {
    console.log("id: " + this.id)

    this.http.delete(environment.serverURL + "index.php/C_GestionActividades/removeMomento?id=" + this.id).subscribe(res => {
      //Cerrar modal
      document.getElementById("cerrar")!.click();

      console.log("borrado ");
    });

  }
}
