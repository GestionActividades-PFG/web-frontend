import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import {environment} from "../../../../environments/environment";
import {ObtenerFormularioService} from "../../service/obtenerFormulario/obtener-formulario.service";

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
  inscripcion:String="";

  dropdownList:any = [];
  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    allowSearchFilter: true
  };
  constructor(private formBuilder:FormBuilder,private http:HttpService,private obtenerFormulario: ObtenerFormularioService) {

    this.crearFormulario();

  }

  ngOnInit(): void {
    /**
     * Obtenemos el idActividad y el tipo de formulario
     */
    this.obtenerFormulario.disparadorFormulario.subscribe(data =>{
      if(data.formulario=="1"){
        this.inscripcion="Alumno";
      }else{
        this.inscripcion="Clase";
      }
      this.cargarFormulario();
      this.crearFormulario()
    })
  }

  cargarFormulario(){
    if(this.inscripcion=="Alumno"){
      //INDIVIDUALES

      //Comprobaríamos si es coordinador o tutor, si es coordinador llamada para listar todos alumnos de su etapa

      //TUTOR
      /**
       * Obtenemos los alumnos correspondientes a la sección, según la seccion corespondiente al tutor logeado
       * para añadirlos al select
       */
      this.http.get(environment.serverURL + `index.php/C_GestionActividades//getAlumnosTutor?codSeccion=1ESOB`)
        .subscribe(res => {
          let datos:any=[]
          for(let i=0;i<res.length;i++){
            datos.push({"item_id": res[i].idAlumno, "item_text":res[i].nombre})
            this.dropdownList=datos
          }
        });
      // DE MOMENTO PUESTO A MANO EL ID DE LA SECCION

      //COORDINADOR
      // /**
      //  * Obtenemos los alumnos correspondientes a la etapa, según la etapa corespondiente al coordinador logeado
      //  * para añadirlos al select
      //  */
      // this.http.get(environment.serverURL + `index.php/C_GestionActividades//getAlumnosCoordinador?idEtapa=1`)
      //   .subscribe(res => {
      //     let datos:any=[]
      //     for(let i=0;i<res.length;i++){
      //       datos.push({"item_id": res[i].idAlumno, "item_text":res[i].nombre})
      //       this.dropdownList=datos
      //     }
      //   });
      //DE MOMENTO PUESTO A MANO LA ETAPA 1

    }else{
      //CLASE
      //Comprobaríamos si es coordinador o tutor, si es coordinador llamada para listar todas las secciones de su etapa

    }
  }

  /**
   * Método para validar campos del formulario
   * @param campo campo a validar
   */
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  /**
   * Método para crear el formulario de forma reactiva
   */
  crearFormulario(){

    if(this.inscripcion=="Alumno"){
      this.forma = this.formBuilder.group
      ({
        idAlumno:['',[Validators.required ]]

      })
    }else{
      this.forma = this.formBuilder.group
      ({
        idClase:['',[Validators.required ]]

      })
    }

  }
  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar(grupo:FormGroup) {

    let mensajeToast = new ToastComponent();
    console.log(grupo)

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar alta de inscripción", "cancel", "red");

      return;
    }

    console.log(grupo.value)

    if(this.inscripcion=='Alumno'){
      var alumnos:any=[];
      for(let i=0;i<grupo.value.idAlumno.length;i++){
        alumnos.push(Number(grupo.value.idAlumno[i].item_id));
      }
      console.log(alumnos)
      let bodyInscripcion = {
        idActividad:this.id,
        idAlumno: alumnos
      };
      console.log(bodyInscripcion.idAlumno)
      this.http.post(environment.serverURL + "index.php/C_GestionActividades/setInscripcionIndividual", bodyInscripcion).subscribe({
        error: error => {
          console.error("Se produjo un error: ", error);
          //Cerrar modal
          document.getElementById("cerrar")!.click();

          mensajeToast.generarToast("ERROR en la Base de Datos al inscribir", "cancel", "red");

        },
        complete: () => {
          //Cerrar modal
          document.getElementById("cerrar")!.click();

          mensajeToast.generarToast("Inscripción guardada correctamente", "check_circle", "green");
        }
      });
    }else{
      //CLASE

    }

    this.forma.reset();
    //Cerrar modal
    document.getElementById("cerrar")!.click();

  }
  /**
   * Resetear formulario
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

}
