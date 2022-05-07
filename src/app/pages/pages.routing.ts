import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guard/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MascotasComponent } from './mantenimientos/mascotas/mascotas.component';
import { CitasComponent } from './mantenimientos/citas/citas.component';
import { RazasComponent } from './mantenimientos/razas/razas.component';
import { EspeciesComponent } from './mantenimientos/especies/especies.component';
//import RoleAdminGuard
import { RoleAdminGuard } from '../guard/role_admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      // { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
      // { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes de cuenta' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Productos' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Eventos' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de Usuario' },
      },

      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [RoleAdminGuard],
        data: { titulo: 'Pacientes' },
      },
      { path: 'citas', component: CitasComponent, data: { titulo: 'Citas' } },
      {
        path: 'medicos',
        canActivate: [RoleAdminGuard],
        component: MedicosComponent,
        data: { titulo: 'Médicos' },
      },
      {
        path: 'mascotas',
        component: MascotasComponent,
        data: { titulo: 'Mascotas' },
      },
      {
        path: 'razas',
        canActivate: [RoleAdminGuard],
        component: RazasComponent,
        data: { titulo: 'Razas' },
      },
      {
        path: 'especies',
        canActivate: [RoleAdminGuard],
        component: EspeciesComponent,
        data: { titulo: 'Especies' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
