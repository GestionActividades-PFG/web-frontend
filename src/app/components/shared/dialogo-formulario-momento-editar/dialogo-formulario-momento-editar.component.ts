import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";


@Component({
  selector: 'app-dialogo-formulario-momento-editar',
  templateUrl: './dialogo-formulario-momento-editar.component.html',
  styleUrls: ['./dialogo-formulario-momento-editar.component.css']
})
export class DialogoFormularioMomentoEditarComponent implements OnInit {

  fecha = new Date();
  //fecha:any = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate() + " " + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();
  fechaMaxima = this.fecha.getFullYear() + 1 + "-12-31";
  forma!: FormGroup;

  datos:Array<any> = [];

  idMomento:any;


  private formBuilder:FormBuilder = new FormBuilder();


  constructor(private http:HttpService) {
    //this.crearFormulario();

    //console.log(this.id);
  }

  ngOnInit(): void {}

  validacion(texto:string, esFecha:Boolean=false) {
    if(esFecha && texto.length == 0 || texto.length == null) return false;

    let regex = '^[a-zA-Z]{5,60}$';

    return texto.match(regex)

  }

  /**
   * Cargamos datos del momento seleccionado a los value del formulario
   */
  cargarDatosForm(idMomento:Number){


    console.log("Cargamos los datos con el id: " + idMomento)

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos?idMomento=" + idMomento)
    .subscribe({
      next: res => {
        console.log("Han llegado los siguientes datos \n",res );
        this.datos.push(res[0]);
      },
      error: error => {
        console.error("Se produjo un error: ", error);

      },
      complete: () => {
        //Aquí se quitaría la pantalla de carga...

        console.log("Se cargo correctamente la modificación de momento con los siguientes datos1: \n", this.datos, this.fecha );

        document.getElementById("nombre")?.setAttribute("value","" + this.datos[0].nombre);
        document.getElementById("fechaInicio")?.setAttribute("value","" +  this.cambiarFecha(this.datos[0].fechaInicio_Inscripcion));
        document.getElementById("fechaFin")?.setAttribute("value","" + this.cambiarFecha(this.datos[0].fechaFin_Inscripcion));

        //Asignamos el id al scope correcto...
        this.idMomento = idMomento;
      }
    });

  }

  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar(formulario:FormGroup) {

    let mensajeToast = new ToastComponent();

    //Iteramos sobre todas las clases de .mb-3 (inputs)
    Array.from(document.querySelectorAll("form#momentosMod .mb-3 input")).forEach((element,index) => {


      if(element.getAttribute("value") == null) {
        element.setAttribute("value", "" +  element.getAttribute("value"));
      }

    console.log("Elmeneto:", element.getAttribute("value"));

      //Validamos el campo, si da fallo, mostramos un error y salimos
      if(!this.validacion(element?.getAttribute("value") as string)) {
        mensajeToast.generarToast("ERROR al guardar modificación de momento", "cancel", "red");
        return;
      }
    });

    //Guardamos los nuevos cambios
    let body = {
      nombre: document.getElementById("nombre")?.getAttribute("value"),
      fechaInicio: this.cambiarFecha(document.getElementById("fechaInicio")?.getAttribute("value")),
      fechaFin: this.cambiarFecha(document.getElementById("fechaFin")?.getAttribute("value"))
    }

    console.log("Comprueba: ", body.fechaInicio);


    this.http.put(environment.serverURL + "index.php/C_GestionActividades/updateMomento?idMomento="+this.idMomento, body)
    .subscribe(res => console.log(res)
    )


    mensajeToast.generarToast("Modificación de momento guardada correctamente", "check_circle", "green");


    this.forma.reset();

    //Cerrar modal
    document.getElementById("cerrar")!.click();

  }

  /**
   * Cambio de formato de la fecha para hacerla coincidir con el formato del tipo de dato datatime
   * @param fecha
   */
  cambiarFecha(fecha:any){
    //console.log(fecha)
    return new Date(fecha).toISOString().slice(0,-8);
  }

}
