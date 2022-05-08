import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Raza } from 'src/models/raza.models';
import Swal from 'sweetalert2';
import { RazaService } from '../../../services/raza.service';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styles: [],
})
export class RazasComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;

  public razas: Raza[] = [];

  constructor(
    private razaService: RazaService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarRazas();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarRazas();
    }

    this.busquedasService.buscar('razas', termino).subscribe((resp: Raza[]) => {
      this.razas = resp;
    });
  }
  cargarRazas() {
    this.cargando = true;

    this.razaService.cargarRazas().subscribe((razas) => {
      this.cargando = false;
      this.razas = razas;
    });
  }

  guardarCambios(raza: Raza): void {
    this.razaService
      .actualizarRaza(raza._id, raza.nombre, raza.descripcion)
      .subscribe((resp) => {
        Swal.fire('Actualizado', raza.nombre, 'success');
      });
  }

  eliminarRaza(raza: Raza) {
    this.razaService.borrarRaza(raza._id).subscribe((resp) => {
      this.cargarRazas();
      Swal.fire('Eliminado', raza.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    //create a form with 2 inputs nombre and descripcion using sweetalert2
    const { value: nombre } = await Swal.fire({
      title: 'Nueva raza',
      html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="descripcion" class="swal2-input" placeholder="Descripción">
            `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('descripcion')).value,
        ];
      },
    });
    if (nombre) {
      this.razaService.crearRaza(nombre[0], nombre[1]).subscribe((resp) => {
        this.cargarRazas();
        Swal.fire('Creado', nombre[0], 'success');
      });
    }
  }
}
