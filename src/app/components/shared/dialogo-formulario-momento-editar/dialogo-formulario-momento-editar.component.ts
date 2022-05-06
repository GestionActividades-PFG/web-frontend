import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-dialogo-formulario-momento-editar',
  templateUrl: './dialogo-formulario-momento-editar.component.html',
  styleUrls: ['./dialogo-formulario-momento-editar.component.css']
})
export class DialogoFormularioMomentoEditarComponent implements OnInit {


  fecha = new Date();
  fechaMaxima = this.fecha.getFullYear()+1 + "-12-31";
  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.crearFormulario();
    console.log(this.fecha.toLocaleDateString())

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
      nombre:['',[Validators.required, Validators.minLength(5),Validators.maxLength(60)] ],
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
