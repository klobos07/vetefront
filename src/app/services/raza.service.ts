import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Raza } from '../../models/raza.models';

import { Usuario } from '../../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class RazaService {

  public raza: Raza;
  public usuario: Usuario;

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }



  cargarRazas() {
    const url = `${ base_url }/razas`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, razas: Raza[]}) => resp.razas)
                );

  }

  crearRaza( nombre: string, descripcion: string ) {

    const url = `${ base_url }/razas`;
    return this.http.post( url, { nombre, descripcion }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  actualizarRaza( _id: string, nombre: string, descripcion: string  ) {

    const url = `${ base_url }/razas/${ _id }`;
    return this.http.put( url, { nombre, descripcion }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  borrarRaza( _id: string ) {

    const url = `${ base_url }/razas/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
