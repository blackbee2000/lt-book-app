import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  menuHeight;
  innerWidth;
  wherePage = 'account';
  type = 'cart';
  activePopup = false;
  loading = true;
  account: any;
  cartProduct = [
    {
      id: 1,
      name: 'Mysthem',
      img: './assets/images/book2.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 5,
    },
    {
      id: 2,
      name: 'Mysthemme',
      img: './assets/images/book3.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 5,
    },
    {
      id: 3,
      name: 'Mysthemme',
      img: './assets/images/book4.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 2,
    },
    {
      id: 4,
      name: 'Mysthemme',
      img: './assets/images/book.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 4,
    },
    {
      id: 5,
      name: 'Mysthemme',
      img: './assets/images/book5.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 5,
    },
  ];
  boughtProduct = [
    {
      id: 1,
      name: 'Mysthem',
      img: './assets/images/book.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 5,
    },
    {
      id: 6,
      name: 'Mysthemme',
      img: './assets/images/book4.jpg',
      isCheck: false,
      price: 50000,
      quantity: 1,
      rating: 5,
    },
  ];
  listBillProduct = [
    {
      idBill: '1023545',
      name: 'Đơn hàng MS0121',
      status: 'now',
      orderDaily: '16/09/2021',
      total: 500000,
      transportFee: 25000,
    },
    {
      idBill: '1023546',
      name: 'Đơn hàng MS0123',
      status: 'now',
      orderDaily: '16/09/2021',
      total: 500000,
      transportFee: 25000,
    },
    {
      idBill: '1023547',
      name: 'Đơn hàng MS0121',
      status: 'done',
      orderDaily: '16/09/2021',
      total: 500000,
      transportFee: 25000,
    },
    {
      idBill: '1023548',
      name: 'Đơn hàng MS0124',
      status: 'done',
      orderDaily: '16/09/2021',
      total: 500000,
      transportFee: 25000,
    },
  ];
  listBillProductDetail = [
    {
      idBill: '1023545',
      product: [
        {
          name: 'Lavie En Rose',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Lavie En Rose',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Lavie En Rose',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Lavie En Rose',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
      ],
      method: 'vnpay',
    },
    {
      idBill: '1023546',
      product: [
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
      ],
      method: 'cashmoney',
    },
    {
      idBill: '1023547',
      product: [
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
      ],
      method: 'cashmoney',
    },
    {
      idBill: '1023548',
      product: [
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
        {
          name: 'Mysthem',
          img: './assets/images/book2.jpg',
          isCheck: false,
          price: 50000,
          quantity: 5,
        },
      ],
      method: 'cashmoney',
    },
  ];
  billProductDetail: any = {};
  chooseAll = true;
  allProduct = [];
  constructor(
    private router: Router,
    private storage: StorageService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.loadingProduct();
    this.menuHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    const info = localStorage.getItem('infoAccount') || null;
    this.account = JSON.parse(info);
    console.log('account', this.account);
    if (!this.account) {
      this.getInfo();
    }
  }
  async getInfo() {
    const token = await JSON.parse(localStorage.getItem('token'));
    await this.apiService.getInfoUser(token?.access_token).subscribe(
      (res) => {
        localStorage.setItem('infoAccount', JSON.stringify(this.account));
        console.log(res);
        this.account = res.data;
      },
      (err) => {
        this.apiService
          .refreshToken(token?.refreshToken)
          .subscribe((response) => {
            localStorage.setItem('token', JSON.stringify(response));
            this.getInfo();
          });
      }
    );
  }
  onChangeType(type) {
    this.loading = true;
    this.loadingProduct();
    this.type = type;
  }
  checkAll() {
    this.chooseAll = !this.chooseAll;
    if (this.type === 'cart') {
      if (!this.chooseAll) {
        this.cartProduct.forEach((e) => {
          e.isCheck = true;
        });
      } else {
        this.cartProduct.forEach((e) => {
          e.isCheck = false;
        });
      }
    } else if (this.type === 'bought') {
      if (!this.chooseAll) {
        this.boughtProduct.forEach((e) => {
          e.isCheck = true;
        });
      } else {
        this.boughtProduct.forEach((e) => {
          e.isCheck = false;
        });
      }
    }
  }
  chooseBook(item) {
    item.isCheck = !item.isCheck;
  }
  delete() {
    if (this.type === 'cart') {
      this.cartProduct =
        _.filter([...this.cartProduct], (o) => o.isCheck === false) || [];
    } else if (this.type === 'bought') {
      this.boughtProduct =
        _.filter([...this.boughtProduct], (o) => o.isCheck === false) || [];
    }
  }
  payment() {
    this.cartProduct.forEach((e) => {
      if (e.isCheck === true) {
        this.allProduct.push(e);
      }
    });
    this.boughtProduct.forEach((e) => {
      if (e.isCheck === true) {
        this.allProduct.push(e);
      }
    });
    console.log(this.allProduct);
    const navigationExtras: NavigationExtras = {
      state: {
        listBook: this.allProduct,
        listBill: this.listBillProduct,
        listBillDetails: this.listBillProductDetail,
      },
    };
    this.allProduct = [];
    this.router.navigateByUrl('/account/payment', navigationExtras);
  }
  billDetail(item) {
    this.activePopup = true;
    this.billProductDetail = item;
    this.listBillProductDetail.forEach((e) => {
      if (e.idBill === item.idBill) {
        this.billProductDetail.product = e.product;
        this.billProductDetail.paymentMethod = e.method;
      }
    });
    console.log(this.billProductDetail);
    const navigationExtras: NavigationExtras = {
      state: { billProductDetail: this.billProductDetail },
    };
    this.router.navigateByUrl('/account/detail-bill', navigationExtras);
  }
  editInfo() {
    const navigationExtras: NavigationExtras = {
      state: { inForAccount: this.account, isEdit: 'account' },
    };
    this.router.navigateByUrl('/account/edit', navigationExtras);
  }
  loadingProduct() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
