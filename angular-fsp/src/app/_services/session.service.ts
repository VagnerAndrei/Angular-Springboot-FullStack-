import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUser: Observable<User>;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.user
  }


  get userObservable(): Observable<User> {
    return this.currentUser;
  }

  get isLoggedUser(): boolean {
    return localStorage.getItem(environment.storageUser) != null;
  }

  get isAdmin(): boolean {
    return JSON.parse(localStorage.getItem(environment.storageUser)).perfis.includes('ADMIN')
  }

  get isUser(): boolean {
    return JSON.parse(localStorage.getItem(environment.storageUser)).perfis.includes('USER')
  }
}
