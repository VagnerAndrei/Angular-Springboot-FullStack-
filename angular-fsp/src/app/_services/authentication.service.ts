import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUserLogin, User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  private userObservable: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(environment.storageUser)));
    this.userObservable = this.userSubject.asObservable();
  }

  public get user(): Observable<User> {
    return this.userObservable;
  }

  login(user: IUserLogin) {
    return this.http.post<User>(`${environment.apiUrl}/usuarios/autenticar/`, user)
      .pipe(map(response => {
        localStorage.setItem(environment.storageUser, JSON.stringify(response));
        this.userSubject.next(response);
        return response;
      }))
  }

  logout() {
    localStorage.removeItem(environment.storageUser);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }




}
