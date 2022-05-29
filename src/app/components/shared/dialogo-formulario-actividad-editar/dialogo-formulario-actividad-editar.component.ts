import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-dialogo-formulario-actividad-editar',
  templateUrl: './dialogo-formulario-actividad-editar.component.html',
  styleUrls: ['./dialogo-formulario-actividad-editar.component.css']
})
export class DialogoFormularioActividadEditarComponent implements OnInit {

  fecha = new Date();
  fechaMaxima=new Date(this.fecha.getFullYear()+1+"-12-31 00:00:00");
  forma!: FormGroup;
  responsables:any;
  requerido:boolean=false;

  private formBuilder:FormBuilder = new FormBuilder();

  constructor(private http:HttpService) {

    this.crearFormulario();
    /**
     * Llamada para obtener los responsables y almacenarlos en el select correspondiente
     */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getModificacionActividad").subscribe(res => {
      this.responsables=res.responsables;
    });

  }

  ngOnInit(): void {}

  /**
   * Cargamos datos del momento seleccionado a los value del formulario
   */
  cargarDatosForm(idActividad:Number) {

    //Coger id de la actividad
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getModificacionActividad?idActividad="+idActividad).subscribe(res => {
      console.log(res);
    });

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

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idResponsable:['',[Validators.required]],
      descripcion:['',[Validators.maxLength(200)] ],
      material:['',[Validators.maxLength(100)] ],
      numMaxParticipantes:[''],
      fechaInicio_Inscripcion:[''],
      fechaFin_Inscripcion:[''],
    })
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

      mensajeToast.generarToast("ERROR al guardar modificación de actividad", "cancel", "red");

      return;
    }

    console.log(grupo.value)

    mensajeToast.generarToast("Modificación de actividad guardada correctamente", "check_circle", "green");

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
  /**
   * Método para substraer carácteres de fécha mínima y máxima
   * @param fecha
   */
  substringFechas(fecha:String){
    return fecha.substring(0, fecha.length - 8);
  }
  /**
   * Método para obtener values a tiempo real
   */
  onValueChanges(): void {
    this.forma.valueChanges.subscribe(val=>{
      document.getElementById("fechaFin_Actividad")!.setAttribute("min", val.fechaInicio_Actividad);
      if(val.fechaInicio_Actividad>val.fechaFin_Actividad){
        this.forma.get("fechaFin_Actividad")?.reset()
      }
      if(val.fechaInicio_Actividad==null && val.fechaFin_Actividad!=null){
        this.requerido=true;
      }

    })
  }
}
