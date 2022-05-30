import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import {ToastComponent} from "../toast/toast.component";
import {ObtenerIdService} from "../../service/obtenerId/obtener-id.service";

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
  datos:Array<any> = [];
  requerido:boolean=false;
  loading:boolean = true;

  idActividad: number | undefined;

  private element: any;

  constructor(private formBuilder:FormBuilder,private http:HttpService,private obtenerid: ObtenerIdService,private el: ElementRef) {
    this.element = el.nativeElement;
    this.crearFormulario();
    /**
     * Llamada para obtener los responsables y almacenarlos en el select correspondiente
     */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getModificacionActividad").subscribe(res => {
      this.responsables=res.responsables;
    });

  }

  ngOnInit(): void {
    this.obtenerid.disparadorId.subscribe(data =>{
      this.idActividad=data.data;
      if(data.modificar=='a'){
        this.cargarValues(data.data);
      }
    })

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
      tipo_Participacion:['G',[Validators.required]],
      descripcion:['',[Validators.maxLength(200)] ],
      material:['',[Validators.maxLength(100)] ],
      numMaxParticipantes:[''],
      fechaInicio_Actividad:[''],
      fechaFin_Actividad:[''],
    })
    this.onValueChanges();
  }
  /**
   * Método para cargar values de formulario
   * @param id , id del momento que se desea modificar
   */
  cargarValues(id:any){

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividad?idActividad=" + id)
      .subscribe({
        next: res => {
          this.datos.push(res[0]);
        },
        error: error => {
          console.error("Se produjo un error: ", error);

        },
        complete: () => {

          this.forma.get("nombre")?.setValue(this.datos[0].nombre);
          this.forma.get("sexo")?.setValue(this.datos[0].sexo);
          this.forma.get("esIndividual")?.setValue(this.datos[0].esIndividual);
          this.forma.get("idResponsable")?.setValue(this.datos[0].idResponsable);
          this.forma.get("descripcion")?.setValue(this.datos[0].descripcion);
          this.forma.get("material")?.setValue(this.datos[0].material);
          this.forma.get("numMaxParticipantes")?.setValue(this.datos[0].numMaxParticipantes);
          this.forma.get("fechaInicio_Actividad")?.setValue(this.cambiarFechaDatetime(this.datos[0].fechaInicio_Actividad));
          this.forma.get("fechaFin_Actividad")?.setValue(this.cambiarFechaDatetime(this.datos[0].fechaFin_Actividad));

          this.loading = true;

        }
      });
  }
  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar(grupo:FormGroup) {

    let mensajeToast = new ToastComponent();

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar modificación de actividad", "cancel", "red");

      return;
    }

    let body = [{
      nombre: grupo.value.nombre,
      sexo: grupo.value.sexo,
      esIndividual: grupo.value.esIndividual,
      idResponsable: grupo.value.idResponsable,
      tipo_Participacion: grupo.value.tipo_Participacion,
      descripcion: grupo.value.descripcion,
      material: grupo.value.material,
      numMaxParticipantes: grupo.value.numMaxParticipantes,
      fechaInicio_Actividad:this.cambiarFechaBbdd(grupo.value.fechaInicio_Actividad),
      fechaFin_Actividad:this.cambiarFechaBbdd(grupo.value.fechaFin_Actividad)
    }];

    /**
     * Llamada para dar de alta momento
     */
    this.http.put(environment.serverURL + "index.php/C_GestionActividades/updateActividad?idActividad="+this.idActividad, body).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error);

        mensajeToast.generarToast("ERROR en la Base de Datos al modificar la actividad", "cancel", "red");

      },
      complete: () => {

        mensajeToast.generarToast("Modificación de actividad guardada correctamente", "check_circle", "green");
      }
    });

    //Cerrar modal
    // document.getElementById("cerrar")!.click();
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');

  }
  /**
   * Resetear formulario
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }
  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato del tipo de dato datetime
   * @param fecha
   */
  cambiarFechaDatetime(fecha:any){
    if(fecha == "0000-00-00 00:00:00") return null;
    return new Date(fecha).toISOString().slice(0,-8);
  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la BBDD
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    return new Date(fecha).toISOString().substr(0, 19).replace('T', ' ');
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
