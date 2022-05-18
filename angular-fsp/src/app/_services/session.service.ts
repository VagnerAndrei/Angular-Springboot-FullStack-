import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getUser() {
    return JSON.parse(localStorage.getItem(environment.storageUser));
  }

}
