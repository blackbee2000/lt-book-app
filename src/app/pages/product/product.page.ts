import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
  loadingSkeleton: any = false;
  search: any = false;
  shadow: any = false;
  labelTypeBook: any = '';
  listProduct: any = [];
  listProduct1: any = [
    {
      imageURL: 'assets/images/book.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book2.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book3.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book4.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book5.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book6.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 2000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
  ];
  listProduct2: any = [
    {
      imageURL: 'assets/images/book7.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book6.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book5.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book4.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book3.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
    {
      imageURL: 'assets/images/book2.jpg',
      name: 'identity theft',
      price: '50.000',
      rating: 4,
      sold: 1000,
      description:
        // eslint-disable-next-line max-len
        'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      artist: 'Thái Duy Linh',
      birthday: '20/09/2000',
    },
  ];
  listTypeBook: any = [
    {
      name: 'TextBook',
      icon: 'assets/icon/icon-event.svg',
      color: '#EE0000',
    },
    {
      name: 'Novel',
      icon: 'assets/icon/icon-event.svg',
      color: '#0066FF',
    },
    {
      name: 'Comic',
      icon: 'assets/icon/icon-event.svg',
      color: '#000011',
    },
    {
      name: 'Poem',
      icon: 'assets/icon/icon-event.svg',
      color: '#009900',
    },
    {
      name: 'Thriller',
      icon: 'assets/icon/icon-event.svg',
      color: '#330000',
    },
    {
      name: 'Short',
      icon: 'assets/icon/icon-event.svg',
      color: '#FF6600',
    },
  ];
  isClick: any = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.labelTypeBook = 'TextBook';
    this.listProduct = this.listProduct1;
    this.menuHeight = window.innerHeight;
    this.changeLoading();
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
        this.listProduct = this.listProduct1;
        break;
      case 'Novel':
        this.labelTypeBook = item.name;
        this.listProduct = this.listProduct2;
        break;
      case 'Comic':
        this.labelTypeBook = item.name;
        this.listProduct = this.listProduct1;
        break;
      case 'Poem':
        this.labelTypeBook = item.name;
        this.listProduct = this.listProduct2;
        break;
      case 'Thriller':
        this.labelTypeBook = item.name;
        this.listProduct = this.listProduct1;
        break;
      case 'Short':
        this.labelTypeBook = item.name;
        this.listProduct = this.listProduct2;
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

  changeLoading() {
    setTimeout(() => {
      this.loadingSkeleton = true;
    }, 1000);
  }
}
