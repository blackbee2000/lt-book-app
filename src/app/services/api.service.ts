import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url = environment.apiUrl;
  // masterDataUrl = `https://res.cloudinary.com/twincloudinary/raw/upload/v${Math.round(
  //   new Date().getTime() / 1000
  // )}`;

  constructor(private http: HttpClient) {}

  // *** Master data ***//

}
