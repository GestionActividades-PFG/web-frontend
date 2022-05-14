import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { DialogoFormularioActividadEditarComponent } from '../shared/dialogo-formulario-actividad-editar/dialogo-formulario-actividad-editar.component';
import { DialogoFormularioMomentoEditarComponent } from '../shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  apartado:string | null = this._route.snapshot.paramMap.get('apartado');
  momentos:boolean=true;

  id:number | undefined;

  datosapartado:any;

  constructor(private http:HttpService,private _route:ActivatedRoute) {
    this.obtenerApartado();

    if(this.apartado != 'Momentos') {
      this.momentos = false;
      return;
    }

    this.momentos = true;

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
        this.datosapartado = res;
        console.log("Administrar momentos: ", res);

      });
      return;
    }

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades?idMomento=" + this.apartado).subscribe(res => {
        this.datosapartado = res.actividades;

        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

        console.log("Apartados: " , res);
    });

  }
  enviarDatos(id:number) {
    this.id = id;

    if(this.momentos) {
      let momentosClass = new DialogoFormularioMomentoEditarComponent(this.http);
      momentosClass.cargarDatosForm(id);

      return;
    }

    let actividadesClass = new DialogoFormularioActividadEditarComponent(this.http);
    actividadesClass.cargarDatosForm(id);

  }

  borrar(id:number){
    this.id=id
  }

}
