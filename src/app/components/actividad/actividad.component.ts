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
import {ObtenerIdService} from "../service/obtenerId/obtener-id.service";
import {ObtenerFormularioService} from "../service/obtenerFormulario/obtener-formulario.service";

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
  tipoForm:String="";

  actividad:any;

  inscripcionesactividad:any=[]

  constructor(private _route:ActivatedRoute,private http:HttpService,private obtenerFormulario: ObtenerFormularioService) {
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
   * Método para pasar a componente de formulario de Inscripción el idActividad y tipo de formulario
   * @param id
   */
  enviarDatos() {
    console.log(this.id)
    this.obtenerFormulario.disparadorFormulario.emit({
      idActividad:this.actividad.idActividad,
      formulario:this.actividad.esIndividual
    })

  }

  /**
   * Método para asignar id a la variable correspondiente a pasar al modal de borrado
   */
  borrar(id:number){
    this.id=id;
    if(this.actividad.esIndividual=="1"){
      this.tipoForm="InscribirAlumno"
    }else{
      this.tipoForm="InscribirClase"
    }
  }

}
