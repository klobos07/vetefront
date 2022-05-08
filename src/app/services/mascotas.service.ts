import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Mascota } from '../../models/mascotas.model';

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  public mascotas: Mascota[] = [];

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

  cargarMascotas() {
    const url = `${environment.base_url}/mascotas`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; mascotas: Mascota[] }) => resp.mascotas),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  crearMascota(mascota: any) {
    const url = `${environment.base_url}/mascotas`;
    return this.http.post(url, mascota, this.headers).pipe(
      map((resp: { ok: boolean; mascota: Mascota }) => resp.mascota),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  }

  actualizarMascota(mascota: Mascota) {
    const url = `${environment.base_url}/mascotas/${mascota._id}`;
    return this.http.put(url, mascota, this.headers).pipe(
      map((resp: { ok: boolean; mascota: Mascota }) => resp.mascota),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  }

  getRazas() {
    const url = `${environment.base_url}/razas`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; razas: any[] }) => resp.razas),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  getEspecies() {
    const url = `${environment.base_url}/especies`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean; especies: any[] }) => resp.especies),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }
}
