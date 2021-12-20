import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ToastService } from 'src/app/services';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import '@codetrix-studio/capacitor-google-auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  menuHeight;
  formData: FormGroup;
  formMessage: any;
  formSubmitted = false;
  authen;
  listCart = [];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient,
    private location: Location,
    public navCtrl: NavController,
    private toastCtrl: ToastService
  ) {}
  ngOnInit() {
    GoogleAuth.init();
    this.menuHeight = window.innerHeight;
    this.formData = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
    this.formMessage = {
      username: [
        {
          type: 'required',
          message: 'Tên đăng nhập là bắt buộc',
        },
      ],
      password: [
        {
          type: 'required',
          message: 'Mật khẩu là bắt buộc',
        },
      ],
    };
  }
  signIn() {
    console.log('login');
    this.router.navigateByUrl('/signin');
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async login(): Promise<Observable<object>> {
    this.formSubmitted = true;
    if (this.formData.valid) {
      this.formSubmitted = false;
      const data = this.formData.getRawValue();
      const body = new URLSearchParams();
      body.set('username', data.username);
      body.set('password', data.password);
      console.log(data);
      await this.apiService.login(body.toString()).subscribe(
        async (response) => {
          this.authen = response;
          localStorage.setItem('token', JSON.stringify(response));
          this.toastCtrl.successToast('Login Success!');
          await this.apiService.getInfoUser(this.authen.access_token).subscribe(
            async (res) => {
              localStorage.setItem('infoAccount', JSON.stringify(res.data));
              const checkCart = localStorage.getItem(res.data.phone);
              if (checkCart === null) {
                await localStorage.setItem(
                  res.data.phone,
                  JSON.stringify(this.listCart)
                );
              }
              const animations: AnimationOptions = {
                animated: true,
                animationDirection: 'back',
              };
              this.navCtrl.back(animations);
            },
            (error) => {
              this.toastCtrl.errorToast('Can`t get information Account!');
            }
          );
        },
        (error) => {
          if (error.status === 403) {
            this.toastCtrl.errorToast('Wrong login information!');
          }
        }
      );
      return this.authen;
    } else {
      alert('Sai thông tin!');
    }
  }
  async loginGoogle() {
    const ggUser = await GoogleAuth.signIn();
    console.log('user:', ggUser);
    await this.formData.patchValue({
      ...ggUser,
      username: ggUser.email,
      password: ggUser.id,
    });
    await this.login();
  }
}
