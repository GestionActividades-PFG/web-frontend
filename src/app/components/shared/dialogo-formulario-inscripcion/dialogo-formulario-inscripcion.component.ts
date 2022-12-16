import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";
import {environment} from "../../../../environments/environment";
import {ObtenerFormularioService} from "../../service/obtenerFormulario/obtener-formulario.service";
import { AuthService } from '../auth.service';
import { ActividadComponent } from '../../actividad/actividad.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialogo-formulario-inscripcion',
  templateUrl: './dialogo-formulario-inscripcion.component.html',
  styleUrls: ['./dialogo-formulario-inscripcion.component.css']
})
/**
 * @file : dialogo-formulario-inscripcion.componet.ts
 * Modal de inscripciones de alumnos y actividades.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class DialogoFormularioInscripcionComponent implements OnInit {

  @Input() formulario: string ="";
  @Input() id: string ="";
  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  inscripcion:String="Clase";

  dropdownList:any = [];
  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    allowSearchFilter: true
  };

  esTutor:boolean = false;
  esCoordinador:boolean = false;

  seccion:String="";

  constructor(private formBuilder:FormBuilder,private http:HttpService,private obtenerFormulario: ObtenerFormularioService,
     private service:AuthService, private actividad:ActividadComponent) {

    this.crearFormulario();

  }

  ngOnInit(): void {
    /**
     * Obtenemos el idActividad y el tipo de formulario que debemos mostrar, inscripción de alumno o de clase.
     */
    this.obtenerFormulario.disparadorFormulario.subscribe(data =>{
      if(data.formulario=="1"){
        this.inscripcion="Alumno";
      }else{
        this.inscripcion="Clase";
      }
      this.seccion = data.seccion;
      this.cargarFormulario();
    })
  }
  /**
   * Cargamos el formulario correspondiente, añadiendo al select alumnos o clase dependiendo del tipo de formulario obtenido.
   */
  cargarFormulario(){

    //Obtiene tus rangos
    let rol = this.service.getYourRoles();

    let codSeccion = (this.service.getDecodedToken().tutorCurso != null ) ? this.service.getDecodedToken().tutorCurso?.codSeccion : this.service.getDecodedToken().coordinadorEtapa?.idEtapa;
    let idEtapa = (this.service.getDecodedToken().coordinadorEtapa?.idEtapa);

    if(this.inscripcion=="Alumno"){
       if(rol == "Tutor")
         this.seccionConcreta(codSeccion);
        else if(rol == "Coordinador") {
          /**
           * Comprobamos el select de sección para mostrar todos los alumnos de todas las secciones coordinadas por el usuario iniciado o
           * los alumnos pertenecientes a la sección indicada en el select por el usuario iniciado (coordinador).
           */
          if(this.seccion.toString() == 'Todas') {

             /**
              * Obtenemos los alumnos correspondientes a las secciones coordinadas por el coordinador inicado para añadirlos al select del formulario.
              */
             this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosCoordinador?idEtapa=${idEtapa}&codActividad=${this.id}`)
               .subscribe(res => {
                 let datos:any=[]

                 res.forEach((alumno:any) => {
                   datos.push({"item_id": alumno?.idAlumno, "item_text": alumno?.nombre + ' ----------> Sección: ' + alumno?.codSeccion})
                 });
                 this.dropdownList=datos

               });
           }else{
            this.seccionConcreta(this.seccion);
           }
        }
    }else{
      let datos:any=[];
      //CLASE
      /**
       * Comprobaríamos si es coordinador o tutor.
       */
      if(rol == "Coordinador")

        if(this.seccion.toString() == 'Todas') {
          /**
           * Obtenemos las clases correspondientes a la etapa, según la etapa corespondiente al coordinador iniciado para añadirlas al select del formulario.
           */
           this.http.get(environment.serverURL + `index.php/C_GestionActividades/getTodasClasesCoordinador?idEtapa=${idEtapa}&codActividad=${this.id}`)
           .subscribe(res => {
             let datos:any=[]

             res.forEach((clase:any) => {
               datos.push({"item_id": clase?.idSeccion, "item_text": clase?.codSeccion})
             });
             this.dropdownList=datos

           });
        }else{
          this.cursoConcreto(this.seccion);
        }
      else if(rol == "Tutor") {
        /**
         * Introducios en el select del formulario el código de la clase del tutor iniciado.
         */
        datos.push({"item_id": 1, "item_text":codSeccion})
        this.dropdownList=datos
      }

    }
  }

  /**
   * Método para validar los campos del formulario.
   * @param campo campo a validar
   */
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  /**
   * Método para crear el formulario de forma reactiva.
   */
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      idInscrito:['',[Validators.required ]]

    })

  }
  /**
   * Método para guardar el formulario comprobando si este es valido.
   * @param formulario formulario
   */
  guardar(grupo:FormGroup,botonCerrar:HTMLButtonElement) {

    let mensajeToast = new ToastComponent();

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control,botonCerrar)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar alta de inscripción", "cancel", "red");

      return;
    }

    var inscritos:any=[];

    if(this.inscripcion=='Alumno'){

      //Añade el id de todos los alumnos del select
      for(let i=0;i<grupo.value.idInscrito.length;i++){
        inscritos.push(Number(grupo.value.idInscrito[i].item_id));
      }

      /**
       * Comprobamos si la actividad es de pareja si tiene un número máximo de participantes por sección fijado
       */
      if(this.actividad.actividad.numMaxParticipantes!=null) {

        this.comprobarPareja(inscritos,mensajeToast,botonCerrar);

      } else {
        this.inscribirAlumnos(inscritos,mensajeToast,botonCerrar);
      }

    }else{

      for(let i=0;i<grupo.value.idInscrito.length;i++){
        inscritos.push(grupo.value.idInscrito[i].item_text);
      }

      //CLASE
      let bodyInscripcion = {
        idActividad: parseInt(this.id),
        idSeccion: inscritos
      };

      this.http.post(environment.serverURL + "index.php/C_GestionActividades/setInscripcionClase", bodyInscripcion).subscribe({
        error: error => {
          console.error("Se produjo un error: ", error);

          mensajeToast.generarToast("ERROR en la Base de Datos al inscribir", "cancel", "red");

        },
        complete: () => {
          mensajeToast.generarToast("Inscripción guardada correctamente", "check_circle", "green");
          botonCerrar.click();
          this.actividad.restartDatos();
        }
      });

    }

    this.forma.reset();
  }

  seccionConcreta(codSeccion:any){
    /**
     * Obtenemos los alumnos correspondientes a la sección, según la seccion seleccionada en el select para coordinador
     */
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosTutor?codSeccion='${codSeccion}'&codActividad=${this.id}`)
      .subscribe(res => {
        let datos:any=[]

        res.forEach((alumno:any) => {
          datos.push({"item_id": alumno?.idAlumno, "item_text": alumno?.nombre})
        });
        this.dropdownList=datos

      });
  }

  cursoConcreto(codCurso:any){
    /**
     * Obtenemos las clases correspondientes a la etapa, según la etapa seleccionada en el select para coordinador.
     */
      this.http.get(environment.serverURL + `index.php/C_GestionActividades/getClasesCoordinador?codCurso='${this.seccion}'&codActividad=${this.id}`)
      .subscribe(res => {
        let datos:any=[]
        for(let i=0;i<res.length;i++){
          datos.push({"item_id": res[i].idSeccion, "item_text":res[i].codSeccion})
          this.dropdownList=datos
        }
      });
  }

  /**
   * Resetear formulario.
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }


  inscribirAlumnos(inscritos:any,mensajeToast:any,botonCerrar:any){
    let bodyInscripcion = {
      idActividad:this.id,
      idAlumno: inscritos
    };

    this.http.post(environment.serverURL + "index.php/C_GestionActividades/setInscripcionIndividual", bodyInscripcion).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error);

        mensajeToast.generarToast("ERROR en la Base de Datos al inscribir", "cancel", "red");

      },
      complete: () => {
        mensajeToast.generarToast("Inscripción guardada correctamente", "check_circle", "green");
        botonCerrar.click();
        this.actividad.restartDatos();
      }
    });
  }

  /**
   * 
   * @param inscritos ID de la persona seleccionada.
   * @param mensajeToast 
   * @param botonCerrar 
   */
  comprobarPareja(inscritos:any,mensajeToast:any,botonCerrar:any){
    console.log("entro en comprobarPareja")
    let inscribir:Boolean = false;
    /**
     * Obtenemos los alumnos correspondientes a la sección, según la seccion corespondiente al tutor iniciado para añadirlos al select del formulario.
     */
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getComprobarParejas?idActividad=${this.id}&alumnos=${inscritos}`)
      .subscribe(res => {
        console.log(res)
        for(let i=0;i<res.length;i++){
          console.log(res[i]);
          
          if(res[i].total > this.actividad.actividad.numMaxParticipantes){
            inscribir = false;
          }else{
            inscribir = true;
          }
        }
        console.log("inscribir" + inscribir)
        if(inscribir) {
          console.log("entro en inscribir")
          this.inscribirAlumnos(inscritos,mensajeToast,botonCerrar);
        } else {
          console.log("entro en error")
          mensajeToast.generarToast("ERROR el número máximo por sección ha sido superado", "cancel", "red");
        }
      });

  }

  /////////////
  comprobarPareja2(inscritos:any) {
    let inscribir;
    var subject = new Subject<Boolean>();
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getComprobarParejas?idActividad=${this.id}&alumnos=${inscritos}`)
    .subscribe(items => {
        items.map((item:any) => {

          if(item.total > this.actividad.actividad.numMaxParticipantes){
            console.log("entra en false (aaa y tal)")
            subject.next(false)
            inscribir = false;
          }
          subject.next(true)
          // inscribir=item.total;
          // subject.next(inscribir);
        });
      }
    );

    return subject.asObservable();
  }

}


