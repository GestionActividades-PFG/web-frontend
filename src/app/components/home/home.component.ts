import { AfterViewInit, Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * @file : home.componet.ts
 * Página home,listado de momentos.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(AuthGuard) authGuard?:AuthGuard;
  @ViewChildren(AuthService) service!: AuthService;
  loading=true;
  momentos:any = [];

  //Buscador
  searchText: any;

  //Subscription
  getMomentos!:Subscription;

  rol: string | undefined;

  /**
   * Crea un filtro de momentos.
   * @returns Nombre del momento o momentos.
   */
  public filtro() {

    return this.momentos.filter( (momento: any) => {

      if(this.searchText == null) return this.momentos;
      return momento.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });

  }

  constructor(private http:HttpService, private authService:AuthService) {
    //Obtiene tus rangos
    this.rol = this.authService.getYourRoles();
    console.log("rol: "+this.rol)
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.getMomentos.unsubscribe();
  }

  /**
   * Esta función se llama una vez que la vista del componente y sus hijos han sido iniciadas...
   */
  ngAfterViewInit(): void {
    /**
     * Llamada para listar los momentos
    */
    this.getMomentos = this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
      this.loading = false;
      console.log("res"+res[0].fechaFin_Inscripcion)

      /**
       * Comprobamos si el usuario inicado es profesor básico para solo listar los momentos cuyo fin de inscripción ha terminado
       */
      if(this.rol=="NaR"){
        let momentosProfesor:any=[];
        let date = new Date();
        let hoy = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace('T', ' ');
        for(let i=0;i<res.length;i++){
          if(res[i].fechaFin_Inscripcion<=hoy){
            momentosProfesor.push(res[i]);
          }
        }
        this.momentos = momentosProfesor;
      }else{
        this.momentos = res;
      }

    });

  }

}
