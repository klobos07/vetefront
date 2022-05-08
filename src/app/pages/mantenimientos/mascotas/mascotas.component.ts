import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { MascotasService } from '../../../services/mascotas.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

//import model Mascota
import { Mascota } from 'src/models/mascotas.model';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styles: [],
})
export class MascotasComponent implements OnInit {
  public cargando: boolean = true;
  public mascotas: any[] = [];
  public razas: any[] = [];
  public especies: any[] = [];

  constructor(private MascotasService: MascotasService,
    private busquedasService: BusquedasService,
    ) {}

  ngOnInit(): void {
    this.cargarMascotas();
    this.getRazas();
    this.getEspecies();
  }

  getRazas() {
    this.MascotasService.getRazas().subscribe((razas) => {
      this.razas = razas;
      console.log(this.razas);
    });
  }

  getEspecies() {
    this.MascotasService.getEspecies().subscribe((especies) => {
      this.especies = especies;
      console.log(this.especies);
    });
  }

  cargarMascotas() {
    this.cargando = true;
    this.MascotasService.cargarMascotas().subscribe((mascotas) => {
      this.cargando = false;
      this.mascotas = mascotas;
      console.log(this.mascotas);
    });
  }

  guardarCambios(mascota: any) {}

  buscarMascota(termino: string) {
    if (termino.length <= 0) {
      this.cargarMascotas();
    } else {
      this.cargando = true;
      this.busquedasService.buscar('mascotas', termino).subscribe((resp: Mascota[]) => {
        this.mascotas = resp;
        this.cargando = false;
      });
    }
  }

  async abrirSweetAlert() {
    //create a form with inputs nombreowner, telefono, nombre,edad, peso, fechanac, observaciones, sexo, raza, especie using sweetalert2

    const { value: formValues } = await Swal.fire({
      title: 'Nueva Mascota',
      html: `
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="Nombre">
          </div>
          <div class="form-group">
            <label for="nombre">Nombre del dueño</label>
            <input type="text" class="form-control" id="nombreowner" placeholder="Nombre del dueño">
          </div>
          <div class="form-group">

            <label for="telefono">Telefono</label>
            <input type="text" class="form-control" id="telefono" placeholder="Telefono">
          </div>
          <div class="form-group">
            <label for="edad">Edad</label>
            <input type="text" class="form-control" id="edad" placeholder="Edad">
          </div>
          <div class="form-group">
            <label for="peso">Peso</label>
            <input type="text" class="form-control" id="peso" placeholder="Peso">
          </div>
          <div class="form-group">
            <label for="fechanac">Fecha de nacimiento</label>
            <input type="date" class="form-control" id="fechanac" placeholder="Fecha de nacimiento">
          </div>
          <div class="form-group">
            <label for="observaciones">Observaciones</label>
            <input type="text" class="form-control" id="observaciones" placeholder="Observaciones">
          </div>
          <div class="form-group">
            <label for="sexo">Sexo</label>
            <select class="form-control" id="sexo">
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div class="form-group">
            <label for="raza">Raza</label>
            <select class="form-control" id="raza">
              <option value="">Seleccione una raza</option>
              ${this.razas.map(
                (raza) => `<option value="${raza._id}">${raza.nombre}</option>`
              )}
            </select>
          </div>
          <div class="form-group">
            <label for="especie">Especie</label>
            <select class="form-control" id="especie">
              <option value="">Seleccione una especie</option>
              ${this.especies.map(
                (especie) =>
                  `<option value="${especie._id}">${especie.nombre}</option>`
              )}
            </select>
          </div>
          `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('nombreowner')).value,
          (<HTMLInputElement>document.getElementById('telefono')).value,
          (<HTMLInputElement>document.getElementById('edad')).value,
          (<HTMLInputElement>document.getElementById('peso')).value,
          (<HTMLInputElement>document.getElementById('fechanac')).value,
          (<HTMLInputElement>document.getElementById('observaciones')).value,
          (<HTMLInputElement>document.getElementById('sexo')).value,
          (<HTMLInputElement>document.getElementById('raza')).value,
          (<HTMLInputElement>document.getElementById('especie')).value,
        ];
      },
    });

    if (formValues) {
      let data = {
        nombre: formValues[0],
        nombreowner: formValues[1],
        telefono: formValues[2],
        edad: formValues[3],
        peso: formValues[4],
        fechanac: formValues[5],
        observaciones: formValues[6],
        sexo: formValues[7],
        raza: formValues[8],
        especie: formValues[9],
      };

      this.MascotasService.crearMascota(data).subscribe((mascota) => {
        Swal.fire('Creada', 'Mascota creada correctamente', 'success');

        this.cargarMascotas();
      });
    }
  }
}
