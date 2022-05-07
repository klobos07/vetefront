import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

//authGuardAdmin
export class RoleUserGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let test = this.usuarioService.getUserInfo();

    if ((test && test.role == 'USER_ROLE')) {
      return true;
    } else {
        this.router.navigateByUrl('/dashboard');
              return false;
    }
  }
}
