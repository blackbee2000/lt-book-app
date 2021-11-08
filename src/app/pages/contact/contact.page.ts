import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  menuHeight;
  wherePage='contact';
  constructor() { }

  ngOnInit() {
    this.menuHeight=window.innerHeight;
  }

}
