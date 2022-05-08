import { Injectable } from '@angular/core';
// impor usuario service
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public userInfo;

  constructor(public usuarioService: UsuarioService) {
    this.userInfo = this.usuarioService.getUserInfo();
  }

  public getMenu(): any[] {
    const menu = [
      {
        titulo: 'Menu principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Inicio', url: '/' },
          // { titulo: 'Gráficas', url: 'grafica1' },
          { titulo: 'Catalogo', url: 'Promesas' },
          { titulo: 'Eventos', url: 'rxjs' },
          // { titulo: 'ProgressBar', url: 'progress' },
        ],
      },
    ];
    if (this.userInfo.role === 'ADMIN_ROLE') {
      const subAdmin = {
        titulo: 'Servicios',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Citas Médicas', url: 'citas' },
          { titulo: 'Mascotas', url: 'mascotas' },
          { titulo: 'Razas', url: 'razas' },
          { titulo: 'Especies', url: 'especies' },
        ],
      };
      menu.push(subAdmin);
    } else {
      const subUser = {
        titulo: 'Servicios',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Citas Médicas', url: 'citas' },
          { titulo: 'Mascotas', url: 'mascotas' },
        ],
      };
      menu.push(subUser);
    }

    return menu;
  }
}
