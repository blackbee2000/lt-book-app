import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(
    private toastCtrl: ToastController
  ) {
  }

  async successToast(message) {
    const toast = await this.toastCtrl.create({
      color: 'success',
      duration: 3000,
      message,
    });
    await toast.present();
  }

  async errorToast(message) {
    const toast = await this.toastCtrl.create({
      color: 'danger',
      duration: 3000,
      message,
    });
    await toast.present();
  }

  async messageToast(message: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      duration: duration ? duration : 1000,
      message,
    });
    await toast.present();
  }
}
