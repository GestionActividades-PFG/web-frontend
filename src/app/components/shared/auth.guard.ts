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

  constructor(private http:HttpService, public authService: AuthService, private router: Router) {}


  private esValido:boolean | null = null;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //Permisos para entrar a una página.
      console.log(next, state);

      const canActivate = this.authService.canActivate(next,state);
      let validRol = false;


      //Comprobar la ruta y el rol requerido de la ruta
      if(next.data['rol'] != null) {

        this.authService.getDecodedToken().role.map(rol => {
          
          if(rol.nombre === next.data['rol'][0]) {
            console.log("Es true");
            validRol = true;
            
          }
        })

      
      } else {
        //Se autoasigna a true, ya que si la ruta no tiene un rango se da por hecho que es para todos...
        validRol = true;
      }

      //Si el rol no es válido redireccionar a un 404
      if(!validRol) {
        this.router.navigate(["404"])
      }

      console.log("Valido: ", canActivate && validRol);
      
      

      return (canActivate && validRol);

      //return false;
  }

  esValidof():boolean | null {
    return this.esValido;
  }

}
