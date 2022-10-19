import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CommonService<Usuario> {

  constructor(http: HttpClient) { 
    super(http, `${BASE_ENDPOINT}/usuarios`);
  }

  public listarPaginas(page: string, size: string) : Observable<any> {
    const desde = +page * +size;
    const params = new HttpParams()
        .set('desde', desde)
        .set('limite', size);//HttpParams es inmutable, por eso se hace en una sóla sentencia
    return this.http.get<any>(this.baseEnpoint, {params: params});
  }

}
