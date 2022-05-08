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
  public user = {
    role: '',
    uid: '',
  };

  constructor(private http: HttpClient) {
    this.getProfileInfo();
  }

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

  getProfileInfo() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user, 'user');
  }

  cargarCitas() {
    let url = `${environment.base_url}/citas`;
    if (this.user.role === 'ADMIN_ROLE') {
      url = `${environment.base_url}/citas/${this.user.uid}`;
    } else {
      url = `${environment.base_url}/citas/usuario/${this.user.uid}`;
    }

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

  crearCita(cita: Cita) {
    const url = `${environment.base_url}/citas`;
    return this.http.post(url, cita, this.headers);
  }

  buscar(termino: string) {}
}
