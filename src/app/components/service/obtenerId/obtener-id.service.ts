import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerIdService {
  @Output() disparadorId:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
