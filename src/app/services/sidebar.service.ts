import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Menu principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/' },
        // { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Catalogo', url: 'rxjs' },
        { titulo: 'Eventos', url: 'Promesas' },
        // { titulo: 'ProgressBar', url: 'progress' },
      ]
    },

    {
      titulo: 'Servicios',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Citas Médicas', url: 'citas' },
        { titulo: 'Médicos', url: 'medicos' },
        { titulo: 'Mascotas', url: 'mascotas' },
        { titulo: 'Razas', url: 'razas' },
        { titulo: 'Especies', url: 'especies' },
      ]
    },
  ];

  constructor() { }
}
