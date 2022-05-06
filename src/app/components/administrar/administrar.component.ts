import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  apartado:string | null;
  momentos:boolean=true;
  ideditar:any;
  datosapartado = [
    {
      id: 1,
      nombre: "Navidad"
    },
    {
      id: 2,
      nombre: "Semana Ignaciana"
    },
    {
      id: 3,
      nombre: "Fiestas Escolares"
    },
    {
      id: 4,
      nombre: "Prueba1"
    },
    {
      id: 5,
      nombre: "Prueba2"
    },
    {
      id: 6,
      nombre: "Prueba3"
    },
    {
      id: 7,
      nombre: "Prueba4"
    },
    {
      id: 8,
      nombre: "Prueba5"
    },
    {
      id: 9,
      nombre: "Prueba6"
    },
    {
      id: 10,
      nombre: "Prueba7"
    },
    {
      id: 11,
      nombre: "Prueba8"
    },
    {
      id: 12,
      nombre: "Prueba9"
    },
    {
      id: 13,
      nombre: "Prueba10"
    },
    {
      id: 14,
      nombre: "Prueba11"
    },
    {
      id: 15,
      nombre: "Prueba12"
    },
  ]

  constructor(private _route:ActivatedRoute) {
    this.apartado=this._route.snapshot.paramMap.get('apartado')
    this.obtenerApartado()
    if(this.apartado != 'Momentos'){
      this.momentos=false;
    }

  }

  ngOnInit(): void {

  }

  /**
   * Obtener que apartado está gestionando
   */
  obtenerApartado(){
    /*
    LLamada a api para obtener datos del apartado seleccionado (momentos o actividades) depende de apartado
     */

    if(this.apartado == "Momentos"){

    }else{

    }

  }

}
