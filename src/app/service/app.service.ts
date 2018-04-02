import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public sidebarToggle:boolean = false;
  constructor() { }
  
  private logout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    document.cookie = "token=" + '';
    window.location.href = '/';
  }
}
