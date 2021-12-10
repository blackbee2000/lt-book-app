import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  menuHeight;
  wherePage = 'product';
  backgroundShadow: any = false;
  loading: any = false;
  loadingSkeleton = false;
  search: any = false;
  shadow: any = false;
  labelTypeBook: any = '';
  listProduct: any = [];
  searchText = '';
  listTypeBook: any = [
    {
      name: 'TextBook',
      icon: 'book',
      color:
        'linear-gradient(96.58deg, #017421 5.04%, rgba(173, 255, 0, 0.69) 95.89%)',
    },
    {
      name: 'Novel',
      icon: 'pencil-outline',
      color:
        'linear-gradient(94.4deg, #074782 3.48%, rgba(53, 171, 222, 0.88) 96.89%)',
    },
    {
      name: 'Comic',
      icon: 'aperture',
      color:
        'linear-gradient(105.07deg, #FFCB11 47.93%, rgba(255, 223, 55, 0.56) 92.11%)',
    },
    {
      name: 'Poem',
      icon: 'flower-outline',
      color: 'linear-gradient(104.23deg, #9A0B61 9.85%, #F34F81 87.14%)',
    },
    {
      name: 'Thriller',
      icon: 'skull',
      color:
        'linear-gradient(102.09deg, #000000 25.75%, rgba(248, 24, 24, 0.73) 85.9%)',
    },
    {
      name: 'Short',
      icon: 'pie-chart',
      color:
        'linear-gradient(286.43deg, #FFD705 7.59%, rgba(248, 24, 24, 0.53) 91.53%)',
    },
  ];
  isClick: any = false;
  // searchItem = new EventEmitter();

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.labelTypeBook = 'TextBook';
    this.menuHeight = window.innerHeight;
    this.getBookInType();
  }
  async getBookInType() {
    const typeBook = {
      type: this.labelTypeBook,
    };
    this.loadingSkeleton = true;
    await this.apiService.getBook(typeBook).subscribe(
      (res) => {
        // console.log(res);
        setTimeout(() => {
          this.loadingSkeleton = false;
        }, 500);
        this.listProduct = res.data;
      },
      (err) => {
        console.log(err);
        this.loadingSkeleton = false;
        console.log(this.loadingSkeleton);
        this.listProduct = [];
      }
    );
  }
  goDetail(product) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const navigationExtras: NavigationExtras = {
        state: { item: product },
      };
      this.router.navigateByUrl('/product/detail', navigationExtras);
    }, 500);
  }

  hanldeChangeTypeBook(item) {
    switch (item.name) {
      case 'TextBook':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct1;
        break;
      case 'Novel':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct2;
        break;
      case 'Comic':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct1;
        break;
      case 'Poem':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct2;
        break;
      case 'Thriller':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct1;
        break;
      case 'Short':
        this.labelTypeBook = item.name;
        this.getBookInType();
        // this.listProduct = this.listProduct2;
        break;
    }
  }
  hanldeClickButtonMore(event) {
    switch (event) {
      case 'open':
        this.isClick = true;
        break;
      case 'close':
        this.isClick = false;
        break;
      case 'search':
        this.shadow = true;
        this.search = true;
        break;
      case 'shadow':
        this.shadow = false;
        this.search = false;
        this.isClick = false;
        break;
    }
  }
  async hanldeSearch(value) {
    console.log(value);
    if (value !== '') {
      this.listProduct = this.listProduct.filter(
        (item) => item.name.toLowerCase() === value.toLowerCase()
      );
    }
    this.shadow = false;
    this.search = false;
    this.isClick = false;
  }
}
