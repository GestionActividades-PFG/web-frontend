import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../http.service";
import {ToastComponent} from "../toast/toast.component";
import { IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dialogo-formulario-inscripcion',
  templateUrl: './dialogo-formulario-inscripcion.component.html',
  styleUrls: ['./dialogo-formulario-inscripcion.component.css']
})
export class DialogoFormularioInscripcionComponent implements OnInit {


  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  inscripcion:String="Alumno";

  dropdownList = [
    { item_id: 1, item_text: 'Laura' },
    { item_id: 2, item_text: 'Carmen' },
    { item_id: 3, item_text: 'Carlos' },
    { item_id: 4, item_text: 'Álvaro' },
    { item_id: 5, item_text: 'Marta' },
    { item_id: 6, item_text: 'Mateo' },
    { item_id: 7, item_text: 'Carla' },
    { item_id: 8, item_text: 'Mario' },
    { item_id: 9, item_text: 'Vicente' },
    { item_id: 10, item_text: 'Rosario' }

  ];
  dropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    allowSearchFilter: true
  };
  constructor(private formBuilder:FormBuilder,private http:HttpService) {
    this.crearFormulario();

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

    // let bodyMomento = {
    //   nombre: grupo.value.nombre,
    //   fechaInicio_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaInicio_Inscripcion),
    //   fechaFin_Inscripcion:this.cambiarFechaBbdd(grupo.value.fechaFin_Inscripcion)
    // };
    //
    // this.http.post(environment.serverURL + "index.php/C_GestionActividades/addMomento", bodyMomento).subscribe({
    //   error: error => {
    //     console.error("Se produjo un error: ", error);
    //     //Cerrar modal
    //     document.getElementById("cerrar")!.click();
    //
    //     mensajeToast.generarToast("ERROR en la Base de Datos al crear el momento", "cancel", "red");
    //
    //   },
    //   complete: () => {
    //     //Cerrar modal
    //     document.getElementById("cerrar")!.click();
    //
    //     mensajeToast.generarToast("Alta de momento guardada correctamente", "check_circle", "green");
    //   }
    // });

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
