import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Log } from '../../../models/log';
import { LogService } from '../../../services/log.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-logs-form',
  templateUrl: './logs-form.component.html',
  styleUrls: ['./logs-form.component.css']
})
export class LogsFormComponent implements OnInit {

  editor: any = ClassicEditor;

  titulo: string = '';
  logModel: Log = new Log()
  errorSave: string = '';
  tipoValues = [
    'Aplicación',
    'Lenguaje'
  ]

  constructor(public modalRef: MatDialogRef<LogsFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private logService: LogService) 
              { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.log) {
      this.logModel = this.data.log;
      this.titulo = 'Modificar Log';
    } else {
      this.titulo = 'Nuevo Log';
    }
  }

  compararTipo(a1 : string, a2: string) : boolean{
    if(a1===undefined && a2===undefined){
      return true;
    }
    
    return a1===null || a1===undefined || a2===null || a2===undefined 
                ? false 
                : a1 === a2
  }

  editar(): void {
    this.logService.editar(this.logModel).subscribe( (rpta: any) => {
      console.log(rpta);
      this.closeModal();
    }, (errorSolicitud: any) => {
      this.procesarError(errorSolicitud);
    });
  }

  crear(): void {
    delete this.logModel._id;
    this.logService.crear(this.logModel).subscribe( (rpta: any) => {
      console.log(rpta);
      this.closeModal();
    }, (errorSolicitud: any) => {
      this.procesarError(errorSolicitud);
    });
  }

  private procesarError(errorSolicitud: any): void {
    console.log(errorSolicitud);
    this.errorSave = errorSolicitud.error.msg || errorSolicitud.error.msj || errorSolicitud.error.errors[0].msg || errorSolicitud.message;
    console.log(this.errorSave);
  }

  private closeModal(): void {
    this.modalRef.close(true);
  }

}
