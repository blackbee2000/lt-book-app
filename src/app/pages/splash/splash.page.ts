import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  @ViewChild('introSlides', {static: false}) introSlides: IonSlides;
  isEnd = false;
  constructor(
    private router: Router,
    private plt: Platform
  ) { }

  ngOnInit() {
  }

  async slideOnChange(e) {
    this.isEnd = await this.introSlides.isEnd();
  }

  async swipeNext() {
    console.log('hahsdasdasdasdasd', this.isEnd);
    if (this.isEnd) {
      console.log('hahaahah', this.isEnd);
      await this.router.navigateByUrl('/home');
    } else {
      await this.introSlides.slideNext();
    }
  }

}
