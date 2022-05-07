import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Medico } from 'src/models/medico.model';
import Swal from 'sweetalert2';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;

  public medicos: Medico[] = [];

  constructor( private medicoService: MedicoService,
               private busquedasService: BusquedasService){ }

    ngOnInit(): void {
      this.cargarMedicos();

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( (resp: Medico[] ) => {
          this.medicos = resp;

        });
  }

  cargarMedicos(){

      this.cargando = true;

      this.medicoService.cargarMedicos()
          .subscribe(medicos => {
            this.cargando = false;
            this.medicos = medicos;
          });
  }

  guardarCambios(medico: Medico){
    this.medicoService.actualizarMedico(medico._id, medico.nombre, medico.telefono)
        .subscribe(resp => {
            Swal.fire('Actualizado', medico.nombre, 'success');
        });
  }

  eliminarMedico(medico: Medico){
    this.medicoService.borrarEspecie(medico._id)
        .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire('Eliminado', medico.nombre, 'success');
        });
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
          title: 'Agregar Medico',
          text: 'Inrese el nombre de la especie',
          input: 'text',
          inputPlaceholder: 'Nombre de la especie',
          showCancelButton: true,
        });

    // if (value.trim().length > 0 ) {
    //      this.especieService.crearEspecie(value)
    //   .subscribe(resp => {
    //      console.log(resp);
    //    });
  //  }
  }

}
