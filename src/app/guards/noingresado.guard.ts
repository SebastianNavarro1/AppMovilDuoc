import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoIngresado implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Verifica si el usuario está logueado

    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const idTipoUsuario = user?.id_tipo_usuario;  // Obtén el id_tipo_usuario del localStorage

      // Si el tipo de usuario es Admin (id_tipo_usuario 1)
      if (idTipoUsuario === 1) {
        return this.router.createUrlTree(['/admintabs']); // Redirige a la página de Admin
      } 
      // Si el tipo de usuario es Usuario (id_tipo_usuario 2)
      else if (idTipoUsuario === 2) {
        return this.router.createUrlTree(['/tabs']); // Redirige a la página de Usuario
      }
    }

    // Si el usuario no está logueado, permite el acceso a la página de login
    return true;
  }
}
