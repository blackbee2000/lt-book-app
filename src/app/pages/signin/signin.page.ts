import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  menuHeight;

  constructor() { }

  ngOnInit() {
    this.menuHeight=window.innerHeight;

  }

}
