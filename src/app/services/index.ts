export * from './api.service';
export * from './authentication.service';
export * from './event.service';
export * from './fcm.service';
export * from './loading.service';
export * from './toast.service';
export * from './storage.service';
export * from './download.service';
export * from './share.service';
export * from './helper.service';
export * from './photo.service';

import { ApiService } from './api.service';
import { EventService } from './event.service';
import { FcmService } from './fcm.service';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { StorageService } from './storage.service';
import { DownloadService } from './download.service';
import { ShareService } from './share.service';
import { HelperService } from './helper.service';
import { PhotoService } from './photo.service';

export const ServiceList = [
  ApiService,
  EventService,
  FcmService,
  LoadingService,
  ToastService,
  StorageService,
  DownloadService,
  ShareService,
  HelperService,
  PhotoService,
];
