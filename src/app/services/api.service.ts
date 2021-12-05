/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const options = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
      },
    });
  }
  refreshToken(refreshToken): Observable<any> {
    return this.http.get(`${this.url}/token/refresh`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  //Book
  getBook(type): Observable<any> {
    return this.http.post(`${this.url}/book/GetByType`, type);
  }
  getBookById(id): Observable<any> {
    return this.http.get(`${this.url}/book/GetById?id=${id}`);
  }
  //Blog
  getBlog(): Observable<any> {
    return this.http.get(`${this.url}/blog/GetByQuery`);
  }
  getBlogById(id): Observable<any> {
    return this.http.get(`${this.url}/blog/GetById?id=${id}`);
  }
  createBook(token, body): Observable<any> {
    {
      return this.http.post(
        `${this.url}/book/Create`,
        {
          body: {
            body,
          },
        },
        {
          headers: new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${token}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
          }),
        }
      );
    }
  }
  updateBook(token, body, id): Observable<any> {
    return this.http.put(`${this.url}/book/Update?id=${id}`, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
  createBill(token, body): Observable<any> {
    return this.http.post(`${this.url}/bill/Create`, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
  createBillDetails(token, body): Observable<any> {
    return this.http.post(`${this.url}/bookinbill/CreateAllBook`, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
  findBillByIdUser(idUser): Observable<any> {
    return this.http.get(`${this.url}/bill/GetByIdUser?idUser=${idUser}`);
  }
  findBillDetailsByIdBill(token, idBill): Observable<any> {
    return this.http.get(
      `${this.url}/bookinbill/GetByIdBill?idBill=${idBill}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        }),
      }
    );
  }
  createAccount(body): Observable<any>{
    return this.http.post(`${this.url}/user/save`,body);
  }
}
