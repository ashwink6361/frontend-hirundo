import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentProfileService } from './department-profile.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';
@Component({
  selector: 'app-profile',
  templateUrl: './department-profile.component.html',
  styleUrls: ['./department-profile.component.scss']
})
export class DepartmentProfileComponent implements OnInit {
  profileForm: FormGroup;
  User: any = {};
  ProfileData: any;
  activeRequest: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  success: boolean = false;
  successMsg: string = '';
  constructor(private profileService: DepartmentProfileService, private authGuard: AuthGuard) { }

  ngOnInit() {
    this.ProfileData = this.authGuard.getCurrentUser();
    console.log('this.ProfileData', this.ProfileData);
    if (this.ProfileData) {
      this.createProfileForm();
    }
  }

  private createProfileForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.ProfileData.firstName, Validators.required),
    });
  }

  updateProfile(user): void {
    this.activeRequest = true;
    this.User.firstName = user.firstName;
    this.profileService.updateProfile(this.User).then(data => {
      this.activeRequest = false;
      this.ProfileData = data.data;
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      if (this.ProfileData) {
        this.createProfileForm();
      }
      this.success = true;
      this.successMsg = data.message;
      setTimeout(() => {
        this.success = false;
        this.successMsg = '';
      }, 4000);
    }).catch(error => {
      this.activeRequest = false;
      this.error = true;
      this.errorMsg = error;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
      }, 4000);
    });
  }

}
