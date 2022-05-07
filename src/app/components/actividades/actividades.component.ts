import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  momentoId:any;

  actividad = {
      idActividad: 1,
      nombre:"Navidad",
      actividades: [
        {
          idActividad: 1,
          nombre: "Futbol"
        },
        {
          idActividad: 2,
          nombre: "Baloncesto"
        },
        {
          idActividad: 3,
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

  constructor(private http:HttpService, private _route:ActivatedRoute, private _router:Router) {
    this.momentoId=this._route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    
    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividades?idMomento=${this.momentoId}`).subscribe(res => {
      console.log(res);
      this.actividad = res;
    });
  }
}
