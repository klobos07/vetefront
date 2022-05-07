import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // public imgUrl = '';
  public usuario: Usuario;
  public menuItems: any[];

  constructor( private sidebarService: SidebarService,
               private usuarioSerice: UsuarioService) {
    this.menuItems = sidebarService.getMenu();
    this.usuario = usuarioSerice.usuario;
    // this.imgUrl = usuarioSerice.usuario.imagenUrl;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
