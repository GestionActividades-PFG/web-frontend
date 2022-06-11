import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";
import {environment} from "../../../../environments/environment";
import {ObtenerFormularioService} from "../../service/obtenerFormulario/obtener-formulario.service";
import { AuthService } from '../auth.service';
import { ActividadComponent } from '../../actividad/actividad.component';

@Component({
  selector: 'app-dialogo-formulario-inscripcion',
  templateUrl: './dialogo-formulario-inscripcion.component.html',
  styleUrls: ['./dialogo-formulario-inscripcion.component.css']
})
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

  constructor(private formBuilder:FormBuilder,private http:HttpService,private obtenerFormulario: ObtenerFormularioService, private service:AuthService, private actividad:ActividadComponent) {

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
      this.cargarFormulario();
    })
  }

  /**
   * Cargamos el formulario correspondiente, añadiendo al select alumnos o clase dependiendo del tipo de formulario obtenido.
   */
  cargarFormulario(){

    if(this.service.getDecodedToken().role.find(rol => rol.nombre == "Coordinador")?.nombre
      && (this.service.getDecodedToken().coordinadorEtapa != null
        || this.service.getDecodedToken().coordinadorEtapa != undefined))
      this.esCoordinador = true;

      if(this.service.getDecodedToken().role.find(rol => rol.nombre == "Tutor")?.nombre
        && (this.service.getDecodedToken().tutorCurso.codSeccion != null
        || this.service.getDecodedToken().tutorCurso.codSeccion != undefined))
          this.esTutor = true;

    let codSeccion = (this.service.getDecodedToken().tutorCurso?.codSeccion);
    let idEtapa = (this.service.getDecodedToken().coordinadorEtapa?.idEtapa);

    if(this.inscripcion=="Alumno"){
      //INDIVIDUALES
      /**
       * Comprobaríamos si es coordinador o tutor.
       */
      if(this.esCoordinador)
        /**
         * Obtenemos los alumnos correspondientes a la etapa, según la etapa corespondiente al coordinador iniciado para añadirlos al select del formulario.
         */
        this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosCoordinador?idEtapa='${idEtapa}'`)
          .subscribe(res => {
            let datos:any=[]
            for(let i=0;i<res.length;i++){
              datos.push({"item_id": res[i]?.idAlumno, "item_text":res[i]?.nombre})
              this.dropdownList=datos
            }
        });
      else if(this.esTutor)
        /**
         * Obtenemos los alumnos correspondientes a la sección, según la seccion corespondiente al tutor iniciado para añadirlos al select del formulario.
         */
        this.http.get(environment.serverURL + `index.php/C_GestionActividades/getAlumnosTutor?codSeccion='${codSeccion}'`)
          .subscribe(res => {
            let datos:any=[]
            for(let i=0;i<res.length;i++){
              datos.push({"item_id": res[i]?.idAlumno, "item_text":res[i]?.nombre})
              this.dropdownList=datos
            }
          });
    }else{
      let datos:any=[];
      //CLASE
      /**
       * Comprobaríamos si es coordinador o tutor.
       */
      if(this.esCoordinador)
        /**
         * Obtenemos las clases correspondientes a la etapa, según la etapa corespondiente al coordinador iniciado para añadirlas al select del formulario.
         */
        this.http.get(environment.serverURL + `index.php/C_GestionActividades//getClasesCoordinador?idEtapa='${idEtapa}'`)
          .subscribe(res => {
            let datos:any=[]
            for(let i=0;i<res.length;i++){
              datos.push({"item_id": res[i].idSeccion, "item_text":res[i].codSeccion})
              this.dropdownList=datos
            }
          });
      else if(this.esTutor) {
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

      for(let i=0;i<grupo.value.idInscrito.length;i++){
        inscritos.push(Number(grupo.value.idInscrito[i].item_id));
      }

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
    }else{

      for(let i=0;i<grupo.value.idInscrito.length;i++){
        inscritos.push(grupo.value.idInscrito[i].item_text);
      }

      //CLASE
      let bodyInscripcion = {
        idActividad:this.id,
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
  /**
   * Resetear formulario.
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

}
