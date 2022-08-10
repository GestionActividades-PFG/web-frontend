import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbar-movil',
  templateUrl: './navbar-movil.component.html',
  styleUrls: ['./navbar-movil.component.css']
})
/**
 * @file : navbar-movil.componet.ts
 * Navbar para móvil.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class NavbarMovilComponent implements OnInit {

  //@ViewChild(AuthService) service?:AuthService;

  @Input() apartado: string ="";
  @Input() administrar: string = "false";
  @Input() gestionar:boolean = true;

  loading:boolean = true;

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador:boolean=false;

  constructor(private http:HttpService, public service:AuthService, private route:ActivatedRoute) {}

  ngAfterViewInit() {
    /*Comprobamos si es coordinador, para pruebas true*/

    //Poner con un find...
    if(this.service.getDecodedToken().role.find(rol => rol.nombre == "Gestor" || rol.nombre == "Coordinador")?.nombre) this.administrar = "true";
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
      window.location.href = environment.serverURL;
    });


    sessionStorage.removeItem('id');

  }
}
