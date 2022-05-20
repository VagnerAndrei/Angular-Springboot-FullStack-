import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button'
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    UserComponent,
    MenuComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MenubarModule,
    ButtonModule
  ]
})
export class UserModule { }
