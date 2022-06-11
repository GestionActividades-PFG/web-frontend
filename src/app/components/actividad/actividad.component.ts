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
  profesor:boolean=true;
  actividadid:any;
  id:number | undefined;
  apartado:number | undefined;
  loading=true;
  tipoForm:String="";

  actividad:any;

  inscripcionesactividad:Array<any> = []

  esGestor:boolean = false;
  esTutor:boolean = false;
  esCoordinador:boolean = false;

  constructor(private _route:ActivatedRoute,private http:HttpService,private obtenerFormulario: ObtenerFormularioService, private authService:AuthService, private ref:ChangeDetectorRef) {
    this.actividadid=this._route.snapshot.paramMap.get('id');

    console.log(this.authService.getDecodedToken());

    //FIX TEMPORAL INSTANCIAS...
    this._route.url.subscribe(url => {
      if(url[0].path == "actividad") this.obtenerApartado();
    });
  }

  /**
   * Métido para obtener la información de la actividad seleccionada por el usuario, donde recoger la información general de la actividad ,
   * comprobar que perfil está iniciado para mostrar o no la pestaña de Inscribirse, mostramos pestaña cuandon el usuario es Coordinador o Tutor y
   * para permisos de inscripción dependiendo del usuario, coordinador puede inscribir alumnos o clases de su etapa y tutor sus alumnos o su clase.
   */
  obtenerApartado() {

    /**
     * LLamada para obtener información general de la actividad seleccionada.
     */
     this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividad?idActividad=${this.actividadid}`).subscribe(res => {
      this.loading = false;
      this.actividad = res.actividad;

       /**
        * Comprobamos el usuario iniciado para asignar permisos.
        */
      if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Gestor")?.nombre)
        this.esGestor = true;

       if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Coordinador")?.nombre
         && (this.authService.getDecodedToken().coordinadorEtapa != null
           || this.authService.getDecodedToken().coordinadorEtapa != undefined)){
         this.esCoordinador = true;
         this.profesor=false;
       }

       if(this.authService.getDecodedToken().role.find(rol => rol.nombre == "Tutor")?.nombre
         && (this.authService.getDecodedToken().tutorCurso != null
           || this.authService.getDecodedToken().tutorCurso != undefined)){
         this.esTutor = true;
         this.profesor=false;
       }

      console.error(this.esGestor, this.esCoordinador, this.esTutor);

       let codSeccion = (this.authService.getDecodedToken().tutorCurso?.codSeccion);
       let idEtapa = (this.authService.getDecodedToken().coordinadorEtapa?.idEtapa);

       /**
        * Comprobamos si la actividad es individual o no, de esta manera sabremos si la actividad es individual de alumno o por clase.
        */
       if(this.actividad.esIndividual=="1"){
         //ACTIVIDAD INDIVIDUAL
         /**
          * Comprobamos si el usuario iniciado es Coordinador o tutor.
          */
        if(this.esCoordinador)
          /**
           * LLamada para obtener alumnos inscritos a la actividad, que estos sean de la coordinación del usuario iniciado.
           */
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosCoordinador?idActividad=${this.actividadid}&idEtapa='${idEtapa}'`).subscribe(res => {
            this.inscripcionesactividad = res;
          });

        else if(this.esTutor)
        {
          /**
           * LLamada para obtener alumnos inscritos a la actividad, que estos sean de la tutoría del usuario iniciado.
           */
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosInscritosTutoria?idActividad=${this.actividadid}&codSeccion='${codSeccion}'`).subscribe(res => {
            console.log("llego, s", res);
            this.inscripcionesactividad = res;
          });
        }

      }else{
         //ACTIVIDAD DE CLASE
         /**
          * Comprobamos si el usuario iniciado es Coordinador o tutor.
          */
        if(this.esCoordinador)
          /**
           * LLamada para obtener clases inscritas a la actividad, que estas sean de la coordinación del usuario iniciado.
           */
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getClasesInscritasCoordinador?idActividad=${this.actividadid}&idEtapa='${idEtapa}'`).subscribe(res => {
            this.inscripcionesactividad = res;
          });

        else if(this.esTutor)
          /**
           * LLamada para obtener clase inscrita a la actividad, que esta sean de la coordinación del usuario iniciado.
           */
          this.http.get(environment.serverURL + `index.php/C_GestionActividades/getClaseInscritaTutoria?idActividad=${this.actividadid}&codSeccion='${codSeccion}'`).subscribe(res => {
            this.inscripcionesactividad = res;
          });
      }
    });

  }

  /**
   * Métido para resetear los datos.
   */
  restartDatos() {
    this.inscripcionesactividad = [];

    this.obtenerApartado();
    this.ref.detectChanges();
  }

  ngOnInit(): void {}

  /**
   * Método para cambiar de pestaña entre Inscritos e Inscribirse.
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
   * Método para pasar al componente de formulario de Inscripción el idActividad y tipo de formulario (formulario para inscribir alumnos o clase).
   */
  enviarDatos() {
    this.obtenerFormulario.disparadorFormulario.emit({
      idActividad:this.actividad.idActividad,
      formulario:this.actividad.esIndividual
    })
  }

  /**
   * Método para asignar id a la variable correspondiente a pasar al modal de borrado para dar de baja la inscripción.
   */
  borrar(dato:any){

    if(dato.idAlumno!=undefined){
      this.id=dato.idAlumno;
    }else{
      this.id=dato.nombre;
    }
    if(this.actividad.esIndividual=="1"){
      this.tipoForm="InscribirAlumno"
    }else{
      this.tipoForm="InscribirClase"
    }
  }

}
