import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { LogForm } from "../models/LogForm";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')    
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  setUserInfo(user: LogForm) {    
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  signIn(username: string, password: string) {
    return this.http.post(`${this.API_URI}/signin`, {'username' : username, 'password' : password}).toPromise()
  }

}
