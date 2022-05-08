import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//import model cita
import { Cita } from 'src/models/cita.model';

//import citasService
import { CitasService } from '../../../services/citas.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [],
})
export class CitasComponent implements OnInit {
  public cargando: boolean = true;
  public citas: Cita[] = [];

  constructor(
    private citasService: CitasService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
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
}
