import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppGuard } from './_guards/app.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AppGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AppGuard] },
  { path: '', loadChildren: () => import('./users/users.module').then(m => m.UserModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
