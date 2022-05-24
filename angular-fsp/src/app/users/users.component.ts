import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userEmail: string;
  userName: string;

  constructor(sessionService: SessionService) {
    sessionService.userObservable.subscribe(user => {

      this.userEmail = user ? user.email : ''
      this.userName = user ? user.nome : ''
    })
  }

  ngOnInit(): void {
  }

}
