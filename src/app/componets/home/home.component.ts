import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  momentos=['Navidad','Semana Ignaciana','Fiestas Escolares','Prueba1','Prueba2','Prueba3','Prueba4','Prueba5','Prueba6','Prueba7','Prueba8','Prueba9']

  constructor() { }

  ngOnInit(): void {
  }

}
