import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { UserGuard } from '../_guards/user.guard';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, canActivate: [UserGuard],
    children: [
      { path: 'admin', component: ListaUsuariosComponent, canActivate: [AdminGuard] },
      { path: 'user', component: EditUserComponent, canActivate: [UserGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
