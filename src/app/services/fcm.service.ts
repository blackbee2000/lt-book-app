import {Injectable} from '@angular/core';
import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  LocalNotificationActionPerformed,
  DeviceInfo,
} from '@capacitor/core';
import {ModalController} from '@ionic/angular';
import {AuthenticationService} from './authentication.service';
import {ApiService} from './api.service';
import {StorageService} from './storage.service';

const {Device, LocalNotifications, PushNotifications} = Plugins;

@Injectable({
  providedIn: 'root',
})
export class FcmService {

  constructor(
    private api: ApiService,
    private authService: AuthenticationService,
    private modalCtrl: ModalController,
    private storage: StorageService,
  ) {
  }

  public initFCM() {
    if (Capacitor.isNative) {
      this.registerFCM();
      this.handleLocalNotification();
    }
  }

  private registerFCM() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNs/FCM
        PushNotifications.register().then();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      async (token: PushNotificationToken) => {
        await this.storage.setStorage('FIREBASE_TOKEN', token.value);
        const user = await this.storage.getStorage('TOKEN');
        if (user) {
          const deviceInfo = <DeviceInfo> await Device.getInfo();
          const params = {
            deviceId: deviceInfo.uuid,
            tokenFirebase: token.value
          };
          // this.api.updateFirebaseToken(params).subscribe(() => {
          // }, () => {
          // });
        }
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration:', JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotification) => {
        const data = notification.data;
        if (Capacitor.platform === 'android') {
          await this.scheduleLocalNotification(notification);
        }
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
      }
    );
  }

  async scheduleLocalNotification(data) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: data.title,
          body: data.body,
          id: Date.now(),
          schedule: {at: new Date(Date.now() + 1000 * 5)},
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: {
            data: data.data,
          },
        }
      ]
    });
  }

  handleLocalNotification() {
    LocalNotifications.addListener('localNotificationActionPerformed',
      async (notification: LocalNotificationActionPerformed) => {
        const data = notification.notification.extra.data;
      }
    );
  }
}
