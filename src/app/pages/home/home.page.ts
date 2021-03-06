import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  menuHeight;
  wherePage = 'home';
  option = {
    direction: 'vertical',
  };
  isLogin = false;
  rotate360: any = false;
  constructor() {}
  ngOnInit() {
    this.menuHeight = window.innerHeight;
    const isLogin = localStorage.getItem('infoAccount') || null;
    console.log('check');
    if (isLogin !== null) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }
  rotateActive() {
    if (this.rotate360 === false) {
      this.rotate360 = true;
      this.audioPlayerRef.nativeElement.play();
    } else {
      this.rotate360 = false;
      this.audioPlayerRef.nativeElement.pause();
    }
  }
  backToTop() {
    window.scrollTo(0, 0);
  }
}
