import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";

@Component({
  selector: 'app-navbar-movil',
  templateUrl: './navbar-movil.component.html',
  styleUrls: ['./navbar-movil.component.css']
})
export class NavbarMovilComponent implements OnInit {

  @Input() apartado: string ="";

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador=true;
  constructor(private http:HttpService) { }

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
