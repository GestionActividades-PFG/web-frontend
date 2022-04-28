import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-movil',
  templateUrl: './navbar-movil.component.html',
  styleUrls: ['./navbar-movil.component.css']
})
export class NavbarMovilComponent implements OnInit {

  /*Por defecto false, si el coordinador ha iniciado sesión, poner a true*/
  coordinador=true;
  apartado:string |undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
