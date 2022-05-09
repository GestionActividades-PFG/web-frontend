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

  actividades:any = ["a"];

  //Buscador
  searchText: any;

  /**
   * Crea un filtro de momentos
   * @returns Nombre del momento o momentos
   */
  public filtro() {

    return this.actividades.actividades.filter( (momento: any) => {

      if(this.searchText == null) return this.actividades;
      return momento.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  constructor(private http:HttpService, private _route:ActivatedRoute, private _router:Router) {
    this.momentoId=this._route.snapshot.paramMap.get('id');

    this.http.get(environment.serverURL + `index.php/C_GestionActividades/getActividades?idMomento=${this.momentoId}`).subscribe(res => {
      console.log(res);
      this.actividades = res;
      console.log("hol",this.actividades, this.momentoId);
    });
    
  }

  ngOnInit(): void {

  }
}
