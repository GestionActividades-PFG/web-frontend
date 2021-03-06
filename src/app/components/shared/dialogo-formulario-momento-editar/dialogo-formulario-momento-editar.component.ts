import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import { AdministrarComponent } from '../../administrar/administrar.component';
import {ToastComponent} from "../toast/toast.component";
import {ObtenerIdService} from "../../service/obtenerId/obtener-id.service";

@Component({
  selector: 'app-dialogo-formulario-momento-editar',
  templateUrl: './dialogo-formulario-momento-editar.component.html',
  styleUrls: ['./dialogo-formulario-momento-editar.component.css']
})
/**
 * @file : dialogo-formulario-momento-editar.componet.ts
 * Modal para editar momentos.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class DialogoFormularioMomentoEditarComponent implements OnInit {

  administrar:AdministrarComponent | undefined;

  fecha = new Date();
  fechaMinFin: null | string ="";
  fechaMaxima=new Date(this.fecha.getFullYear()+1+"-12-31 00:00:00");
  forma!: FormGroup;
  datos:Array<any> = [];
  loading:boolean = true;

  idMomento: number | undefined;

  private element: any;

  constructor(private formBuilder:FormBuilder,private http:HttpService,private obtenerid: ObtenerIdService,private el: ElementRef, private admin:AdministrarComponent) {
    this.element = el.nativeElement;
    this.crearFormulario()

  }

  ngOnInit(): void {
    /**
     * Obtenemos el idMomento
     */
    this.obtenerid.disparadorId.subscribe(data =>{
      this.idMomento=data.data;
      if(data.modificar=='m'){
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
      fechaInicio_Inscripcion:['',[Validators.required]],
      fechaFin_Inscripcion:['',[Validators.required]],

    })
    this.onValueChanges();
  }
  /**
   * Método para cargar values de formulario del formulario con los datos de la Base de Datos.
   * @param id , id del momento que se desea modificar
   */
  cargarValues(id:any){

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos?idMomento=" + id)
      .subscribe({
        next: res => {
          this.datos=[];
          this.datos.push(res[0]);
        },
        error: error => {
          console.error("Se produjo un error: ", error);

        },
        complete: () => {


          this.fecha=this.datos[0].fechaInicio_Inscripcion;
          this.fechaMinFin=this.cambiarFechaDatetime(this.fecha);

          this.forma.get("nombre")?.setValue(this.datos[0].nombre);
          this.forma.get("fechaInicio_Inscripcion")?.setValue(this.cambiarFechaDatetime(this.fecha));
          this.forma.get("fechaFin_Inscripcion")?.setValue(this.cambiarFechaDatetime(this.datos[0].fechaFin_Inscripcion));

          this.loading = true;

        }
      });
  }
  /**
   * Método para guardar el formulario comprobando si este es valido.
   * @param formulario formulario
   */
  guardar(grupo:FormGroup,botonCerrar: HTMLButtonElement) {

    let mensajeToast = new ToastComponent();

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control,botonCerrar)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar alta de momento", "cancel", "red");
      return;
    };


    //Guardamos los nuevos cambios
    let body = {
      nombre: grupo.value.nombre,
      fechaInicio:this.cambiarFechaBbdd(grupo.value.fechaInicio_Inscripcion),
      fechaFin:this.cambiarFechaBbdd(grupo.value.fechaFin_Inscripcion)
    };

    /**
     * Llamada para modificar momento.
     */
    this.http.put(environment.serverURL + "index.php/C_GestionActividades/updateMomento?idMomento="+this.idMomento, body).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error);

        mensajeToast.generarToast("ERROR en la Base de Datos al modificar el momento", "cancel", "red");

      },
      complete: () => {

        mensajeToast.generarToast("Modificación de momento guardada correctamente", "check_circle", "green");
        this.admin?.restartDatos();
        botonCerrar.click();
      }
    });

    this.forma.reset();

  }
  /**
   * Resetear formulario.
   * @param forma formulario
   */
  resetForm(forma: FormGroup) {
    forma.reset();
  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato del tipo de dato datetime.
   * @param fecha
   */
  cambiarFechaDatetime(fecha:any){
    if(fecha == "0000-00-00 00:00:00") return null;
    let date2 = new Date(fecha);
    return new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).toISOString().slice(0,-8);
  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la Base de Datos.
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    let date2 = new Date(fecha);
    return new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace('T', ' ');
  }

  /**
   * Método para substraer carácteres de fécha mínima y máxima.
   * @param fecha
   */
  substringFechas(fecha:String){
    return fecha.substring(0, fecha.length - 8);
  }

  /**
   * Método para obtener values a tiempo real mientras que se está modificando el formulario, de esta manera validamos las fechas del formulario.
   */
  onValueChanges(): void {
    this.forma.valueChanges.subscribe(val=>{
      this.fechaMinFin=val.fechaInicio_Inscripcion;
      if(val.fechaInicio_Inscripcion>val.fechaFin_Inscripcion){
        this.forma.get("fechaFin_Inscripcion")?.reset();
      }
    })
  }
}
