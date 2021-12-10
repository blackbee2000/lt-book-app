import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ApiService, ToastService } from 'src/app/services';
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
  listBlogRelate: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shareService: ShareService,
    private apiService: ApiService,
    private toastCtrl: ToastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const currentNavigation = this.router.getCurrentNavigation();
        const product = currentNavigation.extras.state.item;
        this.getBlogDetails(product.id);
        this.getBlogRelated(product.tags);
      }
    });
  }
  getBlogDetails(id) {
    this.apiService.getBlogById(id).subscribe((res) => {
      this.blogDetail = res.data;
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
  async getBlogRelated(type) {
    const param = {
      tags: type,
    };
    await this.apiService.getBlogRelated(param).subscribe(
      (res) => {
        this.listBlogRelate = res.data;
      },
      (err) => {
        this.toastCtrl.errorToast('can\'t get book related!');
      }
    );
  }
}
