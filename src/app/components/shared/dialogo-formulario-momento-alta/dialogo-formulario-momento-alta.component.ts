import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialogo-formulario-momento-alta',
  templateUrl: './dialogo-formulario-momento-alta.component.html',
  styleUrls: ['./dialogo-formulario-momento-alta.component.css']
})
export class DialogoFormularioMomentoAltaComponent implements OnInit {

  fecha = new Date();
  fechaMinima = this.fecha.getFullYear() ;
  fechaMaxima = this.fecha.getFullYear() + "-12-31";
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
      fechaInicio_Inscripcion:['',[Validators.required]],
      fechaFin_Inscripcion:['',[Validators.required]],

    })
  }
  guardar(grupo:FormGroup) {

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
  resetForm(forma: FormGroup) {
    forma.reset();
  }
}
