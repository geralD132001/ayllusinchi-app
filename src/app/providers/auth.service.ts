import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario: any;
  private _token: string | null;
  constructor(protected httpClient: HttpClient) {}

  public get usuario(): any {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(<string>sessionStorage.getItem('usuario'));
      return this._usuario;
    }
    return [];
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return <string>this._token;
    }
    return '';
  }

  login(usuario: any): Observable<any> {
    const urlEndpoint = 'http://20.226.57.87:9100/oauth/token';

    const credenciales = btoa('ayllusinchiapp' + ':' + 'code13');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.httpClient.post<any>(urlEndpoint, params.toString(), {
      headers: httpHeaders,
    });
  }

  guardarUsuario(accessToken: string): void {
    let datos = this.obtenerDatosToken(accessToken);
    console.log(datos);
    this._usuario = {
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      username: datos.user_name,
      roles: datos.authorities, // roles
    };
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null && accessToken != '') {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let datos = this.obtenerDatosToken(this.token);
    return datos != null && datos.user_name && datos.user_name.length > 0;
  }
  hasRole(role: string): boolean {
    console.log(this.usuario);
    if (this.usuario == '') {
      return false;
    }
    if (this.usuario.roles.includes(role)) {
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
