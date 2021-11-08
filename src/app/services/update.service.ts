import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {AlertController, Platform} from '@ionic/angular';
import {AppVersion} from '@ionic-native/app-version/ngx';

const {NativeMarket, Browser} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private plt: Platform,
  ) {
  }

  async checkForUpdate() {
    const versionNumber = await this.appVersion.getVersionNumber();
    // 1.2.0
    const splittedVersion = versionNumber.split('.');
  }

  async openAppstoreEntry() {
    if (this.plt.is('android')) {
      NativeMarket.openStoreListing({
        appId: 'com.example.app',
      });
    } else {
      await Browser.open({url: 'itms-apps://itunes.apple.com/app/id2382832832', windowName: '_blank'});
    }
  }

  async presentAlert() {
    const buttons = [];

    const alert = await this.alertCtrl.create({
      header: '',
      message: '',
      buttons,
      backdropDismiss: false,
    });

    await alert.present();

  }
}
