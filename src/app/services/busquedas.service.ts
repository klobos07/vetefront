import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Especie } from 'src/models/especie.model';
import { Usuario } from '../../models/usuario.model';
import { Raza } from 'src/models/raza.models';
import { Medico } from 'src/models/medico.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  private transformarEspecies( resultados: any[] ): Especie[] {
    return resultados.map(
      especie => new Especie(especie.nombre, especie.descripcion, especie.uid, especie._id)
    );
  }

  private transformarRazas( resultados: any[] ): Raza[] {
    return resultados.map(
    raza => new Raza(raza.nombre, raza.descripcion, raza.uid, raza._id)
    );
  }

  private transformarMedicos( resultados: any[] ): Medico[] {
    return resultados.map(
    medico => new Medico(medico.nombre, medico.telefono , medico.uid, medico._id)
    );
  }

  buscar(
      tipo: 'usuarios'|'medicos'|'mascotas'|'citas'|'razas'|'especies',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => {

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados );

                  case 'especies':
                    return this.transformarEspecies(resp.resultados);

                  case 'razas':
                    return this.transformarRazas(resp.resultados);

                  case 'medicos':
                    return this.transformarMedicos(resp.resultados);

                  default:
                    return [];
                }

              })
            );

  }


}
