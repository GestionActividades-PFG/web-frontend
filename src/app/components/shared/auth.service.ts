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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
        
        if(!res) {

          window.location.href = environment.serverURL + "index.php/Auth";
          return false;
        }

        //Si no estamos en debug limpiamos todo...
        if(!environment.appDebug) localStorage.clear();

        let service = new AuthService(this.http);
        //service.canActivate(next,state);

        if(res["errorNum"] != 1029) {
          //Este if es solo para DEBUG...
          if(localStorage.getItem("X_EVG_VARS") == null || localStorage.getItem("debug") == "off")
            service.storeJwtToken(res);
        }
        else 
        {
          //Cambiar...
          service.removeTokens();
          console.error("Se produjo un error al cargar el fichero de configuración.\n\n"
            + "Si ves este error ponte en contacto con el administrador de la aplicación. \n\n\n"
            + "COD Error: AU-1029-INDX"
          );
          return false;
        }


        return true;
      });


      return true;
  }


  /**
   * Método que obtiene el rango del perfil del usuario.
   * @returns {String} - Rango
   */
  getYourRoles() {

    if(this.getDecodedToken().role.find(rol => rol.nombre == "Gestor")?.nombre) {
      return "Gestor";
    }

    if(this.getDecodedToken().role.find(rol => rol.nombre == "Coordinador")?.nombre
      && (this.getDecodedToken().coordinadorEtapa != null
        || this.getDecodedToken().coordinadorEtapa != undefined)){
      return "Coordinador";
    }

    if(this.getDecodedToken().role.find(rol => rol.nombre == "Tutor")?.nombre
      && (this.getDecodedToken().tutorCurso != null
      || this.getDecodedToken().tutorCurso != undefined)){
      return "Tutor";
    }
    
    return "NaR";
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
