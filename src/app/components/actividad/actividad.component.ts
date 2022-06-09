import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";
import {ObtenerFormularioService} from "../service/obtenerFormulario/obtener-formulario.service";
import { AdministrarComponent } from '../administrar/administrar.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  providers: [AdministrarComponent]
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

  esGestor:boolean = false;
  esTutor:boolean = false;
  esCoordinador:boolean = false;

  constructor(private _route:ActivatedRoute,private http:HttpService,private obtenerFormulario: ObtenerFormularioService, private administrar:AdministrarComponent, private authService:AuthService, private ref:ChangeDetectorRef) {
    this.actividadid=this._route.snapshot.paramMap.get('id');

    console.log(this.authService.getDecodedToken());

    //FIX TEMPORAL INSTANCIAS...
    this._route.url.subscribe(url => {
      if(url[0].path == "actividad") this.obtenerApartado();
    });
  }

  obtenerApartado() {
    /**
     * LLamada para obtener información de la actividad seleccionada
     */
     this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividad?idActividad=${this.actividadid}`).subscribe(res => {
      this.loading = false;
      this.actividad = res.actividad;

      //permisos y tal, CAMBIAR ESTA PARTE
      if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Gestor")?.nombre)
        this.esGestor = true;

      if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Coordinador")?.nombre)
        this.esCoordinador = true;

      if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Tutor")?.nombre
        && (this.authService.getDecodedToken().tutorCurso != null
        || this.authService.getDecodedToken().tutorCurso != undefined))
          this.esTutor = true;

      console.error(this.esGestor, this.esCoordinador, this.esTutor);

       let codSeccion = (this.authService.getDecodedToken().tutorCurso?.codSeccion);
       let idEtapa = (this.esCoordinador) ? codSeccion.substring(0,4) : null;

      //Comprobamos que la actividad sea individual.
      if(this.actividad.esIndividual=="1"){


        if(this.esCoordinador)
          // LLamada para obtener alumnos inscritos a la actividad, que estos sean de la coordinación del usuario logeado
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosCoordinador?idActividad=${this.actividadid}&idEtapa='${idEtapa}'`).subscribe(res => {
            this.inscripcionesactividad = res;
          });

        //LLamada para obtener alumnos inscritos a la actividad, que estos sean de la tutoría del usuario logeado
        else if(this.esTutor)
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosTutoria?idActividad=${this.actividadid}&codSeccion='${codSeccion}'`).subscribe(res => {
            this.inscripcionesactividad = res;
          });

      }else{
        //CLASE
        if(this.esCoordinador)
          console.log("Eres coordinador")
          // LLamada para obtener alumnos inscritos a la actividad, que estos sean de la coordinación del usuario logeado
          // this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosCoordinador?idActividad=${this.actividadid}&idEtapa='${idEtapa}'`).subscribe(res => {
          //   console.log(res)
          //   this.inscripcionesactividad = res;
          // });

        //LLamada para obtener alumnos inscritos a la actividad, que estos sean de la tutoría del usuario logeado
        else if(this.esTutor)
          this.inscripcionesactividad =[{nombre:codSeccion}]
        //console.log("log",this.inscripcionesactividad)
      }
    });
  }

  restartDatos() {
    this.inscripcionesactividad = [];


    this.obtenerApartado();
    this.ref.detectChanges();
  }

  ngOnInit(): void {}

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
    //this.administrar.restartDatos();


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
