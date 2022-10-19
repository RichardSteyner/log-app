import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { BASE_ENDPOINT } from '../config/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private ROLE_USER: string = 'USER_ROLE';

  private _usuario: Usuario | null;
  private _token: string | null;

  constructor(private http: HttpClient) {
    this._usuario = null;
    this._token = null;
  }

  public get usuario(): Usuario | null {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
    return null;
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = `${BASE_ENDPOINT}/auth/login`;

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'/*
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales*/
    });

    /*let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());*/
    return this.http.post<any>(urlEndpoint, 
                              {correo: usuario.correo || 'steyner.urupeque.s@gmail.com', password: usuario.password || '123456'}, 
                              { headers: httpHeaders });
  }

  registrarse(usuario: Usuario): Observable<any> {
    const urlEndpoint = `${BASE_ENDPOINT}/usuarios`;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(urlEndpoint, 
                              {nombre: usuario.nombre, correo: usuario.correo, password: usuario.password, rol: this.ROLE_USER}, 
                              { headers: httpHeaders });
  }

  guardarUsuario(userPayload: any): void {
    //let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.uid = userPayload.uid;
    this._usuario.roles.push(userPayload.rol);
    this._usuario.nombre = userPayload.nombre;
    console.log('*****'+userPayload);
    /*this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;*/
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string | null): any {
    if (accessToken != null) {
      const parseToken = atob(accessToken.split(".")[1]);
      console.log(parseToken); 
      return JSON.parse(parseToken);
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.uid && payload.uid.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario?.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
