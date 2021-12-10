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
  token: any;
  cartProduct = [];
  boughtProduct: any = [];
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
    this.route.queryParams.subscribe(async () => {
      this.loadingProduct();
      this.menuHeight = window.innerHeight;
      this.innerWidth = window.innerWidth;
      const info = localStorage.getItem('infoAccount') || null;
      this.account = JSON.parse(info);
      this.token = JSON.parse(localStorage.getItem('token'));
      this.boughtProduct =
        JSON.parse(localStorage.getItem(`${this.account.phone}-bought`)) || [];
      console.log('account', this.account);
      if (this.account === null) {
        await this.getInfo();
      } else {
        this.cartProduct = JSON.parse(localStorage.getItem(this.account.phone));
      }
    });
  }
  async getInfo() {
    const token = JSON.parse(localStorage.getItem('token'));
    await this.apiService.getInfoUser(token?.access_token).subscribe(
      async (res) => {
        this.account = res.data;
        localStorage.setItem('infoAccount', JSON.stringify(res.data));
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
    if (this.type === 'yourOrder') {
      this.apiService.findBillByIdUser(this.account.id).subscribe((res) => {
        this.listBillProduct = res.data;
      },(err)=>{
        this.listBillProduct = [];
      });
    }
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
      localStorage.setItem(
        this.account.phone,
        JSON.stringify(this.cartProduct)
      );
    } else if (this.type === 'bought') {
      this.boughtProduct =
        _.filter([...this.boughtProduct], (o) => o.isCheck === false) || [];
      localStorage.setItem(
        this.account.phone,
        JSON.stringify(this.boughtProduct)
      );
    }
  }
  convertMoney(money) {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
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
    const navigationExtras: NavigationExtras = {
      state: {
        listBook: this.allProduct,
      },
    };
    this.allProduct = [];
    this.router.navigateByUrl('/account/payment', navigationExtras);
  }
  billDetail(item) {
    this.activePopup = true;
    this.apiService
      .findBillDetailsByIdBill(this.token.access_token, item.id)
      .subscribe(
        async (res) => {
          this.billProductDetail = res.data;
          console.log(this.billProductDetail);
          const navigationExtras: NavigationExtras = {
            state: { billProductDetail: this.billProductDetail, bill: item },
          };
          await this.router.navigateByUrl(
            '/account/detail-bill',
            navigationExtras
          );
        },
        (err) => {
          this.apiService
            .refreshToken(this.token.refresh_token)
            .subscribe((res) => {
              this.token = res;
              localStorage.setItem('token', JSON.stringify(res));
              this.billDetail(item);
            });
        }
      );
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
