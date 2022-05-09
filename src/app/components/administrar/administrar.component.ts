import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  apartado:string | null = this._route.snapshot.paramMap.get('apartado');;
  momentos:boolean=true;
  mostrar:boolean=false;

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

  constructor(private http:HttpService,private _route:ActivatedRoute) {
    this.obtenerApartado();

    if(this.apartado != 'Momentos') {
      this.momentos = false;
      return;
    }

    this.momentos = true;

  }

  ngOnInit(): void {}

  /**
   * Obtener que apartado está gestionando
   */
  obtenerApartado(){
    /*
    LLamada a api para obtener datos del apartado seleccionado (momentos o actividades) depende de apartado
     */
    let nombres = [];

    //Editamos un momento
    if(this.apartado == "Momentos"){
      this.http.get(environment.serverURL + "index.php/C_GestionActividades/getMomentos").subscribe(res => {
        this.datosapartado = res;
        console.log("Administrar momentos: ", res);
      });
      return;
    }
      
    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades?idMomento=" + this.apartado).subscribe(res => {
        this.datosapartado = res.actividades;
        
        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

        console.log("Apartados: " , res);
    });
    
  }

}
