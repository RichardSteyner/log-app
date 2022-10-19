import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic'

export abstract class CommonService<E extends Generic> {

  protected http: HttpClient
  protected baseEnpoint : string

  protected cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(http: HttpClient, baseEndpoint: string) {
    this.http = http;
    this.baseEnpoint = baseEndpoint;
  }
  
  public listar() : Observable<E[]> {
    return this.http.get<E[]>(this.baseEnpoint);
  }

  /*public listarPaginas(page: string, size: string) : Observable<any> {
    //si se quiere utilizar variables, se utiliza let
    const params = new HttpParams()
        .set('page', page)
        .set('size', size);//HttpParams es inmutable, por eso se hace en una sóla sentencia
    return this.http.get<any>(this.baseEnpoint + '/pagina', {params: params});
  }*/

  public ver(id: string) : Observable<E>{
        return this.http.get<E>(this.baseEnpoint + '/' + id);
  }

  public crear(e : E): Observable<E>{
    return this.http.post<E>(this.baseEnpoint, e, 
                                {headers: this.cabeceras})
  }

  public editar(e : E): Observable<E>{
    return this.http.put<E>(`${this.baseEnpoint}/${e._id}`, e, 
                                {headers: this.cabeceras})
  }

  public eliminar(id? : string): Observable<void>{
    return this.http.delete<void>(`${this.baseEnpoint}/${id}`)
  }
}
