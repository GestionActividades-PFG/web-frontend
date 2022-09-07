import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  //@ViewChild(AuthService) service?:AuthService;

  @Input() apartado: string ="";
  @Input() administrar: string = "false";
  @Input() gestionar:boolean = true;

  //Aplicación en DEBUG
  appDebug:boolean = environment.appDebug;

  loading:boolean = true;

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador:boolean=false;

  indexChangeAccount:any = undefined;

  rol:String = "";

  constructor(private http:HttpService, public service:AuthService, public aService:AuthService, private ref:ChangeDetectorRef) {}

  ngAfterViewInit() {
     /*Comprobamos si es coordinador, para pruebas true*/

    //Poner con un find...
    if(this.service.getDecodedToken().role.find(rol => rol.nombre == "Gestor" || rol.nombre == "Coordinador")?.nombre) this.administrar = "true";

    this.ref.detectChanges();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.indexChangeAccount.unsubscribe();
  }

  /**
   * Método para el debug de la aplicación y el desarrollo de la misma...
   * @param idCuenta 
   */
  d_changeAccount(idCuenta:number) {

    let cuenta:Number = 0;

    switch (idCuenta) {
      case 1:
        cuenta = 21;
        this.administrar = "true";
        break;
      case 2:
        cuenta = 25;
        this.administrar = "false";
        break;
      case 3:
        cuenta = 22;
        this.administrar = "false";

        break;
    }

    //Solicitamos nuevo token
    this.indexChangeAccount = this.http.get(environment.serverURL + `index.php/C_GestionActividades/index?userID=${cuenta}`).subscribe(e => {
      console.log("Nuevo token generado: ", e);
      if(environment.appDebug)
        localStorage.setItem("debug", "on");

      this.aService.storeJwtToken(e);
      this.rol = this.aService.getYourRoles();
      

    });

    
    this.ref.detectChanges();
    //this.aService.getYourRoles();


    sessionStorage.removeItem('id');

  }

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
