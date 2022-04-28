import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() apartado: string ="";
  @Input() momento: any ;

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador=true;

  constructor() {
  }

  ngOnInit(): void {

  }

  /**
   * Método para cerrar sesión
   */
  cerrarSesion(){
    /**
     * Añadimos log
     */

    sessionStorage.removeItem('id');

  }
}
