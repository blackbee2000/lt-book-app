import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  menuHeight;
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.menuHeight=window.innerHeight;
  }
  signIn(){
    console.log('login');
    this.router.navigateByUrl('/signin');
  }
  login(){
    console.log('login');
    this.router.navigateByUrl('/account');
  }
}
