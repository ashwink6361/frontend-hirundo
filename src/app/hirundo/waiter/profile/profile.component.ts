import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  User: any = {};
  ProfileData: any;
  activeRequest: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  success: boolean = false;
  successMsg: string = '';
  constructor(private profileService: ProfileService, private authGuard: AuthGuard) { }

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
      lastName: new FormControl(this.ProfileData.lastName, Validators.required),
    });
  }

  updateProfile(user): void {
    this.activeRequest = true;
    this.User.firstName = user.firstName;
    this.User.lastName = user.lastName;
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
