import { Component, OnInit } from '@angular/core';
import { UserChangePasswordService } from './user-change-password.service';

@Component({
  selector: 'app-user-change-passowrd',
  templateUrl: './user-change-passowrd.component.html',
  styleUrls: ['./user-change-passowrd.component.scss']
})
export class UserChangePassowrdComponent implements OnInit {
  changePasswordData:any = {};
  changePasswordErrorMsg: string = '';
  changePasswordError: boolean = false;
  activeRequest: boolean = false;
  changePasswordSuccessMsg: string = '';
  changePasswordSuccess: boolean = false;

  constructor( private userChangePasswordService:UserChangePasswordService ) { }

  ngOnInit() {
  }

  changePassword(data): void {
      this.activeRequest = true;
      this.userChangePasswordService.changePassword(data).then(data => {
        this.activeRequest = false;
        this.changePasswordSuccess = true;
        this.changePasswordSuccessMsg = data.message;
        setTimeout(() => {
          this.changePasswordSuccess = false;
          this.changePasswordSuccessMsg = '';
        }, 4000);
      }).catch(error => {
        this.changePasswordError = true;
        this.changePasswordErrorMsg = error;
        setTimeout(() => {
          this.changePasswordError = false;
          this.changePasswordErrorMsg = '';
        }, 4000);
        this.activeRequest = false;
      });
  }
}