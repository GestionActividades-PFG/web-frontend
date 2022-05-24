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

  loading=true;
  momentos:any = [];

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

  constructor(private http:HttpService, private router:Router) {

    /**
     * Llamada para listar los momentos
     */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
      this.loading = false;
      this.momentos = res;
    });
  }

  ngOnInit(): void {

  }

}
