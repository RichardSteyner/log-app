import { Component, OnInit, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges, DoCheck {

  title: string = 'Logs App';
  isAuthenticated: boolean = false;

  constructor(public authService: LoginService, private router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('NavbarComponent');
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('Changes..');
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log('Check..');
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    let username = this.authService.usuario?.nombre;
    this.authService.logout();
    this._snackbar.open(`Hola ${username}, has cerrado sesión con éxito!`, 'Ok', { duration: 3000 });
    this.router.navigate(['/login']);
  }

}
