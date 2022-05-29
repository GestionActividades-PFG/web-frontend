import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { DialogoFormularioActividadEditarComponent } from '../shared/dialogo-formulario-actividad-editar/dialogo-formulario-actividad-editar.component';
import { DialogoFormularioMomentoEditarComponent } from '../shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component';

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

  
  test:string;

  datosapartado:Array<any> = [];

  constructor(private http:HttpService, private _route:ActivatedRoute, private ngZone: NgZone) {
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
   * Obtener que apartado está gestionando
   */
  obtenerApartado(){
    /*
    LLamada a api para obtener datos del apartado seleccionado (momentos o actividades) depende de apartado
     */

    //Editamos un momento
    if(this.apartado == "Momentos"){
      this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
        this.loading = false;
        this.datosapartado = res;
        console.log("Administrar momentos: ", res);

      });
      return;
    }

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades?idMomento=" + this.apartado).subscribe(res => {
        this.loading = false;
        this.datosapartado = res.actividades;

        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

        console.log("Apartados: " , res);
    });

  }

  restartDatos() {
    this.datosapartado = [];
    console.error("llega");
    
    /*console.log(this.datosapartado, +" aa: " ,this.apartado);

      this.ngZone.runTask( () => {
         this.test += '-bar';
      });*/

    //location.reload(); //<- temporal hasta recargar el view
    // this.datosapartado.slice(0)
    
    //this.obtenerApartado();
  }

  enviarDatos(id:number) {
    this.id = id;

    if(this.momentos) {
      this.momentoEditar?.cargarDatosForm(id);

      return;
    }

    let actividadesClass = new DialogoFormularioActividadEditarComponent(this.http);
    actividadesClass.cargarDatosForm(id);

  }

  borrar(dato:any){

    if(this.apartado=="Momentos"){
      this.id=dato.id
    }else{
      this.id=dato.idActividad
    }

  }

}
