import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
