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


  private esValido:boolean | null = null;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //Permisos para entrar a una página.
      console.log(next);
      

      return this.authService.canActivate(next,state);

      //return false;
  }

  esValidof():boolean | null {
    return this.esValido;
  }

}
