import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FormGroup} from "@angular/forms";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  post(url: string, bodyActividad: { descripcion: any; idMomento: any; material: any; esIndividual: any; tipo_Participacion: any; fechaFin_Actividad: string; idResponsable: any; sexo: any; nombre: any; numMaxParticipantes: any; fechaInicio_Actividad: string }):Observable<any> {
    return this.http.post(url, bodyActividad, httpOptions);
  }

  public get(url:string):Observable<any> {
    return this.http.get(url, httpOptions);
  }

  public async asyncGet(url:string):Promise<Observable<any>> {
    return await this.http.get(url, httpOptions);
  }

  public put(url:string, body:string):Observable<any> {
    return this.http.put(url, body, httpOptions);
  }

  public delete(url:string):Observable<any> {
    return this.http.delete(url, httpOptions);
  }

}
