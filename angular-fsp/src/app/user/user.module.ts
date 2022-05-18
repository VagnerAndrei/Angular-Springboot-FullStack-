import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MenuComponent } from './menu/menu/menu.component';
import { MenubarModule } from 'primeng/menubar'

@NgModule({
  declarations: [
    UserComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MenubarModule
  ]
})
export class UserModule { }
