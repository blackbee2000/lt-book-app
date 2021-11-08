import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private updateProfile = new BehaviorSubject(false);

  constructor(
    private api: ApiService,
    private storage: StorageService,
  ) {
  }

  async eventUpdateProfile() {
    this.updateProfile.next(true);
  }

  getUpdateProfile(): Observable<boolean> {
    return this.updateProfile.asObservable();
  }
}
