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


  constructor(private http:HttpService,private _route:ActivatedRoute,private obtenerid: ObtenerIdService, private ref:ChangeDetectorRef) {
    
    
    this._route.url.subscribe(url => {
      if(url[0].path == "actividad") return;
      this.obtenerApartado();
      
    });

    if(this.apartado != 'Momentos') {
      this.momentos = false;
      return;
    }

    this.momentos = true;

  }
  ngAfterViewInit(): void {}

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

    //Apaño temporal, esto verdaderamente no debería ser así y la variable de apartado debería ser cambiada y
    //separada en dos (Este código se REFACTORIZARÁ entero).
    this.apartado = this._route.snapshot.paramMap.get('apartado');
    

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
   * Método que hace un re-check comprobando si hay datos nuevos/modificados.
   * Vuelve a recoger información de la B.D
   */
  restartDatos() {
    this.datosapartado = [];


    this.obtenerApartado();
    this.ref.detectChanges();
    
  }

  /**
   * Método para asignar el id del momento o actividad seleccionada al modal de modificación
   * @param id
   */
  enviarDatos(id:number,tipo:string) {
    console.log(this.id)
    this.obtenerid.disparadorId.emit({
      data:id,
      modificar:tipo
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
