import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * @file : navbar.componet.ts
 * Navbar para escritorio.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class NavbarComponent implements OnInit, AfterViewInit {

  //@ViewChild(AuthService) service?:AuthService;

  @Input() apartado: string ="";
  @Input() administrar: string = "false";

  loading:boolean = true;

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador:boolean=false;

  constructor(private http:HttpService, public service:AuthService, private route:ActivatedRoute) {}

  ngAfterViewInit() {
     /*Comprobamos si es coordinador, para pruebas true*/

    //Poner con un find...
    if(this.service.getDecodedToken().role.find(rol => rol.nombre == "Gestor")?.nombre) this.administrar = "true";
  }

  ngOnInit(): void {}

  /**
   * Método para cerrar sesión.
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
