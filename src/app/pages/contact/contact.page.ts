import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  menuHeight;
  wherePage = 'contact';
  formData: FormGroup;
  formMessage: any;
  formSubmitted = false;
  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastService
  ) {}

  ngOnInit() {
    this.menuHeight = window.innerHeight;
    this.formData = new FormGroup({
      fullName: new FormControl('', Validators.compose([Validators.required])),
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
      note: new FormControl('', Validators.compose([Validators.required])),
    });
    this.formMessage = {
      fullName: [
        {
          type: 'required',
          message: 'You must enter your FullName!',
        },
      ],
      note: [
        {
          type: 'required',
          message: 'You must enter your Note',
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
    };
  }
  sendContact() {
    this.formSubmitted = true;
    if (this.formData.valid) {
      this.formSubmitted = false;
      const data = this.formData.getRawValue();
      data.id = null;
      data.phone = '0' + data.phone;
      this.apiService.sendContact(data).subscribe(
        (res) => {
          this.formData.reset();
          this.toastCtrl.successToast('Contact send successfull!');
        },
        (err) => {
          this.toastCtrl.errorToast(err);
        }
      );
    }
  }
}
