import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.apiUrl;
  // eslint-disable-next-line @typescript-eslint/naming-convention

  constructor(private http: HttpClient) {}
  //api
  //Authen
  login(params): Observable<any> {
    return this.http.post(`${this.url}/login`, params, options);
  }
  getInfoUser(token): Observable<any> {
    return this.http.get(`${this.url}/user/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },
    });
  }
  refreshToken(refreshToken): Observable<any>{
    return this.http.get(`${this.url}/token/refresh`,{
      headers:{
        'Authorization': `Bearer ${refreshToken}`,
      }
    })
  }

  //Book
  getBook(type): Observable<any> {
    return this.http.post(`${this.url}/book/GetByType`,type);
  }
  getBookById(id): Observable<any> {
    return this.http.get(`${this.url}/book/GetById?id=${id}`);
  }
  //Blog
  getBlog(): Observable<any>{
    return this.http.get(`${this.url}/blog/GetByQuery`);
  }
  getBlogById(id): Observable<any> {
    return this.http.get(`${this.url}/blog/GetById?id=${id}`);
  }
}
