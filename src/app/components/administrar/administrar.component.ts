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

  apartado=this._route.snapshot.paramMap.get('apartado');
  momentos:boolean=true;
  mostrar:boolean=false;

  id:number | undefined;

  datosapartado:any;

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
        return;
      });
    }

    this.http.get(environment.serverURL + "index.php/C_GestionActividades/getActividades?idMomento=" + this.apartado).subscribe(res => {
        this.datosapartado = res.actividades;

        //Le asignamos un nombre al "título"
        this.apartado=res.nombre;

        console.log("Apartados: " , res);
    });

  }
  borrar(id:number){
    console.log("hola"+id)
    this.id=id
    let toast:any=document.getElementById("toast");
  }
}
