import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/services';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  menuHeight;
  wherePage = 'payment';
  listBook: any = [];
  bill: any = {};
  billDetails: any = {};
  vnPay = true;
  total = 0;
  today = moment().format('DDMMYYYYhhmmss');
  deliveryCharges = 40000;
  totalAmount = 0;
  token: any = {};
  infoAccount: any = {};
  infoDelivery: any = {};
  listCartLocal: any;
  newCart: any = [];
  listBoughtCart: any;
  listBookInBill: any = [];
  constructor(
    private router: Router,
    private storage: StorageService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.menuHeight = innerHeight;
    this.route.queryParams.subscribe(async () => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.today);
        const currentNavigation = this.router.getCurrentNavigation();
        this.listBook = currentNavigation.extras.state.listBook;
        console.log('Danh sách sách mua hiện tại', this.listBook);
        this.calculateTotalMoney();
        // lấy thông tin từ local
        this.infoAccount = JSON.parse(localStorage.getItem('infoAccount'));
        this.listCartLocal = JSON.parse(
          localStorage.getItem(`${this.infoAccount.phone}`)
        );
        this.listBoughtCart = JSON.parse(
          localStorage.getItem(`${this.infoAccount.phone}-bought`)
        );
        //Lấy thông tin giao hàng
        const infoDeli = JSON.parse(
          localStorage.getItem(`infoDelivery-${this.infoAccount.phone}`)
        );
        console.log('infoDeli', infoDeli);
        if (infoDeli === null) {
          this.infoDelivery = this.infoAccount;
          console.log(
            'Chưa có thông tin giao hàng nên lấy thông tin tài khoản'
          );
          localStorage.setItem(
            `infoDelivery-${this.infoAccount.phone}`,
            JSON.stringify(this.infoAccount)
          );
        } else {
          this.infoDelivery = infoDeli;
        }
        console.log(this.infoDelivery);
      }
    });
  }
  async editInfo() {
    await this.storage.setObject('DeliveryInformation', this.infoDelivery);
    const navigationExtras: NavigationExtras = {
      state: { inForAccount: this.infoDelivery, isEdit: 'delivery' },
    };
    this.router.navigateByUrl('/account/edit', navigationExtras);
  }
  plus(item) {
    if (item.numBuy <= 20) {
      item.numBuy += 1;
      this.calculateTotalMoney();
    }
  }
  minus(item) {
    if (item.numBuy !== 1) {
      item.numBuy -= 1;
      this.calculateTotalMoney();
    }
  }
  convertMoney(money) {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
  }
  calculateTotalMoney() {
    this.total = 0;
    this.listBook.forEach((e) => {
      this.total = this.total + e.price * e.numBuy;
    });
    if (!this.vnPay) {
      this.totalAmount = this.total + this.deliveryCharges;
    } else {
      this.totalAmount =
        this.total + (this.total * 2) / 100 + this.deliveryCharges;
    }
  }
  choseMethod() {
    this.vnPay = !this.vnPay;
    this.calculateTotalMoney();
  }
  payment() {
    this.bill = {
      id: null,
      idUser: this.infoAccount.id,
      nameCustomer: this.infoDelivery.name,
      phoneCustomer: this.infoDelivery.phone,
      addressCustomer: this.infoDelivery.address,
      code: this.today.toString(),
      total: this.totalAmount,
      status: this.vnPay ? 'payment' : 'noPayment',
      date: moment().format('DD/MM/YYYY'),
    };
    this.billDetails = {
      idBillDetails: null,
      idBill: '1023549',
      idUser: this.infoAccount.id,
      date: moment().format('DD/MM/YYYY').toString(),
      listBook: this.listBook,
    };
    console.log('Hóa đơn mua hàng', this.bill);
    console.log('Hóa đơn mua hàng chi tiết', this.billDetails);
    this.createBill(this.bill);
    // this.router.navigateByUrl('/account');
    // this.listBill.push({
    //   idBill: '1023549',
    //   name: 'Đơn hàng MS0121',
    //   status: 'now',
    //   orderDaily: '16/09/2021',
    //   total: this.totalAmount,
    //   transportFee: this.deliveryCharges,
    // });
  }
  logBook(idbill) {
    this.listBook.forEach((element) => {
      const book = {
        idBookInBill: null,
        idBill: idbill,
        idBook: element.id,
        nameBook:element.name,
        imgBook: element.imageBook,
        amount: element.numBuy,
        price: element.price,
        totalPrice: element.price * element.numBuy,
      };
      this.listBookInBill.push(book);
    });
    console.log('Danh sách sách mua trong hóa đơn', this.listBookInBill);
  }
  createBill(bill) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.apiService.createBill(this.token?.access_token, bill).subscribe(
      (res) => {
        console.log(res);
        this.logBook(res.data.id);
        this.apiService
          .createBillDetails(this.token?.access_token,this.listBookInBill)
          .subscribe(
            (response) => {
              console.log(response.data);
              // Xóa sản phẩm đã mua ra khỏi local Cart
              this.listBook.forEach((element) => {
                this.listCartLocal.forEach((e, index) => {
                  if (element.id === e.id) {
                    console.log('có sách xóa');
                    this.listCartLocal.splice(index, 1);
                    console.log(this.listCartLocal);
                  }
                });
              });
              //set lại cart
              localStorage.setItem(
                this.infoAccount.phone,
                JSON.stringify(this.listCartLocal)
              );
              //Nếu list sách đã mua chưa tồn tại
              if (this.listBoughtCart === null) {
                //set bằng list sách của bill hiện tại
                this.listBook.forEach((element) => {
                  this.listBoughtCart = [];
                  this.listBoughtCart.push({
                    ...element,
                    isCheck: false,
                    numBuy: 1,
                  });
                  localStorage.setItem(
                    `${this.infoAccount.phone}-bought`,
                    JSON.stringify(this.listBoughtCart)
                  );
                });
              } else {
                //thêm list sách vừa mua vào list đã mua và đưa lên storage
                this.listBook.forEach((element) => {
                  this.listBoughtCart.forEach((e) => {
                    if (element.id !== e.id) {
                      this.listBoughtCart.push({
                        ...element,
                        isCheck: false,
                        numBuy: 1,
                      });
                    }
                  });
                });
                localStorage.setItem(
                  `${this.infoAccount.phone}-bought`,
                  JSON.stringify(this.listBoughtCart)
                );
              }
              this.router.navigateByUrl('/account');
            },
            (error) => {}
          );
      },
      (err) => {
        this.apiService
          .refreshToken(this.token?.refresh_token)
          .subscribe((response) => {
            localStorage.setItem('token', JSON.stringify(response));
            this.createBill(bill);
          });
      }
    );
    // this.listBook = [];
  }
}
