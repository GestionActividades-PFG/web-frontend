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
export class AuthGuard implements CanActivate {

  @ViewChild("servicio") servicio: AuthService = {} as AuthService;

  constructor(private http:HttpService, public authService: AuthService) {}

  public loader:boolean = false;


  esValido:boolean = false;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
        let service = new AuthService();
        service.storeJwtToken(res);

        console.log(this.servicio.storeJwtToken(res));

        //Indicamos que todo se ha cargado correctamente...
        this.loader = true;

        if(!res) {

          window.location.href = environment.serverURL + "index.php/Auth";
          return false;

        }

        return true;
      });


      return true;
  }
}
