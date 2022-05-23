import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { UserGuard } from '../_guards/user.guard';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [UserGuard],
    children: [
      { path: 'admin', component: ListaUsuariosComponent, canActivate: [AdminGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
