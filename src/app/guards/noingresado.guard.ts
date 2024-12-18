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
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const idTipoUsuario = user?.id_tipo_usuario; 

      
      if (idTipoUsuario === 1) {
        return this.router.createUrlTree(['/admintabs']); 
      } 
      
      else if (idTipoUsuario === 2) {
        return this.router.createUrlTree(['/tabs']); 
      }
    }

    
    return true;
  }
}
