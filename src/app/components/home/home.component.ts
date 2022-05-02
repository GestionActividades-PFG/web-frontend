import { Component, OnInit } from '@angular/core';
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
  ]


  constructor(private http:HttpService, private router:Router) { }

  ngOnInit(): void {

  }
}
