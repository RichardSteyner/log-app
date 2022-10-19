import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  userModel: Usuario = new Usuario()

  contrasenia1: string = '';
  contrasenia2: string = '';
  titulo: string = 'Registrase';
  errorSave: string = '';

  constructor(public modalRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: LoginService) { }

  ngOnInit(): void {
  }

  registrarse(): void {
    if(this.contrasenia1 !== this.contrasenia2) {
      this.errorSave = 'Las contraseñas no coinciden';
      return;
    }
    this.userModel.rol = '';
    this.userModel.password = this.contrasenia1;
    this.authService.registrarse(this.userModel).subscribe( (rpta: any) => {
      console.log(rpta);
      this.closeModal();
    }, (errorSolicitud: any) => {
      this.procesarError(errorSolicitud);
    });
  }

  private procesarError(errorSolicitud: any): void {
    console.log(errorSolicitud);
    this.errorSave = errorSolicitud.error.msg || errorSolicitud.error.msj || errorSolicitud.error.errors[0].msg || errorSolicitud.message;
  }

  private closeModal(): void {
    this.modalRef.close(this.userModel.correo);
  }

}
