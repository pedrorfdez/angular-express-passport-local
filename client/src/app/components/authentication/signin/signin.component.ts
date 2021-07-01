import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from "../../../services/users.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  signInUser(){
    this.usersService.signIn(this.user.username, this.user.password)
      .then((res) => {
        this.usersService.setUserInfo(this.user);
        this.router.navigate(['profile']);
        
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

}
