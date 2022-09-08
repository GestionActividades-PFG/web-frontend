import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastComponent } from '../toast/toast.component';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import {ActivatedRoute} from "@angular/router";
import { AdministrarComponent } from '../../administrar/administrar.component';

@Component({
  selector: 'app-dialogo-formulario-actividad-alta',
  templateUrl: './dialogo-formulario-actividad-alta.component.html',
  styleUrls: ['./dialogo-formulario-actividad-alta.component.css']
})
/**
 * @file : dialogo-formulario-actividad-alta.componet.ts
 * Modal para dar de alta actividades.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class DialogoFormularioActividadAltaComponent implements OnInit {

  fecha = new Date();
  fechaMaxima=new Date(this.fecha.getFullYear()+1+"-12-31 00:00:00");
  forma!: FormGroup;
  idMomento=this._route.snapshot.paramMap.get('apartado');
  responsables:any;
  requerido:boolean=false;
  dropdownList:any = [];
  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: true,
    allowSearchFilter: true
  };
  constructor(private formBuilder:FormBuilder,private http:HttpService,private _route:ActivatedRoute, private administrar:AdministrarComponent) {

    this.crearFormulario();
    /**
     * Llamada para obtener los usuarios responsables de la actividad y almacenarlos en el select correspondiente.
     */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getModificacionActividad").subscribe(res => {

      this.responsables=res.responsables;

      let datos:Array<any> = [];
      res.etapas.forEach((etapa:any) => {
        datos.push({"item_id": etapa.idEtapa, "item_text": etapa.codEtapa})
      });
      this.dropdownList=datos;

    });

  }

  ngOnInit(): void {

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
      idMomento:[this.idMomento],
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      sexo:['',[Validators.required]],
      esIndividual:[''],
      idResponsable:['',[Validators.required]],
      idEtapa:['',[Validators.required]],
      tipo_Participacion:['G',[Validators.required]],
      descripcion:[null,[Validators.maxLength(200)] ],
      material:[null,[Validators.maxLength(100)] ],
      numMaxParticipantes:[null],
      fechaInicio_Actividad:[null],
      fechaFin_Actividad:[null],
    })
    this.onValueChanges();

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

      mensajeToast.generarToast("ERROR al guardar alta de actividad", "cancel", "red");

      return;
    }

    if(grupo.value.esIndividual){
      grupo.value.esIndividual=1;
    }else{
      grupo.value.esIndividual=0;
    }

    var etapas:any=[];
    for(let i=0;i<grupo.value.idEtapa.length;i++){
      etapas.push(Number(grupo.value.idEtapa[i].item_id));
    }

    let bodyActividad = {
      idMomento: this.idMomento,
      nombre: grupo.value.nombre,
      sexo:grupo.value.sexo,
      esIndividual:grupo.value.esIndividual,
      idResponsable:grupo.value.idResponsable,
      tipo_Participacion:grupo.value.tipo_Participacion,
      idEtapa:etapas,
      descripcion:grupo.value.descripcion,
      material:grupo.value.material,
      numMaxParticipantes:grupo.value.numMaxParticipantes,
      fechaInicio_Actividad:this.cambiarFechaBbdd(grupo.value.fechaInicio_Actividad),
      fechaFin_Actividad:this.cambiarFechaBbdd(grupo.value.fechaFin_Actividad)
    };

    /**
     * Llamada para dar de alta actividad.
     */
    this.http.post(environment.serverURL + "index.php/C_GestionActividades/addActividades", bodyActividad).subscribe({
      error: error => {
        console.error("Se produjo un error: ", error, bodyActividad);

        mensajeToast.generarToast("ERROR en la Base de Datos al crear la actividad", "cancel", "red");

      },
      complete: () => {
        mensajeToast.generarToast("Alta de actividad guardada correctamente", "check_circle", "green");
        this.administrar.restartDatos();
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
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la Base de Datos.
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    let date2 = new Date(fecha);
    let date=new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace('T', ' ');
    if(date=="1970-01-01 01:00:00"){
      return null;
    }
    return date;
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
