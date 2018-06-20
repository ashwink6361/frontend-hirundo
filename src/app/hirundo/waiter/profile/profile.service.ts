import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService {

  private apiUrl;
  constructor(private http: Http) {
    let url = '/server/env';
    this.http.get(url).toPromise()
        .then(data => {
            this.apiUrl = data.json().apiUrl;
        })
        .catch(error => {
            console.log('connection scoket url not available')
        });
}

  updateProfile(opts): Promise<any> {
    let url = "api/user";
    return this.http.put(url, opts).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getCurrentUser(): Promise<any> {
    let url = "api/user";
    return this.http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  updateProfilePicture(opts): Promise<any> {
    let url = "api/user/picture/upload";
    var fd = new FormData();
    for (var key in opts) {
      fd.append(key, opts[key]);
    }
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('privatekey', 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + url, fd, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
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
