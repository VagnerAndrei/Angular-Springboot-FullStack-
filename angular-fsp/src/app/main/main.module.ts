import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { Checkbox, CheckboxModule } from 'primeng/checkbox'
import { MenuComponent } from './menu/menu.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    ListaUsuariosComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    FormsModule
  ]
})
export class UserModule { }
