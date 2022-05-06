import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  momentoid:any;

  actividad = {
      id: 1,
      nombre:"Navidad",
      actividades: [
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
  };

  //Buscador
  searchText: any;

  /**
   * Crea un filtro de momentos
   * @returns Nombre del momento o momentos
   */
  public filtro() {

    return this.actividad.actividades.filter( (momento: any) => {
      
      if(this.searchText == null) return this.actividad;
      return momento.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });

  }

  constructor(private http:HttpService, private _route:ActivatedRoute) {
    this.momentoid=this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades").subscribe(res => {
      this.actividad = res;
      console.log(res);
    });

  }

}
