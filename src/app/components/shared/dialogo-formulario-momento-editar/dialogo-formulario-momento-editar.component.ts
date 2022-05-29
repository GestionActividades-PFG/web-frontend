import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import { AdministrarComponent } from '../../administrar/administrar.component';
import {ToastComponent} from "../toast/toast.component";


@Component({
  selector: 'app-dialogo-formulario-momento-editar',
  templateUrl: './dialogo-formulario-momento-editar.component.html',
  styleUrls: ['./dialogo-formulario-momento-editar.component.css']
})
export class DialogoFormularioMomentoEditarComponent implements OnInit {

  administrar:AdministrarComponent | undefined;


  @Input() idMomento: String = "-99";

  newForm:boolean = true;

  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear() + 1 + "-12-31";

  datos:Array<any> = [];

  id:any = null;

  nombre: string = "";
  inicio: string = "";
  fin: string = "";

  loading:boolean = true;

  constructor(private http:HttpService, private _route:ActivatedRoute) {}

  ngOnInit(): void {}

  /**
   * Valida un campo de texto por medio de REGEX
   * @param texto -> Texto a validar
   * @param esFecha Boolean -> Indicamos si es una fecha o no.
   * @returns Boolean
   */
  validacion(texto:string, esFecha:Boolean=false) {
    if(esFecha && texto.length == 0 || texto.length == null) return false;

    let regex = '^[a-zA-Z]{5,60}$';

    return texto.match(regex)

  }

  
  /**
   * Cargamos datos del momento seleccionado a los value del formulario
   */
  cargarDatosForm(idMomento:Number) {

    //El HTML carga antes que los datos... 

    //Asignamos el id al scope correcto...

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos?idMomento=" + idMomento)
    .subscribe({
      next: res => {
        console.log("Han llegado los siguientes datos",res );
        this.datos.push(res[0]);
      },
      error: error => {
        console.error("Se produjo un error: ", error);

      },
      complete: () => {
        this.newForm = false; //Reset a variable
        //Aquí se quitaría la pantalla de carga...
        console.log("Se cargo correctamente la modificación de momento con los siguientes datos1: \n", this.datos, this.fecha );

        console.log(this.datos[0].fechaFin_Inscripcion);

        document.getElementById("nombre")?.setAttribute("value", "" + this.datos[0].nombre);

        document.getElementById("fechaInicio")?.setAttribute("value", "" +  this.cambiarFechaDatetime(this.datos[0].fechaInicio_Inscripcion));
        document.getElementById("fechaFin")?.setAttribute("value", "" + this.cambiarFechaDatetime(this.datos[0].fechaFin_Inscripcion));
        
        this.loading = true;

      }
    });

    if(!this.loading) {
      this.id = idMomento;
    }

  }

  getValue(nombre:any, inicio:any, fin:any){

    this.nombre = nombre;
    this.inicio = inicio;
    this.fin = fin;

    this.guardar();
  }

  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar() {
    let mensajeToast = new ToastComponent();

    //Iteramos sobre todas las clases de .mb-3 (inputs)
    Array.from(document.querySelectorAll("form#momentosMod .mb-3 input")).forEach((element,index) => {

      let tipo = (index == 1) ? this.inicio : this.fin;
      if(this.id === -99 || index > 0 && !this.validacion(tipo)) { //Validación de campos...
        mensajeToast.generarToast("ERROR al guardar modificación de momento", "cancel", "red");
        return;
      }

    });




    //Guardamos los nuevos cambios
    let body = {
      nombre: this.nombre,
      fechaInicio: this.cambiarFechaBbdd(this.inicio),
      fechaFin: this.cambiarFechaBbdd(this.fin)
    }

    this.http.put(environment.serverURL + "index.php/C_GestionActividades/updateMomento?idMomento="+this.idMomento, body)
    .subscribe(res => console.log(res)
    )

    mensajeToast.generarToast("Modificación de momento guardada correctamente", "check_circle", "green");

    //Cerrar modal
    document.getElementById("cerrar")!.click();
   // let administrar = new AdministrarComponent(this.http, this._route);
    this.administrar?.restartDatos();

  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato del tipo de dato datetime
   * @param fecha
   */
  cambiarFechaDatetime(fecha:any){
    //console.log(fecha)
    if(fecha == "0000-00-00 00:00:00") return null;

    return new Date(fecha).toISOString().slice(0,-8);
  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato de la BBDD
   * @param fecha
   */
  cambiarFechaBbdd(fecha:any){
    console.log(fecha)
    return new Date(fecha).toISOString().substr(0, 19).replace('T', ' ');
  }

}
