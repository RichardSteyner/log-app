import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { LogsFormComponent } from './logs-form/logs-form.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[] = [];

  constructor(private service: LogService, 
    public dialog: MatDialog,
    public authService: LoginService) { }

  ngOnInit(): void {
    /*this.logs.unshift(new Log('1', 'aaaaaaaa', 'aaaaa', 'aaaaaaaaa', ''));
    this.logs.unshift(new Log('3', 'bbbbbbbbbbbb', 'bbbbbbb', 'bbbbbbbb', ''));
    this.logs.unshift(new Log('4', 'vvvvvvvvvv', 'vvvvvvvvvvvvv', 'vvvvvvvvvvvv', ''));
    this.logs.unshift(new Log('5', 'bbbbbbbbb', 'aaaaa', 'aaaaaaaaa', ''));*/
    console.log('LogsComponent');
    this.cargarLogs();
  }

  public canModify(log: Log): boolean {
    return this.authService.hasRole('ADMIN_ROLE') || this.authService.usuario?.uid === log?.usuario._id;
  }

  private cargarLogs(): void {
    this.service.listar().subscribe((logsResponse: any) => {
      this.logs = logsResponse.logs;
    });
  }

  filtrar(event: Event): void {
    console.log('Filtrar');
    const target = (event.target as HTMLInputElement);
    const filtro = target.value !== undefined ? target.value.trim() : ''
    if(filtro !== '' && filtro.length>1) {
      this.service.filtrar(filtro).
                            subscribe( (logsRpta: any) => {
                              this.logs = logsRpta.results;
                            });
    } else {
      this.cargarLogs();
    }
  }

  nuevoLog(): void {
    const modalRef = this.dialog.open(LogsFormComponent, 
      {
        width: '750px',
        data: {log: null},
        disableClose: true
      })

    modalRef.afterClosed().subscribe((respuesta: boolean) => {
      if(respuesta) {
        this.cargarLogs();
      }
    });
  }

  modificarLog(log: Log): void {
    const modalRef = this.dialog.open(LogsFormComponent, 
      {
        width: '600px',
        data: { log },
        disableClose: true
      })

    modalRef.afterClosed().subscribe((respuesta: boolean) => {
      if(respuesta) {
        this.cargarLogs();
      }
    }); 
  }

}
