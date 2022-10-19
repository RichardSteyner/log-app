import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../services/log.service';
import { Log } from '../../../models/log';
import { LogsFormComponent } from '../logs-form/logs-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-logs-detalle',
  templateUrl: './logs-detalle.component.html',
  styleUrls: ['./logs-detalle.component.css']
})
export class LogsDetalleComponent implements OnInit {

  log?: Log ;
  id: string = '';
  canDelete: boolean = false;

  constructor(private route: ActivatedRoute,
              private logService: LogService,
              public dialog: MatDialog,
              public router: Router,
              private _snackBar: MatSnackBar,
              public authService: LoginService) { }

  ngOnInit(): void {
    this.canDelete = this.authService.hasRole('ADMIN_ROLE');
    this.route.paramMap.subscribe( (params: any) => {
      this.id = params.get('id');
      this.cargarLog();
    })
  }

  private cargarLog(): void {
    this.logService.ver(this.id).subscribe( (logRpta: Log) => {
      this.log = logRpta
    })
  }

  modificarLog(log: Log): void {
    const modalRef = this.dialog.open(LogsFormComponent, 
      {
        width: '750px',
        data: { log }
      })

    modalRef.afterClosed().subscribe((respuesta: boolean) => {
      if(respuesta) {
        this.cargarLog();
      }
    }); 
  }

  eliminarLog(log: Log): void {
    this.logService.eliminar(log._id).subscribe( (rpta: any) => {
      console.log(rpta);
      this.router.navigate(['/logs']);
    }, (errorSolicitud: any) => {
      if(errorSolicitud.status === 401){
      }
      this._snackBar.open(errorSolicitud.error.msg, 'Ok', { duration: 3000 });
      console.log(errorSolicitud.error);
    });
  }

}
