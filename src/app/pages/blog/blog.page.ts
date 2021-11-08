import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  menuHeight;
  wherePage='blog';
  loading: any = false;
  loadingSkeleton: any = false;
  listBlog: any = [
    {
      imageUrl: 'assets/images/book.jpg',
      name: 'Hôm nay là thứ mấy?',
      content: 'Em không là nàng thơ, em là nàng kiểu lỡ bước',
      paragraph: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      day: 'Thu, 9 2021',
    },
    {
      imageUrl: 'assets/images/book2.jpg',
      name: 'Hôm nay là thứ mấy?',
      content: 'Em không là nàng thơ, em là nàng kiểu lỡ bước',
      paragraph: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      day: 'Thu, 9 2021',
    },
    {
      imageUrl: 'assets/images/book3.jpg',
      name: 'Hôm nay là thứ mấy?',
      content: 'Em không là nàng thơ, em là nàng kiểu lỡ bước',
      paragraph: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      day: 'Thu, 9 2021',
    },
    {
      imageUrl: 'assets/images/book2.jpg',
      name: 'Hôm nay là thứ mấy?',
      content: 'Em không là nàng thơ, em là nàng kiểu lỡ bước',
      paragraph: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      day: 'Thu, 9 2021',
    },
    {
      imageUrl: 'assets/images/book3.jpg',
      name: 'Hôm nay là thứ mấy?',
      content: 'Em không là nàng thơ, em là nàng kiểu lỡ bước',
      paragraph: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      day: 'Thu, 9 2021',
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.changeLoading();
  }

  goDetail(blog){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const navigationExtras: NavigationExtras = {
        state: { item: blog },
      };
      this.router.navigateByUrl('/blog/detail', navigationExtras);
    }, 1200);
  }

  changeLoading(){
    setTimeout(() => {
      this.loadingSkeleton = true;
    }, 1000);
  }
}
