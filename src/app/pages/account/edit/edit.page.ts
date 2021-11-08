import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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
  constructor(private router: Router, private storage: StorageService) {}

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
          Validators.pattern(/^(03|05|07|08|09)+([0-9]{8})\b/g),
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
      if (this.isEdit === 'account') {
        this.infor = (await this.storage.getObject('AccountInformation')) || {};
      } else {
        const account = await this.storage.getObject('AccountInformation');
        this.infor = account.inforDelivery;
        this.contentNote = this.infor.note;
      }
    }
    console.log(this.infor);
    this.formData.patchValue(this.infor);
  }
  async save() {
    this.formSubmitted = true;
    if (this.formData.valid) {
      this.formSubmitted = false;
      const data = this.formData.getRawValue();
      data.avtUrl = './assets/images/avt.jpg';
      data.position = 'Member';
      data.inforDelivery = {
        name: 'Jack97',
        phone: '0153236523',
        address: '123456 5 trịu',
        note: 'J97 5 trịu',
      };
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      if (this.isEdit === 'account') {
        await this.storage.setObject('AccountInformation', data);
        const navigationExtras: NavigationExtras = {
          state: { isEdit: this.isEdit },
        };
        this.router.navigateByUrl('/account', navigationExtras);
      } else {
        data.note = this.contentNote;
        await this.storage.setObject('DeliveryInformation', data);
        const navigationExtras: NavigationExtras = {
          state: { isEdit: this.isEdit },
        };
        this.router.navigateByUrl('/account/payment', navigationExtras);
      }
    }
  }
}
