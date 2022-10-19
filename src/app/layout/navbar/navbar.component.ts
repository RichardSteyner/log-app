import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = 'Logs App';

  constructor(public authService: LoginService, private router: Router, private _snackbar: MatSnackBar) { }

  logout(): void {
    let username = this.authService.usuario?.nombre;
    this.authService.logout();
    this._snackbar.open(`Hola ${username}, has cerrado sesión con éxito!`, 'Ok', { duration: 3000 });
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    console.log('NavbarComponent');
  }

}
