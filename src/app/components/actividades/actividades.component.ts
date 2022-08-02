import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscriber, Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
/**
 * @file : actividades.componet.ts
 * Página de actividad seleccionada.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año: 2022
 **/
export class ActividadesComponent implements OnInit, OnDestroy {

  esTutor:boolean = false;
  esCoordinador:boolean = false;
  loading=true;
  momentoId:any=this._route.snapshot.paramMap.get('id');

  actividades:any = [];

  //Buscador
  searchText: any;

  //Subscribers
  actividadesCoordinador!:Subscription;
  actividadesTutor!:Subscription;
  actividadesProfesor!:Subscription;

  /**
   * Crea un filtro de momentos.
   * @returns Nombre del momento o momentos
   */
  public filtro() {

    return this.actividades.actividades.filter( (momento: any) => {

      if(this.searchText == null) return this.actividades;
      return momento.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  constructor(private http:HttpService, private _route:ActivatedRoute, private authService:AuthService) {

    /**
     * Comprobamos el usuario iniciado para asignar permisos.
     */
     if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Coordinador")?.nombre
      && (this.authService.getDecodedToken().coordinadorEtapa != null
        || this.authService.getDecodedToken().coordinadorEtapa != undefined)){
      this.esCoordinador = true;
    }

    if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Tutor")?.nombre
      && (this.authService.getDecodedToken().tutorCurso != null
        || this.authService.getDecodedToken().tutorCurso != undefined)){
      this.esTutor = true;
    }

    let codSeccion = (this.authService.getDecodedToken().tutorCurso?.codSeccion);
    let idEtapa = (this.authService.getDecodedToken().coordinadorEtapa?.idEtapa);

    if(this.esCoordinador){
      /**
       * Llamada para obtener las actividades correspondientes al momento seleccionado y a la etapa del coordinador iniciado.
       */
      this.actividadesCoordinador = this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividadesCoordiandor?idMomento=${this.momentoId}&idEtapa=${idEtapa}`)
        .subscribe(res => {
          this.loading = false;
          this.actividades = res;
        });
    }else if(this.esTutor) {
      /**
       * Llamada para obtener las actividades correspondientes al momento seleccionado y a la etapa del tutor iniciado.
       */
      this.actividadesTutor = this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividadesTutor?idMomento=${this.momentoId}&codSeccion='${codSeccion}'`)
        .subscribe(res => {
          this.loading = false;
          this.actividades = res;
        });

    }else{
      /**
       * Llamada para obtener las actividades correspondientes al momento seleccionado y siendo terminado el plazo de inscripción, para profesores.
       */
      this.actividadesProfesor = this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividadesProfesor?idMomento=${this.momentoId}`)
        .subscribe(res => {
          this.loading = false;
          this.actividades = res;
        });
    }

  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if(this.actividadesCoordinador != undefined) this.actividadesCoordinador.unsubscribe();

    if(this.actividadesProfesor != undefined) this.actividadesProfesor.unsubscribe();
    
    if(this.actividadesTutor != undefined) this.actividadesTutor.unsubscribe();
  }

}

