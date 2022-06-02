import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatAccordion} from "@angular/material/expansion";
import {
  DialogoFormularioMomentoEditarComponent
} from "../shared/dialogo-formulario-momento-editar/dialogo-formulario-momento-editar.component";
import {HttpService} from "../../http.service";
import {
  DialogoFormularioInscripcionComponent
} from "../shared/dialogo-formulario-inscripcion/dialogo-formulario-inscripcion.component";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit {

  panelOpenState = false;
  pestana:boolean=true;
  actividadid:any;
  id:number | undefined;
  apartado:number | undefined;
  loading=true;

  actividad:any;

  // inscripcionesactividad = [
  //   {
  //     id: 1,
  //     nombre: "1ºSMR"
  //   },
  //   {
  //     id: 2,
  //     nombre: "2ºSMR"
  //   },
  //   {
  //     id: 3,
  //     nombre: "1ºDAW"
  //   },
  //   {
  //     id: 4,
  //     nombre: "2ºDAW"
  //   },
  //   {
  //     id: 5,
  //     nombre: "1ºESO A"
  //   },
  //   {
  //     id: 6,
  //     nombre: "1ºESO B"
  //   },
  //   {
  //     id: 7,
  //     nombre: "1ºESO C"
  //   },
  //   {
  //     id: 8,
  //     nombre: "2ºESO A"
  //   },
  //   {
  //     id: 9,
  //     nombre: "2ºESO B"
  //   },
  //   {
  //     id: 10,
  //     nombre: "2ºESO C"
  //   },
  //   {
  //     id: 11,
  //     nombre: "3ºESO A"
  //   },
  //   {
  //     id: 12,
  //     nombre: "3ºESO B"
  //   },
  //   {
  //     id: 13,
  //     nombre: "3ºESO C"
  //   },
  //   {
  //     id: 14,
  //     nombre: "4ºESO A"
  //   },
  //   {
  //     id: 15,
  //     nombre: "4ºESO B"
  //   },
  // ]
  inscripcionesactividad:any=[]

  constructor(private _route:ActivatedRoute,private http:HttpService) {
    this.actividadid=this._route.snapshot.paramMap.get('id');

    /**
     * LLamada para obtener información de la actividad seleccionada
     */
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividad?idActividad=${this.actividadid}`).subscribe(res => {
      this.loading = false;
      this.actividad=res[0];
      console.log(res[0])
      if(this.actividad.esIndividual=="1"){
        /**
         * LLamada para obtener alumnos inscritos a la actividad, que estos sean de la tutoría del usuario logeado
         */
        this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosTutoria?idActividad=${this.actividadid}&idSeccion=2`).subscribe(res => {
          console.log(res)
          this.inscripcionesactividad = res;
        });
        //DE MOMENTO PUESTO A MANO LA SECCION
      }else{
        // this.inscripcion='Clase';
      }
    });



  }

  ngOnInit(): void {
  }

  /**
   * Método para cambiar de pestaña
   */
  cambiarPestana(pestana:string){
    if(pestana=="inscritos"){
      document.getElementById('inscribirse')!.classList.remove('active');
      document.getElementById("inscritos")!.classList.add('active');
      this.pestana=true;
    }else{
      document.getElementById('inscritos')!.classList.remove('active');
      document.getElementById("inscribirse")!.classList.add('active');
      this.pestana=false;
    }
  }
  /**
   * Método para asignar id a la variable correspondiente a pasar al modal de borrado
   */
  borrar(id:number){
    this.id=id;
  }

}
