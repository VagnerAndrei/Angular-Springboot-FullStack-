import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { CheckboxModule } from 'primeng/checkbox'
import { MenuComponent } from './menu/menu.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ImageUploadComponent } from '../_components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    UsersComponent,
    MenuComponent,
    ListaUsuariosComponent,
    EditUserComponent,
    ImageUploadComponent

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
