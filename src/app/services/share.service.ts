import {Injectable} from '@angular/core';
// import {Plugins} from '@capacitor/core';
import { Share } from '@capacitor/share';
// const {Share} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() {
  }

  async share(params) {
    await Share.share({
      title: params.title || '',
      text: params.text || '',
      url: params.url || '',
      dialogTitle: params.dialogTitle || '',
    });
  }
}
