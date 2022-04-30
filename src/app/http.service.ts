import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public post(url:string, body:string):Observable<any> {
    return this.http.post(url, body, httpOptions);
  }

  public get(url:string):Observable<any> {
    return this.http.get(url, httpOptions);
  }

  public put(url:string, body:string):Observable<any> {
    return this.http.put(url, body, httpOptions);
  }

  public delete(url:string):Observable<any> {
    return this.http.delete(url, httpOptions);
  }

}
