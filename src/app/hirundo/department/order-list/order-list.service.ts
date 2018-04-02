import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
@Injectable()
export class OrderListService {
  orderList = [];
  constructor(private http: Http) { 
    let url = '/api/department/orders';
    this.http.get(url).toPromise()
      .then(data => {
        let res = data.json();
        console.log('res',res);
        this.orderList = res.data;
      })
      .catch(error => {
        this.orderList = [];
      });
  }

  setOrder(data) {
    console.log('data', data);
    this.orderList.push(data);
    console.log('this.orderList', this.orderList);
  }

  public extractData(res: Response) {
    let body = res.json();
    if (body.hasOwnProperty('error')) {
      if (body.error.message === 'Token is required') {
        this.logout();
      } else {
        return Promise.resolve(body || {});
      }
    } else {
      return Promise.resolve(body || {});
    }
  }

  private handleErrorPromise(error: Response | any) {
    let body = error.json();
    if (error.status === 400 || error.status === 401) {
      return Promise.reject(body.message || error);
    }
    else {
      this.logout();
    }
  }

  private logout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    document.cookie = "token=" + '';
    window.location.href = '/';
  }
}
