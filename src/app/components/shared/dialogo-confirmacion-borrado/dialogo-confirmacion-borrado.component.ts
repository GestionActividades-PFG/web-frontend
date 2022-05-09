import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-dialogo-confirmacion-borrado',
  templateUrl: './dialogo-confirmacion-borrado.component.html',
  styleUrls: ['./dialogo-confirmacion-borrado.component.css']
})
export class DialogoConfirmacionBorradoComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para realizar la operación de borrar
   */
  borrar(){
    console.log("llega a borrar")

  }
}
