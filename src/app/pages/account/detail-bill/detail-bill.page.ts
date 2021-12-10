import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.page.html',
  styleUrls: ['./detail-bill.page.scss'],
})
export class DetailBillPage implements OnInit {
  billProductDetail: any = {};
  bill: any;
  constructor(private router: Router) {}
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      const currentNavigation = this.router.getCurrentNavigation();
      this.billProductDetail = currentNavigation.extras.state.billProductDetail;
      this.bill = currentNavigation.extras.state.bill;
      console.log(this.billProductDetail);
    }
  }
  convertMoney(money) {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
  }
}
