import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserChangePasswordService {

  constructor(private http: Http) { }
  changePassword(data): Promise<any> {
    let url = '/api/user/change/password';
    return this.http.put(url, data).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
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
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      document.cookie = "token=" + '';
      window.location.href = '/';
    }
    else if (error.status === 400 || error.status === 403) {
      return Promise.reject(body.message || error);
    }
    else {
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      document.cookie = "token=" + '';
      window.location.href = '/';
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