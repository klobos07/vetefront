import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Cita } from '../../models/cita.model';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  public citas: Cita;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarCitas() {
    const url = `${environment.base_url}/citas`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; citas: Cita[] }) => resp.citas),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  actualizarCita(cita: Cita) {
    let { observaciones, peso, tratamiento } = cita;
    const url = `${environment.base_url}/citas/${cita._id}`;
    return this.http.put(
      url,
      { observaciones, peso, tratamiento },
      this.headers
    );
  }

}
