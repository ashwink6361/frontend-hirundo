import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentProfileService } from './department-profile.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';
@Component({
  selector: 'app-profile',
  templateUrl: './department-profile.component.html',
  styleUrls: ['./department-profile.component.scss']
})
export class DepartmentProfileComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: any;
  profileForm: FormGroup;
  User: any = {};
  ProfileData: any;
  activeRequest: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  success: boolean = false;
  successMsg: string = '';
  uploadPicRequest: boolean = false;
  previewImage = '';
  public profilePic;
  constructor(private profileService: DepartmentProfileService, private authGuard: AuthGuard) { }

  ngOnInit() {
    this.profileService.getCurrentUser().then(data => {
      this.ProfileData = data.data;
      if (this.ProfileData) {
        this.createProfileForm();
      }
    }).catch(error => {
    });
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
      window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
      this.activeRequest = false;
      this.error = true;
      this.errorMsg = error;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
      }, 4000);
    });
  }

  public uploadProfilePic() {
    let opts = {
      picture: this.profilePic
    }
    this.uploadPicRequest = true;
    this.profileService.updateProfilePicture(opts).then(data => {
      window.scrollTo(0, 0);
      this.uploadPicRequest = false;
      localStorage.setItem('currentUser', JSON.stringify(data.data));      
      this.profilePic = '';
      this.myInputVariable.nativeElement.value = "";
      this.success = true;
      this.successMsg = data.message;
      setTimeout(() => {
        this.success = false;
        this.successMsg = '';
      }, 4000);
    }).catch(error => {
      window.scrollTo(0, 0);
      this.uploadPicRequest = false;
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
}
