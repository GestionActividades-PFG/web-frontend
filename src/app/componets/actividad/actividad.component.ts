import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit {

  actividadid:any;

  actividad = {
    id:1,
    nombre:"Futbol",
    tipo_participacion:"General",
    n_max_participantes:5,
    material:"",
    sexo:"No procede",
    description: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto." +
      " Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500," +
      " cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló" +
      " de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto" +
      " de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación" +
      " de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición," +
      " como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
    fecha_inicio_actividad:"20/11/2021",
    fecha_fin_actividad:"27/11/2021"
  }

  constructor(private _route:ActivatedRoute) {
    this.actividadid=this._route.snapshot.paramMap.get('id')
    this.obtenerActividad()
  }

  ngOnInit(): void {
  }
  obtenerActividad(){
    /*
    LLamada a api para obtener información de actividad seleccionada con actividadid
     */
  }
}
