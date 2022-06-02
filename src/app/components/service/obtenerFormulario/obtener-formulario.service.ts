import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFormularioService {
  @Output() disparadorFormulario:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
