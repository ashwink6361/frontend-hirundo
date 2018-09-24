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
        this.orderList = res.data;
      })
      .catch(error => {
        this.orderList = [];
      });
  }

  setOrder(data) {
    this.orderList.push(data);
  }

  public extractData(res: Response) {
    let body = res.json();
    if(body.statusCode == 401){
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      document.cookie = "token=" + '';
      window.location.href = '/';   
    }
    if (body.hasOwnProperty('error')) {
      if (body.error.message === 'Token is required') {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
      } else {
        return Promise.resolve(body || {});
      }
    } else {
      return Promise.resolve(body || {});
    }
  }

  private handleErrorPromise(error: Response | any) {
    let body = error.json();
    if (error.status === 401) {
      this.logout();
    }
    else if (error.status === 400 || error.status === 403) {
      return Promise.reject(body.message || error);
    }
    else {
      return Promise.reject(body.message || error);
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
