import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { PdfViewerComponent } from '../components/pdf-viewer/pdf-viewer.component';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(
    private modalCtrl: ModalController,
    private previewAnyFile: PreviewAnyFile
  ) {}

  async getFileUrl(url) {
    try {
      const arr = url.split('?generation');
      return arr[0].replace('download/storage/v1/b/pmh-gcs/o', 'pmh-gcs');
    } catch (e) {
      return '';
    }
  }

  async viewPdf(url) {
    // fileUrl = `https://docs.google.com/viewer?url=${fileUrl}`;
    // await Browser.open({url: url});
    if (Capacitor.platform === 'ios') {
      await Browser.open({ url: url });
    } else {
      const modal = await this.modalCtrl.create({
        component: PdfViewerComponent,
        componentProps: {
          source: url,
        },
      });
      await modal.present();
    }
  }

  async viewDocument(url) {
    await this.previewAnyFile.previewPath(url);
  }

  async openBrowser(url) {
    await Browser.open({ url: url });
  }

  public formatNumberWithCommas(x) {
    return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  convertPhoneNumber84to0(phone) {
    let phoneConvert = phone.slice(2);
    phoneConvert = '0' + phoneConvert;
    return phoneConvert || '';
  }

  convertPhoneNumber0to84(phone) {
    let phoneConvert = phone.slice(1);
    phoneConvert = '84' + phoneConvert;
    return phoneConvert || '';
  }
}
