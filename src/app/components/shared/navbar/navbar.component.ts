import {Component, Input, OnInit} from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() apartado: string ="";
  @Input() administrar: string ="true";

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador=false;

  constructor(private http:HttpService) {
    /*Comprobamos si es coordinador, para pruebas true*/
    this.coordinador=true;
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

    this.http.get(environment.serverURL + `index.php/C_GestionActividades/logout`).subscribe(e => {
      console.log(e);
      window.location.href = environment.serverURL;
    });


    sessionStorage.removeItem('id');

  }
}
