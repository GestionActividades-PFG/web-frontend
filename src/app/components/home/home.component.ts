import { Component, OnInit, Pipe } from '@angular/core';
import {Router} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  momentos:any = [
    {
      idMomento: 1,
      nombre: "NavidMomentoad"
    },
    {
      idMomento: 2,
      nombre: "Semana Ignaciana"
    },
    {
      idMomento: 3,
      nombre: "Fiestas Escolares"
    },
    {
      idMomento: 4,
      nombre: "Prueba1"
    },
    {
      idMomento: 5,
      nombre: "Prueba2"
    },
    {
      idMomento: 6,
      nombre: "Prueba3"
    },
    {
      idMomento: 7,
      nombre: "Prueba4"
    },
    {
      idMomento: 8,
      nombre: "Prueba5"
    },
    {
      idMomento: 9,
      nombre: "Prueba6"
    },
    {
      idMomento: 10,
      nombre: "Prueba7"
    },
    {
      idMomento: 11,
      nombre: "Prueba8"
    },
    {
      idMomento: 12,
      nombre: "Prueba9"
    },
  ]

  //Buscador
  searchText: any;

  /**
   * Crea un filtro de momentos
   * @returns Nombre del momento o momentos
   */
  public filtro() {

    return this.momentos.filter( (momento: any) => {

      if(this.searchText == null) return this.momentos;
      return momento.nombre.toLowerCase().includes(this.searchText.toLowerCase());
    });

  }

  constructor(private http:HttpService, private router:Router) { }

  ngOnInit(): void {

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
      this.momentos = res;
      console.log(res);
    });
  }
}
