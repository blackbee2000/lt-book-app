import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { ApiService, ToastService } from 'src/app/services';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @Input() editAccountInfo: boolean;
  isEdit = 'account';
  infor: any = [];
  formData: FormGroup;
  formMessage: any;
  formSubmitted = false;
  contentNote = '';
  token;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    private apiService: ApiService,
    private toastCtrl: ToastService
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
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
      name: [
        {
          type: 'required',
          message: 'Tên là bắt buộc',
        },
      ],
      email: [
        {
          type: 'required',
          message: 'Email là bắt buộc',
        },
        {
          type: 'email',
          message: 'Email không đúng định dạng',
        },
      ],
      phone: [
        {
          type: 'required',
          message: 'Số điện thoại là bắt buộc',
        },
        {
          type: 'pattern',
          message: 'Số điện thoại không hợp lệ',
        },
      ],
      address: [
        {
          type: 'required',
          message: 'Địa chỉ là bắt buộc',
        },
      ],
    };
    if (this.router.getCurrentNavigation().extras.state) {
      const currentNavigation = this.router.getCurrentNavigation();
      this.isEdit = currentNavigation.extras.state.isEdit;
      this.infor = currentNavigation.extras.state.inForAccount;
      this.token = JSON.parse(localStorage.getItem('token'));
      // if (this.isEdit === 'account') {
      //   this.infor =  localStorage.getItem('infoAccount') || {};
      // } else {
      //   const infoDeli = localStorage.getItem(`infoDelivery-`);
      //   this.infor = infoDeli;
      //   this.contentNote = this.infor.note;
      // }
    }
    console.log(this.infor);
    this.formData.patchValue(this.infor);
  }
  async save() {
    this.formSubmitted = true;
    if (this.formData.valid) {
      this.formSubmitted = false;
      const data = this.formData.getRawValue();
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      if (this.isEdit === 'account') {
        await this.updateAccount(
          {
            name: data.name,
            username: this.infor.username,
            password: this.infor.password,
            phone: data.phone,
            status: this.infor.status,
            address: data.address,
            email: data.email,
            avtUrl: this.infor.avtUrl,
            roles: this.infor.roles,
          },
          this.token.access_token
        );
      } else {
        data.note = this.contentNote;
        localStorage.setItem(
          `infoDelivery-${data.phone}`,
          JSON.stringify({
            ...this.infor,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
          })
        );
        const animations: AnimationOptions = {
          animated: true,
          animationDirection: 'back',
        };
        await this.navCtrl.back(animations);
      }
    }
  }
  async updateAccount(body, token) {
    await this.apiService.updateAccount(body, token, this.infor.id).subscribe(
      (res) => {
        localStorage.setItem('infoAccount', JSON.stringify(res.data));
        this.toastCtrl.successToast('Update user Information Succesfull!');
        const animations: AnimationOptions = {
          animated: true,
          animationDirection: 'back',
        };
        this.navCtrl.back(animations);
      },
      (err) => {
        this.toastCtrl.errorToast('Cant update user infomation!');
        const animations: AnimationOptions = {
          animated: true,
          animationDirection: 'back',
        };
        this.navCtrl.back(animations);
      }
    );
  }
}
