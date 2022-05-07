import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Especie } from '../../models/especie.model';

import { Usuario } from 'src/models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  public especie: Especie;
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



  cargarEspecies() {
    const url = `${ base_url }/especies`;
    return this.http.get( url, this.headers )
                .pipe(
                  map( (resp: {ok: boolean, especies: Especie[]}) => resp.especies)
                );

  }

  crearEspecie( nombre: string, descripcion: string ) {

    const url = `${ base_url }/especies`;
    return this.http.post( url, { nombre, descripcion }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  actualizarEspecie( _id: string, nombre: string, descripcion: string  ) {

    const url = `${ base_url }/especies/${ _id }`;
    return this.http.put( url, { nombre, descripcion }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  borrarEspecie( _id: string ) {

    const url = `${ base_url }/especies/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
