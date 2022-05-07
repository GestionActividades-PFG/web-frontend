import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpService) { }


  /**
   * Función asincrona que devuelve un booleano si el usuario está o no logueado.
   * @returns Boolean
   */
  public isLoggedIn(): Boolean {

    /*this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe({
      next: async n => {
        console.log("Next: ", n);
        esValido = n;   
      },
      error: (e) => {
        console.log("Error: ",e);
        esValido = false;
        return false;
      },
      complete: () => { 
        if(esValido) return true;
        return false;
      }
    });*/

    this.http.get(environment.serverURL + `index.php/C_GestionActividades/index`).subscribe(res => {
      console.log("GET:", res);
      
      if(res == false) {
        return false;
      }
      
      return true;
    });

    //error
    return false;
  }
}