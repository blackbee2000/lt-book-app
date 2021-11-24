import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.scss'],
})
export class HeaderSimpleComponent implements OnInit {
  @Input() menuHeight: number;
  @Input() wherePage: string;
  showMenu = false;
  infoAccount;
  constructor(private router: Router) {}

  async ngOnInit() {
    this.infoAccount = await localStorage.getItem('infoAccount' || null);
  }
  clickMenu() {
    this.showMenu = !this.showMenu;
  }
  async login() {
    this.showMenu = !this.showMenu;
    setTimeout(async () => {
      await this.router.navigateByUrl('/login');
    }, 1500);
  }
  logout() {
    localStorage.removeItem('infoAccount');
    localStorage.removeItem('token');
    this.showMenu = !this.showMenu;
    setTimeout(async () => {
      await this.router.navigateByUrl('/login');
    }, 1500);
  }
  info() {
    this.showMenu = !this.showMenu;
    setTimeout(async () => {
      await this.router.navigateByUrl('/account');
    }, 1500);
  }
  goPage(page) {
    this.showMenu = !this.showMenu;
    switch (page) {
      case 'home':
        setTimeout(async () => {
          await this.router.navigateByUrl('/home');
        }, 1500);
        break;
      case 'product':
        console.log('product');
        setTimeout(async () => {
          await this.router.navigateByUrl('/product');
        }, 1500);
        break;
      case 'contact':
        setTimeout(async () => {
          await this.router.navigateByUrl('/contact');
        }, 1500);
        break;
      case 'about':
        setTimeout(async () => {
          await this.router.navigateByUrl('/about');
        }, 1500);
        break;
      case 'blog':
        setTimeout(async () => {
          await this.router.navigateByUrl('/blog');
        }, 1500);
        break;
    }
  }
}
