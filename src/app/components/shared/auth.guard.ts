import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http:HttpService, public authService: AuthService, public router: Router) {}

  esValido:boolean = false;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
        console.log(res);
        
        if(!res) { 
          
          window.location.href = "http://localhost/proyectos/TFG-EVG/evg/index.php/Auth";
          return false;

        }

        return true;
      });


      return true;
    
  }
}
