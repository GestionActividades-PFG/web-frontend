import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { Tokens } from './tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtDataModule } from 'src/app/jwt-data/jwt-data.module';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

const jwt = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
/**
 * @file : auth.service.ts
 * Servicio de autentificación.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class AuthService implements CanActivate {

  private JWT_TOKEN = 'X_EVG_VARS';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string = "";

  private decodedToken: any;

  constructor(private http:HttpService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | 
    UrlTree> | Promise<boolean | UrlTree> {

    this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
        
      if(!res) {

        window.location.href = environment.serverURL + "index.php/Auth";
        return false;
      }


      if(res["errorNum"] != 1029) {
        this.storeJwtToken(res);
      }
      else 
      {
        //Cambiar...
        this.removeTokens();
        console.error("Se produjo un error al cargar el fichero de configuración.\n\n"
          + "Si ves este error ponte en contacto con el administrador de la aplicación. \n\n\n"
          + "COD Error: AU-1029-INDX"
        );
        return false;
      }


      return true;
    });


    return false;
  }

  


  refreshToken() {
    /*return this.http.post(`${environment.serverURL}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));*/
  }

  getDecodedToken():JwtDataModule {
    return (jwt.decodeToken(localStorage.getItem(this.JWT_TOKEN) as string));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = "";
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }


}
