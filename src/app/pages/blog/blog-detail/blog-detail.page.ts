import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
})
export class BlogDetailPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  blogDetail: any = {};
  loading: any = false;
  listBlogRelate: any = [
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
  constructor(private router: Router,
    private route: ActivatedRoute,
    private shareService: ShareService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const currentNavigation = this.router.getCurrentNavigation();
        const product = currentNavigation.extras.state.item;
        this.blogDetail = product;
      }
    });
  }

  async showBlogRelate(item) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.content.scrollToTop();
      this.blogDetail = item;
    }, 1000);
  }

  async share(url) {
    const params = {
      title: 'Điều diệu kỳ',
      text: 'Điều diệu kỳ',
      url: 'https://www.reader.com.vn/review-sach-dieu-ky-dieu-a517.html',
    };
    await this.shareService.share(params);
  }

}
