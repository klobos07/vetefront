import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//import model cita
import { Cita } from 'src/models/cita.model';

//import citasService
import { CitasService } from '../../../services/citas.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { MascotasService } from '../../../services/mascotas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [],
})
export class CitasComponent implements OnInit {
  public cargando: boolean = true;
  public citas: Cita[] = [];
  public mascotas: any[] = [];
  public medico: any[] = [];

  constructor(
    private citasService: CitasService,
    private busquedasService: BusquedasService,
    private medicoService: MedicoService,
    private MascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
    this.getMascotas();
    this.getMedicos();
  }

  getMascotas() {
    this.cargando = true;
    this.MascotasService.cargarMascotas().subscribe((mascotas) => {
      this.cargando = false;
      this.mascotas = mascotas;
      console.log(this.mascotas);
    });
  }

  getMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.medico = medicos;
      this.cargando = false;
      console.log(this.medico);
    });
  }

  cargarCitas() {
    this.cargando = true;
    this.citasService.cargarCitas().subscribe((citas) => {
      this.cargando = false;
      this.citas = citas;
      console.log(this.citas);
    });
  }

  guardarCambios(cita: Cita) {
    this.citasService.actualizarCita(cita).subscribe((resp) => {
      Swal.fire('Actualizado', cita.motivo, 'success');
    });
  }

  buscarCita(termino: string) {
    if (termino.length === 0) {
      return this.cargarCitas();
    }

    this.busquedasService.buscar('citas', termino).subscribe((resp: Cita[]) => {
      this.citas = resp;
    });
  }

  async abrirSweetAlert() {
    //create a form with 2 inputs motivos,hora,fecha,mascota,medico using sweetalert2

    const { value: formValues } = await Swal.fire({
      title: 'Nueva cita',
      html: `<input id="motivo" class="swal2-input" placeholder="Motivo">
       <input id="hora" class="swal2-input" type="time" placeholder="Hora">
        <input id="fecha" class="swal2-input" type="date" placeholder="Fecha">
        <div>
          <select id="mascota" class="swal2-select">
            <option value="">Seleccione una mascota</option>
            ${this.mascotas.map(
              (mascota) =>
                `<option value="${mascota._id}">${mascota.nombre}</option>`
            )}
            </select>
        </div>
        <div>
        <select id="medico" class="swal2-select">
          <option value="">Seleccione un medico</option>
          ${this.medico.map(
            (medico) =>
              `<option value="${medico.uid}">${medico.nombre}</option>`
          )}
          </select>
      </div>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('motivo')).value,
          (<HTMLInputElement>document.getElementById('hora')).value,
          (<HTMLInputElement>document.getElementById('fecha')).value,
          (<HTMLInputElement>document.getElementById('mascota')).value,
          (<HTMLInputElement>document.getElementById('medico')).value,
        ];
      },
    });

    if (formValues) {
      let data = {
        motivo: formValues[0],
        horaCita: formValues[1],
        fechCita: formValues[2],
        mascota: formValues[3],
        medico: formValues[4],
      };

      this.citasService.crearCita(data).subscribe((resp) => {
        Swal.fire('Creada', 'Cita creada correctamente', 'success');
        this.cargarCitas();
      });
    }
  }
}
