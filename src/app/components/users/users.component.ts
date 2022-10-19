import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  titulo: string = 'Listado de Usuarios'
  users: Usuario[] = [];

  totalRegistros : number = 0;
  totalPorPagina : number = 1;
  paginaActual : number = 0;
  opcionesPorPagina: number[] = [5, 10, 25];

  @ViewChild(MatPaginator) paginator! : MatPaginator;

  //inyectamos service
  constructor(private service: UsuarioService, private _snackBar: MatSnackBar) { }

  //acá inicializaremos obteniendo los alumnos
  ngOnInit(): void {
    /* this.service.listar().subscribe( (rpta: any) => {
      console.log(rpta);
      this.users = rpta.usuarios;
    }); */
    this.calcularRangos();
  }

  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(){
    const pa = this.paginaActual + '';
    const tp = this.totalPorPagina.toString();
    this.service.listarPaginas(pa, tp).subscribe( (rpta: any) => {
      this.users = rpta.usuarios;
      this.totalRegistros = rpta.total;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página :D';
    });
  }

  public eliminar(u: Usuario): void {
    this.service.eliminar(u.uid).subscribe( (rpta: any) => {
      this._snackBar.open('Se eliminó usuario', 'Ok', { duration: 3000 });
      console.log(rpta);
      this.calcularRangos();
    }, (errorSolicitud: any) => {
      if(errorSolicitud.status === 401){
      }
      this._snackBar.open(errorSolicitud.error.msg, 'Ok', { duration: 3000 });
      console.log(errorSolicitud.error);
    });
  }

}
