import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Log } from '../models/log';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService extends CommonService<Log> {

  constructor(http: HttpClient) {
    super(http, `${BASE_ENDPOINT}/logs`);
  }
  
  public filtrar(filtro : string) : Observable<Log[]> {
    return this.http.get<Log[]>(`${BASE_ENDPOINT}/buscar/logs/${filtro}`)
  }

}
