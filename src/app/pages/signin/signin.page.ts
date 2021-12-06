import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  menuHeight;
  formData: FormGroup;
  formMessage: any;
  formSubmitted = false;
  authen: any = {};
  listCart = [];
  constructor(private apiService: ApiService,private router: Router,) {}

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.formData = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
          ),
        ])
      ),
      address: new FormControl('', Validators.compose([Validators.required])),
    });
    this.formMessage = {
      username: [
        {
          type: 'required',
          message: 'Username is required!',
        },
      ],
      password: [
        {
          type: 'required',
          message: 'Password is required!',
        },
      ],
      name: [
        {
          type: 'required',
          message: 'Name is required!',
        },
      ],
      email: [
        {
          type: 'required',
          message: 'Email is required!',
        },
        {
          type: 'email',
          message: 'Email invalidate!',
        },
      ],
      phone: [
        {
          type: 'required',
          message: 'Phone is required!',
        },
        {
          type: 'pattern',
          message: 'Phone invalidate!',
        },
      ],
      address: [
        {
          type: 'required',
          message: 'Address is required',
        },
      ],
    };
  }
  async create() {
    this.formSubmitted = true;
    if (this.formData.valid) {
      this.formSubmitted = false;
      const data = this.formData.getRawValue();
      data.roles = [
        {
          id: 5,
          name: 'ROLE_USER',
        },
      ];
      data.phone = '0' + data.phone;
      data.status = 'active';
      data.avtUrl = null;
      data.id = null;
      console.log('data', data);
      await this.apiService.createAccount(data).subscribe(async (res) => {
        const body = new URLSearchParams();
        body.set('username', data.username);
        body.set('password', data.password);
        await this.apiService.login(body).subscribe(async (response) => {
          this.authen = response;
          localStorage.setItem('token', JSON.stringify(response));
          await this.apiService
            .getInfoUser(this.authen.access_token)
            .subscribe(async (respo) => {
              localStorage.setItem('infoAccount', JSON.stringify(respo.data));
              const checkCart = localStorage.getItem(respo.data.phone);
              if (checkCart === null) {
                await localStorage.setItem(
                  respo.data.phone,
                  JSON.stringify(this.listCart)
                );
                await this.router.navigateByUrl('/account');
              }
            });
        });
      });
    }
  }
}
