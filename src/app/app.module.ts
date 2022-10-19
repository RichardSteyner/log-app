import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LayoutModule } from './layout/layout.module';
import { LogsComponent } from './components/logs/logs.component';
import { UsersComponent } from './components/users/users.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogsFormComponent } from './components/logs/logs-form/logs-form.component';
import { LogsDetalleComponent } from './components/logs/logs-detalle/logs-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { LogService } from './services/log.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegistroComponent } from './components/login/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    UsersComponent,
    LogsFormComponent,
    LogsDetalleComponent,
    LoginComponent,
    RegistroComponent
  ],
  entryComponents: [
    LogsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    CKEditorModule,
    MatPaginatorModule
  ],
  providers: [
    LogService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
