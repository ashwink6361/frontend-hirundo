import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserChangePasswordService } from './user-change-password.service';

@Component({
  selector: 'app-user-change-passowrd',
  templateUrl: './user-change-passowrd.component.html',
  styleUrls: ['./user-change-passowrd.component.scss']
})
export class UserChangePassowrdComponent implements OnInit {
  // changePasswordForm: FormGroup;
  changePasswordData:any = {};
  changePasswordErrorMsg: string = '';
  changePasswordError: boolean = false;
  activeRequest: boolean = false;
  changePasswordSuccessMsg: string = '';
  changePasswordSuccess: boolean = false;

  constructor( private userChangePasswordService:UserChangePasswordService ) { }

  ngOnInit() {
    // this.createChangePasswordForm();
  }

  // private createChangePasswordForm() {
  //   this.changePasswordForm = new FormGroup({
  //     oldPassword: new FormControl('', Validators.required),
  //     newPassword: new FormControl('', Validators.required),
  //     confirmPassword: new FormControl('', Validators.required)
  //   });
  // }

  changePassword(data): void {
    // if (data.newPassword != data.confirmPassword) {
    // } else {
      // this.changePasswordData.password = data.password;
      console.log('this.changePasswordData',data);
      this.activeRequest = true;
      this.userChangePasswordService.changePassword(data).then(data => {
        console.log("After change Password", data);
        this.activeRequest = false;
        this.changePasswordSuccess = true;
        this.changePasswordSuccessMsg = data.message;
        setTimeout(() => {
          this.changePasswordSuccess = false;
          this.changePasswordSuccessMsg = '';
        }, 4000);
        // this.createChangePasswordForm();
      }).catch(error => {
        console.log("change Passwor error", error);
        this.changePasswordError = true;
        this.changePasswordErrorMsg = error;
        setTimeout(() => {
          this.changePasswordError = false;
          this.changePasswordErrorMsg = '';
        }, 4000);
        this.activeRequest = false;
      });
    // }
  }

}
