import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadComponent } from './components/actividad/actividad.component';
import { AuthGuard } from './components/shared/auth.guard';
import { AuthService } from './components/shared/auth.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * @file : app.component.ts
 * Componente principal.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class AppComponent {

  title = 'Gestión de Aplicaciones';

  @ViewChild(NavbarComponent) nav!:NavbarComponent; 

  loading:boolean = true;

  tipoGestion:string = "";

  //chapuza temporal
  gestion: boolean = true;

  constructor(private service:AuthService, private ref:ChangeDetectorRef, private router:Router) {

    //Solicitamos un token hasta que sea válido...
    let timeOut = setInterval(() => {

      if(this.service.getDecodedToken() != null) {
        this.loading = false;
        clearInterval(timeOut)
      }

    }, 200)
  }



  /**
   * Control de eventos del NAV
   * Aquí se controla a que página debe llevar el botón de gestionar.
   * @param event
   */
  onActivate(event:any) {
    if(event.constructor.name == "HomeComponent" || this.router.url == "/administrar/Momentos" || this.router.url == "/home") this.tipoGestion = "Momentos"
    else this.tipoGestion = this.router.url.substring(this.router.url.length-1);//event.momentoId;


    this.ref.detectChanges();

    if(event instanceof(ActividadComponent)) this.nav.gestionar = false;
    else this.nav.gestionar = true;

    this.gestion = this.nav.gestionar;

    this.ref.detectChanges();

  }

}
