import { AfterViewInit, Component, Host, OnInit, Pipe, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {Router} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../shared/auth.guard';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren(AuthGuard) authGuard?:AuthGuard;
  @ViewChildren(AuthService) service!: AuthService;
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

  constructor(private http:HttpService, private authService:AuthService) {}

  ngOnInit(): void {}
  
  /**
   * Esta función se llama una vez que la vista del componente y sus hijos han sido iniciadas...
   */
  ngAfterViewInit(): void {
    /**
     * Llamada para listar los momentos
    */
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
      this.loading = false;
      this.momentos = res;
      
        
      console.error("Tu rol es: ", this.authService.getDecodedToken().role);
        

    });

  }

}