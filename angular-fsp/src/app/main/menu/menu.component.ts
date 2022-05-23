import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.items = [
      {
        label: "Home",
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      }

    ];
    this.authenticationService.user.subscribe(user => {
      if (user?.perfis.includes('ADMIN'))
        this.items.push({
          label: 'Admin',
          icon: 'pi pi-fw pi-star',
          items: [{
            label: 'Lista de usuários',
            icon: 'pi pi-fw pi-users',
            routerLink: 'admin'
          }]
        })
    })

  }
  logout() {
    this.authenticationService.logout();
  }

}