import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Especie } from 'src/models/especie.model';
import Swal from 'sweetalert2';
import { EspecieService } from '../../../services/especie.service';


@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styles: [
  ]
})
export class EspeciesComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;

  public especies: Especie[] = [];

  constructor( private especieService: EspecieService,
               private busquedasService: BusquedasService){ }

    ngOnInit(): void {
      this.cargarEspecies();

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarEspecies();
    }

    this.busquedasService.buscar( 'especies', termino )
        .subscribe( (resp: Especie[] ) => {
          this.especies = resp;

        });
  }

  cargarEspecies(){

      this.cargando = true;

      this.especieService.cargarEspecies()
          .subscribe(especies => {
            this.cargando = false;
            this.especies = especies;
          });
  }

  guardarCambios(especie: Especie){
    this.especieService.actualizarEspecie(especie._id, especie.nombre, especie.descripcion)
        .subscribe(resp => {
            Swal.fire('Actualizado', especie.nombre, 'success');
        });
  }

  eliminarEspecie(especie: Especie){
    this.especieService.borrarEspecie(especie._id)
        .subscribe(resp => {
            this.cargarEspecies();
            Swal.fire('Eliminado', especie.nombre, 'success');
        });
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
          title: 'Agregar Especie',
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
