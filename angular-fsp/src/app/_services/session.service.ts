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

  constructor(authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.user
  }


  get userObservable(): Observable<User> {
    return this.currentUser;
  }

  get userId():number{
    return JSON.parse(localStorage.getItem(environment.storageUser)).id ;
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

  private get token(): string {
    return JSON.parse(localStorage.getItem(environment.storageUser))?.token ?? null
  }

  get tokenExpired(): boolean {
    const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
    const expired = (Math.floor((new Date).getTime() / 1000)) >= expiry;
    if (expired) {
      localStorage.removeItem(environment.storageUser);
      alert('Session expired!');
      return true;
    }
    return false;

  }

}
