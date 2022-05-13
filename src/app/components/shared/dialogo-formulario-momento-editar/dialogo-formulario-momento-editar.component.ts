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

  //@Input() id: string ="";
  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  
  nombre:any = "aaa";
  fechaInicio:any;
  fechaFin:any;
  
  datos:Array<any> = [];
  test:any;


  private formBuilder:FormBuilder = new FormBuilder();

  
  constructor(private http:HttpService) {
    this.crearFormulario();

    //console.log(this.id);
  }

  ngOnInit(): void {

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
  crearFormulario(test:any=null){

    this.forma = new FormBuilder().group
    ({
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
      fechaInicio_Inscripcion:['',[Validators.required, ]],
      fechaFin_Inscripcion:['',[Validators.required]],

    })

 

    //this.cargarDatosForm()

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
        console.log("Se cargo correctamente la modificación de momento con los siguientes datos1: \n", this.datos );
        this.forma.patchValue({
          nombre: "holis"
        })
        
        document.getElementById("nombre")?.setAttribute("value","" + this.datos[0].nombre);
        document.getElementById("fechaInicio")?.setAttribute("value","" + this.datos[0].fechaInicio_Inscripcion);
        document.getElementById("fechaFin")?.setAttribute("value","" + this.datos[0].fechaFin_Inscripcion);


      }
    });

    /*
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos?idMomento=" + idMomento).subscribe(res => {
      this.datos = res[0];
      
      this.nombre = res[0].nombre;
      this.fechaInicio = res[0].fechaInicio_Inscripcion;
      this.fechaFin = res[0].fechaFin_Inscripcion;
      
      
      document.getElementById("nombre")?.setAttribute("value", ""+this.nombre);
      document.getElementById("fechaInicio")?.setAttribute("value", "12-05-2022");

      console.log("Se cargo la modificación de momento con los siguientes datos: \n",res, res[0].nombre );

    });
    */
    

  }

  /**
   * Método para guardar el formulario comprobando si este es valido
   * @param formulario formulario
   */
  guardar(formulario:FormGroup) {

    let mensajeToast = new ToastComponent();
    console.log(formulario)

    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(control => {
        if (control instanceof FormGroup) this.guardar(control)
        control.markAsTouched();
      });

      mensajeToast.generarToast("ERROR al guardar modificación de momento", "cancel", "red");
      return;
    }

    console.log(formulario.value)
    
    mensajeToast.generarToast("Modificación de momento guardada correctamente", "check_circle", "green");


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
