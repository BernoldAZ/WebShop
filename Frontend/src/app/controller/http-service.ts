import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpService {

  constructor(private http: HttpClient) { }

  makeHttpRequest(): Observable<any> {
    const url = 'http://localhost:8080/';
    return this.http.get(url);
  }
}