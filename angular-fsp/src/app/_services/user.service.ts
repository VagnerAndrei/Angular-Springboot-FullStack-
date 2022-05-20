import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserRegister, User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUserRegister) {
    return this.http.post<User>(`${environment.apiUrl}/usuarios/autenticar/`, user)
  }
}
