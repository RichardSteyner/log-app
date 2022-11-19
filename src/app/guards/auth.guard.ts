import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    const now = new Date().getTime();
    const expireDate = payload.exp * 1000;
    console.log(this.getDateFromMiliseconds(now));
    console.log(this.getDateFromMiliseconds(expireDate));
    if (expireDate < now) {
      return true;
    }
    return false;
  }

  getDateFromMiliseconds(miliseconds: number): Date {
    return new Date(miliseconds);
  }
  
}
