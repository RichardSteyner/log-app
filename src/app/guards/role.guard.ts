import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private authService: LoginService,
    private router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    console.log(next.data);
    let role = next.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    console.log('Acceso denegado', `Hola ${this.authService.usuario?.nombre} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/logs']);
    return false;
  }
  
}
