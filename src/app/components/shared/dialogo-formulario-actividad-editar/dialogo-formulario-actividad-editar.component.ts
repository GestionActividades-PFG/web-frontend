import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialogo-formulario-actividad-editar',
  templateUrl: './dialogo-formulario-actividad-editar.component.html',
  styleUrls: ['./dialogo-formulario-actividad-editar.component.css']
})
export class DialogoFormularioActividadEditarComponent implements OnInit {

  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder) {

    this.crearFormulario();

  }

  ngOnInit(): void {
  }
  validar(campo:any){
    campo=this.forma.get(campo);
    return !(campo.invalid && campo.touched)
  }
  crearFormulario(){

    this.forma = this.formBuilder.group
    ({
      nombre:['',[Validators.required, Validators.minLength(5)] ],
      sexo:['',[Validators.required]],
    })
  }
  guardar(grupo:FormGroup) {

    console.log(grupo)

    if (grupo.invalid) {
      Object.values(grupo.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control)
        control.markAsTouched();
      })

      alert("no ha sido posible guardarlo")
      return;
    } else {

      console.log(grupo.value)
      this.forma.reset();
      alert("guardado")
    }

  }
}
