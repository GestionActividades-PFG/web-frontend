import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { DialogoFormularioActividadEditarComponent } from '../shared/dialogo-formulario-actividad-editar/dialogo-formulario-actividad-editar.component';
import { DialogoFormularioMomentoEditarComponent } from '../shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component';
import {ObtenerIdService} from "../service/obtenerId/obtener-id.service";

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
})
export class AdministrarComponent implements OnInit {

  @ViewChild(DialogoFormularioMomentoEditarComponent) momentoEditar:DialogoFormularioMomentoEditarComponent | undefined;

  loading=true;
  apartado:string | null = this._route.snapshot.paramMap.get('apartado');
  momentos:boolean=true;

  id:number | undefined;
  datosapartado:Array<any> = [];
  
  test:string;

  constructor(private http:HttpService,private _route:ActivatedRoute,private obtenerid: ObtenerIdService) {
    this.obtenerApartado();
    this.test = "";

    if(this.apartado != 'Momentos') {
      this.momentos = false;
      return;
    }

    this.momentos = true;

  }
  ngAfterViewInit(): void {
    console.log("RECARGA");
    
  }

  ngOnInit(): void {}

  /**
   * Obtener apartado a gestionar
   */
  obtenerApartado(){
    /*
    LLamada a api para obtener datos del apartado seleccionado (momentos o actividades) depende de apartado
     */

    //Gestionamos mommentos
    if(this.apartado == "Momentos"){
      /**
       * Llamada para listar momentos
       */
      this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
        this.loading = false;
        this.datosapartado = res;
        console.log("Administrar momentos: ", res);

      });
      return;
    }

    //Gestionamos actividades de momento seleccionado
    /**
     * Llamada para listar actividades de momento seleccionado
     */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades?idMomento=" + this.apartado).subscribe(res => {
        this.loading = false;
        this.datosapartado = res.actividades;

        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

        console.log("Apartados: " , res);
    });

  }

  /**
   * Método para asignar el id del momento o actividad seleccionada al modal de modificación
   * @param id
   */
  enviarDatos(id:number) {
    this.id = id;
   this.obtenerid.disparadorId.emit({
     data:id
   })
  }

  /**
   * Método para asignar el id del momento o actividad seleccionada al modal de borrado
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
