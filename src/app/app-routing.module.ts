import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './components/logs/logs.component';
import { UsersComponent } from './components/users/users.component';
import { LogsFormComponent } from './components/logs/logs-form/logs-form.component';
import { LogsDetalleComponent } from './components/logs/logs-detalle/logs-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'logs'},
  {path:'logs', component: LogsComponent, canActivate: [AuthGuard] },
  {path:'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN_ROLE'}},
  {path:'logs/:id', component: LogsDetalleComponent, canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
