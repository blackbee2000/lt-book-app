import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private platform: Platform;
  imageResponse: any;
  options: any;
  constructor(platform: Platform) {
    this.platform = platform;
  }
  public async openCamera() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
    if (savedImageFile) {
      return savedImageFile;
    } else {
      return;
    }
  }

  public async openCameraLibrary() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
    if (savedImageFile) {
      return savedImageFile;
    } else {
      return;
    }
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });
    //in app
    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        base64Data,
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
        base64Data: await (await this.readAsBase64(cameraPhoto)).slice(23),
      };
    }
  }
  public async readAsBase64(cameraPhoto: CameraPhoto) {
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });
      return file.data;
    } else {
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  public async loadPhoto(photo) {
    // Retrieve cached photo array data
    // more to come...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: FilesystemDirectory.Data,
      });
      // Web platform only: Load the photo as base64 data
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
    // else{
    //   const readFile = await Filesystem.readFile({
    //     path: photo.filepath,
    //     directory: FilesystemDirectory.Data,
    //   });
    //   photo.webviewPath = `${readFile.data}`;
    // }
    return photo;
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
