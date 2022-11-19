import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Inicie Sesión!';
  usuario: Usuario;

  constructor(private authService: LoginService, private router: Router, private _snackbar: MatSnackBar, public dialog: MatDialog) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/logs']);
    }
  }

  login(): void {
    if (!this.usuario.correo || !this.usuario.password) {
      this._snackbar.open('Complete usuario y contraseña por favor.', 'Ok', { duration: 3000 });
      return;
    }

    this.authService.login(this.usuario).subscribe( (response: any) => {

      this.authService.guardarUsuario(response.usuario);
      this.authService.guardarToken(response.token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/logs']);
      this._snackbar.open(`Hola ${usuario?.nombre}, has iniciado sesión con éxito!`, 'Ok', { duration: 3000 });
    }, (err: any) => {
      this._snackbar.open('Usuario o clave incorrectas.', 'Ok', { duration: 3000 });
      console.log(err.error);
      }
    );
  }

  registrarse(): void {
    const modalRef = this.dialog.open(RegistroComponent, 
      {
        width: '600px',
        disableClose: true
      })

    modalRef.afterClosed().subscribe((respuesta: string) => {
      console.log(respuesta);
      if(respuesta!=null) {
        this.usuario.correo = respuesta;
      }
    });
  }

}
