import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Especie } from 'src/models/especie.model';
import Swal from 'sweetalert2';
import { EspecieService } from '../../../services/especie.service';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styles: [],
})
export class EspeciesComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;

  public especies: Especie[] = [];

  constructor(
    private especieService: EspecieService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarEspecies();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarEspecies();
    }

    this.busquedasService
      .buscar('especies', termino)
      .subscribe((resp: Especie[]) => {
        this.especies = resp;
      });
  }

  cargarEspecies() {
    this.cargando = true;

    this.especieService.cargarEspecies().subscribe((especies) => {
      this.cargando = false;
      this.especies = especies;
    });
  }

  guardarCambios(especie: Especie) {
    this.especieService
      .actualizarEspecie(especie._id, especie.nombre, especie.descripcion)
      .subscribe((resp) => {
        Swal.fire('Actualizado', especie.nombre, 'success');
      });
  }

  eliminarEspecie(especie: Especie) {
    this.especieService.borrarEspecie(especie._id).subscribe((resp) => {
      this.cargarEspecies();
      Swal.fire('Eliminado', especie.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    //create a form with 2 inputs nombre and descripcion using sweetalert2
    const { value: formValues } = await Swal.fire({
      title: 'Nueva especie',
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

    console.log(formValues);

    if (formValues) {
      this.especieService
        .crearEspecie(formValues[0], formValues[1])
        .subscribe((resp) => {
          this.cargarEspecies();
          Swal.fire('Creado', formValues[0], 'success');
        });
    }
  }
}
