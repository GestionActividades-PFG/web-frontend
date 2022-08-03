import { HttpRequest } from '@angular/common/http';
import { Injectable, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
/**
 * @file : auth.guard.ts
 * Guard de la autenticación. Se encarga de no permitir el acceso a páginas internas sin el login.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class AuthGuard implements CanActivate {

  @ViewChild("servicio") servicio: AuthService = {} as AuthService;

  constructor(private http:HttpService, public authService: AuthService) {}


  private esValido!:boolean;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
        if(!res) {

          window.location.href = environment.serverURL + "index.php/Auth";
          return false;
        }

        let service = new AuthService();

        if(res["errorNum"] != 1029) {
          service.storeJwtToken(res);
        }
        else 
        {
          console.error("Se produjo un error al cargar el fichero de configuración.\n\n"
            + "Si ves este error ponte en contacto con el administrador de la aplicación. \n\n\n"
            + "COD Error: AU-1029-INDX"
          );
          this.esValido = false;
          return false;
        }

        this.esValido = true;

        return true;
      });


      return true;
  }

  esValidof():boolean {
    return this.esValido;
  }

}
