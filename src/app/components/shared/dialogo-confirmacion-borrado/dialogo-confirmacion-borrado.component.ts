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
    console.log("a"+this.id)
    console.log("aaaaaaa"+this.nid)
  }

  ngOnInit(): void {
    console.log("b"+this.id)
  }


  /**
   * Metodo para realizar la operación de borrar
   */
  borrar(){
    console.log("llega a borrar")
    console.log("asasas"+this.id)
    this.nid=Number(this.id)

    console.log("bbbbbbb"+this.nid)
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/removeMomento?id="+this.nid).subscribe(res => {
      console.log("borrado");
    });
  }
}
