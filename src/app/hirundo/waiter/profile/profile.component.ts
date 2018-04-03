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
  uploadPicRequest: boolean = false;
  picerror: boolean = false;
  picerrorMsg: string = '';
  picsuccess: boolean = false;
  picsuccessMsg: string = '';
  previewImage = '';
  public profilePic;
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

  public fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        var datauri = e.target.result.split(',')[1];
        var binary = atob(datauri);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        //Convert the binary format of image into image file object to upload
        this.profilePic = new File([new Uint8Array(array)], 'profile_pic.jpg', {
          type: 'image/jpg'
        });
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  public uploadProfilePic() {
    console.log('this.profilePic', this.profilePic);
    let opts = {
      picture: this.profilePic
    }
    this.uploadPicRequest = true;
    this.profileService.updateProfilePicture(opts).then(data => {
      console.log('data',data);
      this.uploadPicRequest = false;
      this.profilePic = '';
      this.success = true;
      this.successMsg = data.message;
      setTimeout(() => {
        this.picsuccess = false;
        this.picsuccessMsg = '';
      }, 4000);
    }).catch(error => {
      this.uploadPicRequest = false;
      this.error = true;
      this.errorMsg = error;
      setTimeout(() => {
        this.picerror = false;
        this.picerrorMsg = '';
      }, 4000);
    });
  }
}
