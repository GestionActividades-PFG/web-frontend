import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit {

  panelOpenState = false;
  pestana:boolean=true;
  actividadid:any;
  id:number | undefined;
  apartado:number | undefined;

  actividad = {
    id:1,
    nombre:"Futbol",
    tipo_participacion:"General",
    n_max_participantes:5,
    material:"",
    sexo:"MX",
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
  // inscripcionesactividad = [
  //   {
  //     id: 1,
  //     nombre: "1ºSMR"
  //   },
  //   {
  //     id: 2,
  //     nombre: "2ºSMR"
  //   },
  //   {
  //     id: 3,
  //     nombre: "1ºDAW"
  //   },
  //   {
  //     id: 4,
  //     nombre: "2ºDAW"
  //   },
  //   {
  //     id: 5,
  //     nombre: "1ºESO A"
  //   },
  //   {
  //     id: 6,
  //     nombre: "1ºESO B"
  //   },
  //   {
  //     id: 7,
  //     nombre: "1ºESO C"
  //   },
  //   {
  //     id: 8,
  //     nombre: "2ºESO A"
  //   },
  //   {
  //     id: 9,
  //     nombre: "2ºESO B"
  //   },
  //   {
  //     id: 10,
  //     nombre: "2ºESO C"
  //   },
  //   {
  //     id: 11,
  //     nombre: "3ºESO A"
  //   },
  //   {
  //     id: 12,
  //     nombre: "3ºESO B"
  //   },
  //   {
  //     id: 13,
  //     nombre: "3ºESO C"
  //   },
  //   {
  //     id: 14,
  //     nombre: "4ºESO A"
  //   },
  //   {
  //     id: 15,
  //     nombre: "4ºESO B"
  //   },
  // ]
  inscripcionesactividad = [
    {
      id: 1,
      nombre: "Alfonso Ramirez Fernandez",
      clase:"1ºSMR"
    },
    {
      id: 2,
      nombre: "Manuel Suarez Solís",
      clase:"2ºSMR"
    },
    {
      id: 3,
      nombre: "Esperanza Rodríguez Martínez",
      clase:"2ºDAW"
    },
    {
      id: 4,
      nombre: "Juan Antonio Martín Cuello",
      clase:"1ºSMR"
    },
    {
      id: 5,
      nombre: "Miguel Ángel García Ferrea",
      clase:"1ºESO A"
    },
    {
      id: 6,
      nombre: "Mateo Espinosa Cutilla",
      clase:"1ºESO B"
    },
    {
      id: 7,
      nombre: "Carla Matamoros García",
      clase:"2ºSMR"
    },
    {
      id: 8,
      nombre: "Lola Villoslada Carapeto",
      clase:"2ºESO C"
    },
    {
      id: 9,
      nombre: "Marta Gonzalez Rueda",
      clase:"1ºDAW"
    },
    {
      id: 10,
      nombre: "Blanca Martínez Martínez",
      clase:"3ºESO A"
    },
    {
      id: 11,
      nombre: "Álvaro Rodríguez Correa",
      clase:"3ºESO A"
    },
    {
      id: 12,
      nombre: "Carmen Gonzalez Ramírez",
      clase:"4ºESO A"
    },
    {
      id: 13,
      nombre: "Susana Pérez Díaz",
      clase:"4ºESO B"
    },
    {
      id: 14,
      nombre: "Mario Carretero Silva",
      clase:"4ºESO A"
    },
    {
      id: 15,
      nombre: "Joaquín Martínez Gutierrez",
      clase:"3ºESO C"
    },
  ]

  constructor(private _route:ActivatedRoute) {
    this.actividadid=this._route.snapshot.paramMap.get('id')

    this.obtenerActividad()


  }

  ngOnInit(): void {
  }

  /**
   * Método para obtener información de la actividad seleccionada
   */
  obtenerActividad(){
    /*
    LLamada a api para obtener información de actividad seleccionada con actividadid
     */
    /*Ponemos como this.apartado= id de actividad*/
  }

  /**
   * Método para cambiar de pestaña
   */
  cambiarPestana(pestana:string){
    if(pestana=="inscritos"){
      document.getElementById('inscribirse')!.classList.remove('active');
      document.getElementById("inscritos")!.classList.add('active');
      this.pestana=true;
    }else{
      document.getElementById('inscritos')!.classList.remove('active');
      document.getElementById("inscribirse")!.classList.add('active');
      this.pestana=false;
    }
  }
  borrar(id:number){
    this.id=id;
  }

}
