import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  menuHeight;
  wherePage = 'blog';
  loading: any = false;
  loadingSkeleton: any = false;
  listBlog: any = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.changeLoading();
    this.getBlog();
  }
  getBlog() {
    this.apiService.getBlog().subscribe((res) => {
      this.listBlog = res;
    });
  }
  goDetail(blog) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const navigationExtras: NavigationExtras = {
        state: { item: blog },
      };
      this.router.navigateByUrl('/blog/detail', navigationExtras);
    }, 1200);
  }

  changeLoading() {
    setTimeout(() => {
      this.loadingSkeleton = true;
    }, 1000);
  }
}
