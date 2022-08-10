import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
/**
 * @file : loading.componet.ts
 * Loading de carga de datos.
 * Proyecto FCT Gestión de Actividades.
 * @autor : Esperanza Rogríguez Martínez y Sergio Matamoros Delgado.
 * @license : CC BY-NC-SA 4.0.
 * Año 2022
 **/
export class LoadingComponent implements OnInit {

  @Input("mensaje") mensaje:string = "";


  ngOnInit(): void {
  }

}
