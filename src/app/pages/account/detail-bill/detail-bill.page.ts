import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.page.html',
  styleUrls: ['./detail-bill.page.scss'],
})
export class DetailBillPage implements OnInit {
  billProductDetail: any = {};
  constructor(private router: Router) {}
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      const currentNavigation = this.router.getCurrentNavigation();
      this.billProductDetail = currentNavigation.extras.state.billProductDetail;
      console.log(this.billProductDetail);
    }
  }
}
