import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Medico } from '../../models/medico.model';

import { Usuario } from './../../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  public medico: Medico;
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

  cargarMedicos() {
    const url = `${ base_url }/medicos`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
                );

  }

  crearMedico( nombre: string, telefono: string ) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, { nombre, telefono }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  actualizarMedico( _id: string, nombre: string, telefono: string  ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.put( url, { nombre, telefono }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  borrarEspecie( _id: string ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
