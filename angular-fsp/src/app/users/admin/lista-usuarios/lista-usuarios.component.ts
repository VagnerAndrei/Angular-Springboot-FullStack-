import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  users: User[];
  usersSelecteds: User[];
  adminsSelecteds: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: response => {

        this.users = response;
        this.filterSelecteds();
      },
      error: error => {
        this.users = []
        console.log('An error ocurred on user service', error.error.message)
      }
    })
  }

  private filterSelecteds() {
    this.usersSelecteds = this.users.filter(user => user.perfis.includes('USER'))
    this.adminsSelecteds = this.users.filter(user => user.perfis.includes('ADMIN'))
  }

  onRoleChange(event: any, user: User, checkbox: string) {
    if (event.checked.includes(user) && !user.perfis.includes(checkbox))
      user.perfis.push(checkbox)
    else
      if (!event.checked.includes(user) && user.perfis.includes(checkbox))
        user.perfis.splice(user.perfis.findIndex(element => element == checkbox), 1)
    this.updateRole(user);
  }

  private updateRole(user: User) {
    this.userService.updateRoles(user).subscribe({
      error: error => {
        this.ngOnInit()
        alert("An error ocurred on user service.")
        console.log(error.error.message)
      }
    })
  }

}
