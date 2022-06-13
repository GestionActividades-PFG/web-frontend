import {ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { DialogoFormularioMomentoEditarComponent } from '../shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component';
import {ObtenerIdService} from "../service/obtenerId/obtener-id.service";

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
})
/**
 * @file : administrar.componet.ts
 * Página de administración de momentos o actividades.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año: 2022
 **/
export class AdministrarComponent implements OnInit {

  @ViewChild(DialogoFormularioMomentoEditarComponent) momentoEditar:DialogoFormularioMomentoEditarComponent | undefined;

  loading=true;
  apartado:string | null = this._route.snapshot.paramMap.get('apartado');
  momentos:boolean=true;

  id:number | undefined;
  datosapartado:Array<any> = [];


  constructor(private http:HttpService,private _route:ActivatedRoute,private obtenerid: ObtenerIdService, private ref:ChangeDetectorRef) {

    
    (this.apartado != 'Momentos') ? this.momentos = false : this.momentos = true;

    this._route.url.subscribe(url => {
      //console.log(url[0].path);
      if(url[0].path == "actividades" || url[0].path == "administrar" ) this.obtenerApartado();
    });
    
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  /**
   * LLamada para obtener datos del apartado seleccionado (momentos o actividades) depende de apartadoObtener apartado a gestionar
   */
  obtenerApartado(){
    //Gestionamos mommentos
    if(this.apartado == "Momentos"){
      /**
       * Llamada para listar momentos.
       */
      this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
        this.loading = false;
        this.datosapartado = res;
      });
      return;
    }

    //Apaño temporal, esto verdaderamente no debería ser así y la variable de apartado debería ser cambiada y
    //separada en dos (Este código se REFACTORIZARÁ entero).
    this.apartado = this._route.snapshot.paramMap.get('apartado');

    //Gestionamos actividades de momento seleccionado
    /**
     * Llamada para listar actividades correspondientes al momento seleccionado.
     */
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividadesCoordiandor?idMomento=${this.apartado}`).subscribe(res => {
        this.loading = false;
        this.datosapartado = res.actividades;

        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

    });

  }

  /**
   * Método que hace un re-check comprobando si hay datos nuevos/modificados.
   * Vuelve a recoger información de la B.D
   */
  restartDatos() {
    this.datosapartado = [];

    this.obtenerApartado();
    this.ref.detectChanges();
  }

  /**
   * Método para asignar el id del momento o actividad seleccionada al modal de modificación.
   * @param id
   */
  enviarDatos(id:number,tipo:string) {
    this.obtenerid.disparadorId.emit({
      data:id,
      modificar:tipo
    })
  }

  /**
   * Método para asignar el id del momento o actividad seleccionada al modal de borrado.
   * @param dato
   */
  borrar(dato:any){

    if(this.apartado=="Momentos"){
      this.id=dato.id
    }else{
      this.id=dato.idActividad
    }

  }

}
