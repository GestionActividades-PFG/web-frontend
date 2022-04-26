import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Método para cerrar sesión
   */
  cerrarSesion(){
    /**
     * Añadimos log
     */
    let informacion ="Cerró sesión";
    // this._appServer.postLogs(informacion)
    //   .subscribe((data) => {
    //
    //   });
    sessionStorage.removeItem('id');

  }
}
