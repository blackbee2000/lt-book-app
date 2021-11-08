import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

import { ApiService } from './api.service';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  constructor(
    private api: ApiService,
    private plt: Platform,
    private storage: StorageService,
    private toastCtrl: ToastService
  ) {
    this.plt.ready().then(async () => {
      await this.loadToken();
    });
  }

  async loadToken() {
    const token = await this.storage.getStorage('TOKEN');
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { username; password }): Observable<any> {
    return this.api.login(credentials).pipe(
      map((data: any) => {
        return data;
      }),
      switchMap(async (response) => {
        const { data, success } = response;
        if (success) {
          from(this.storage.setStorage('TOKEN', data.token));
        } else {
          from(this.storage.setStorage('TOKEN', null));
        }
        return response;
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  async logout(): Promise<void> {
    this.isAuthenticated.next(false);
    await this.storage.removeStorage('TOKEN');
  }
}
