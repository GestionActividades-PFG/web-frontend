import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  momentoid:any;
  actividades = {
      id:1,
      nombre:"Navidad",
      actividades:[
        {
          id: 1,
          nombre: "Futbol"
        },
        {
          id: 2,
          nombre: "Baloncesto"
        },
        {
          id: 3,
          nombre: "Tenis"
        }
      ]
    }


  constructor(private _route:ActivatedRoute) {
    this.momentoid=this._route.snapshot.paramMap.get('id')
    this.obtenerActividades()
  }

  ngOnInit(): void {
  }

  /**
   * Obtener las actividades del momoento seleccionado mediante momentoid
   */
  obtenerActividades(){
    /*
    LLamada a api para obtener nombre de momento,y sus activiades relacionadas con momentoid
     */
  }
}
