import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ApiService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  productDetail: any = {};
  loading: any = false;
  popup: any = false;
  popupLogin: any = false;
  shadow: any = false;
  isLogin: any = false;
  nameCart;
  listCart = [];
  infoAccount;
  getAllComment: any;
  listComment = [];
  postComment = '';
  public slideOpts = {
    slidesPerView: 2.1,
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 30,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(
          `${swiper.params.containerModifierClass}coverflow`
        );
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth,
          height: swiperHeight,
          slides,
          $wrapperEl,
          slidesSizesGrid,
          $,
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal
          ? -transform$$1 + swiperWidth / 2
          : -transform$$1 + swiperHeight / 2;
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier =
            ((center - slideOffset - slideSize / 2) / slideSize) *
            params.modifier;
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
          let translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
          let translateX = isHorizontal ? params.stretch * offsetMultiplier : 0;
          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) {
            translateX = 0;
          }
          if (Math.abs(translateY) < 0.001) {
            translateY = 0;
          }
          if (Math.abs(translateZ) < 0.001) {
            translateZ = 0;
          }
          if (Math.abs(rotateY) < 0.001) {
            rotateY = 0;
          }
          if (Math.abs(rotateX) < 0.001) {
            rotateX = 0;
          }
          // eslint-disable-next-line max-len
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex =
            -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal
              ? $slideEl.find('.swiper-slide-shadow-left')
              : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal
              ? $slideEl.find('.swiper-slide-shadow-right')
              : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'left' : 'top'
                }"></div>`
              );
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'right' : 'bottom'
                }"></div>`
              );
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) {
              $shadowBeforeEl[0].style.opacity =
                offsetMultiplier > 0 ? offsetMultiplier : 0;
            }
            if ($shadowAfterEl.length) {
              $shadowAfterEl[0].style.opacity =
                -offsetMultiplier > 0 ? -offsetMultiplier : 0;
            }
          }
        }

        // Set correct perspective for IE10
        if (
          swiper.support.pointerEvents ||
          swiper.support.prefixedPointerEvents
        ) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          )
          .transition(duration);
      },
    },
  };
  listProductRelate: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastCtrl: ToastService
  ) {}
  checkProductInCart(product) {
    const check = this.listCart.filter((o) => o.id === product.id);
    if (check.length === 0) {
      this.listCart.push({ ...product, numBuy: 1 });
      //set new Product in Cart
      localStorage.setItem(this.nameCart, JSON.stringify(this.listCart));
    }
  }
  getLocalCart() {
    const infoAccount = localStorage.getItem('infoAccount') || null;
    const getCartLocal = JSON.parse(infoAccount);
    this.listCart = JSON.parse(localStorage.getItem(getCartLocal.phone));
    this.nameCart = getCartLocal.phone;
    console.log('Cart', this.listCart);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const currentNavigation = this.router.getCurrentNavigation();
        const product = currentNavigation.extras.state.item;
        this.getBookDetails(product?.id);
        const login = localStorage.getItem('infoAccount') || null;
        this.infoAccount = JSON.parse(login);
        if (login !== null) {
          this.isLogin = true;
          this.getLocalCart();
        } else {
          this.isLogin = false;
        }
        this.getBookRelated({ type: product?.type });
        this.getComment({ idBook: product?.id });
      }
    });
  }
  async getBookDetails(id) {
    await this.apiService.getBookById(id).subscribe((res) => {
      this.productDetail = res.data;
    });
  }
  async getBookRelated(type) {
    await this.apiService.getBook(type).subscribe((res) => {
      this.listProductRelate = res.data;
    });
  }
  async getComment(body) {
    await this.apiService.getComment(body).subscribe((res) => {
      this.getAllComment = res.data;
      this.listComment = this.getAllComment.filter(
        (comment) => comment.level === 0
      );
      this.listComment.forEach((comment) => {
        comment.child = [];
      });

      this.getAllComment.forEach((child) => {
        if (child.level === 1) {
          this.listComment.forEach((comment) => {
            const idParent = child.idParent;
            const id = comment.id.toString();
            if (idParent === id) {
              comment.child.push(child);
            }
          });
        }
      });
      console.log(this.listComment);
    });
  }

  async handleProductRelate(item) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.content.scrollToTop();
      this.productDetail = item;
    }, 1000);
  }

  handleBuyProduct() {
    this.shadow = true;
    if (this.isLogin === true) {
      this.popup = true;
    } else {
      this.popupLogin = true;
    }
  }

  handleControlButton(type) {
    switch (type) {
      case 'cancel':
        this.shadow = false;
        this.popup = false;
        break;
      case 'ok':
        this.shadow = false;
        this.popup = false;
        this.loading = true;
        this.loading = false;
        this.checkProductInCart(this.productDetail);
        console.log(this.listCart);
        // this.router.navigateByUrl('/product');
        break;
      case 'login':
        this.shadow = false;
        this.loading = true;
        this.popupLogin = false;
        setTimeout(() => {
          this.loading = false;
          this.router.navigateByUrl('/login');
        }, 1000);
    }
  }
  sendComment() {
    const param = {
      avtUser: this.infoAccount.avtUrl,
      content: this.postComment,
      id: null,
      idBook: this.productDetail.id,
      idParent: null,
      level: 0,
      nameUser: this.infoAccount.name,
    };
    console.log(param);
    this.apiService.sendComment(param).subscribe(
      (res) => {
        this.toastCtrl.successToast('Send Comment Successful!');
        this.getComment({ idBook: this.productDetail.id });
        this.postComment='';
      },
      (err) => {
        this.toastCtrl.errorToast(err);
      }
    );
  }
}
