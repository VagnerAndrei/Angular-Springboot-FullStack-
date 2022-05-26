import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogin, IUserRegister, User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUserRegister) {
    return this.http.post<User>(`${environment.apiUrl}/usuarios`, user)
  }

  find(id:number){
    return this.http.get<User>(`${environment.apiUrl}/usuarios/${id}`)
  }

  findAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/usuarios`)
  }

  updateRoles(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/usuarios/perfis`, user)
  }
}
