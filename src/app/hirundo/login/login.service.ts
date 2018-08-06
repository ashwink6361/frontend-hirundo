import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }
  login(user): Promise<any> {
    let url = "/login";
    return this.http.post(url, user).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
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
    if (error.status === 400 || error.status === 401 || error.status === 403) {
      return Promise.reject(body.message || error);
    } else {
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
