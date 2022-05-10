import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() contenido:any;

  constructor() { }

  ngOnInit(): void {}


  /**
   * Generar y definir toast
   * @param tipotoast tipo de toast a mostrar
   */
  generarToast(mensaje:string, icono:string, color:string){

    //Visualizamos toast
    let toast:any = document.getElementById("toast");
    toast.style.display = "block";
    let conticono:any = document.getElementById("icono");
    let contspan:any = document.getElementById("mensaje");

    //Caracteristicas de toast
    conticono.innerHTML = icono;
    contspan.innerHTML = mensaje;
    toast.style.backgroundColor = color;

    //Ocultamos toast al pasar 5 segundos
    setTimeout(() => {
      toast.style.display = "none";
    }, 4000,toast);

  }


  cerrarToast(){
    let toast:any=document.getElementById("toast");
    toast.style.display = "none";
  }
  

}
