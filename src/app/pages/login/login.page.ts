import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient
  ) {}
  ngOnInit() {
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
      await this.apiService
        .login(body.toString())
        .subscribe(async (response) => {
          this.authen = response;
          console.log(this.authen?.access_token);
          localStorage.setItem('token', JSON.stringify(response));
        });
      setTimeout(()=>{
        this.router.navigateByUrl('/account');
      },2000);
      return this.authen;
    } else {
      alert('Sai thông tin!');
    }
  }
}
