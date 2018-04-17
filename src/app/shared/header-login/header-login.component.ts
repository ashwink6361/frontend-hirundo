import { Component, OnInit } from '@angular/core';
import { AppService} from '../../service/app.service';
import { DepartmentProfileService } from '../../hirundo/department/department-profile/department-profile.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {

  constructor(private appservice : AppService,private profileService: DepartmentProfileService) { }

  ngOnInit() {
  }
  sidebar(){
    this.appservice.sidebarToggle = !this.appservice.sidebarToggle;
    this.profileService.getCurrentUser().then(data => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
    }).catch(error => {
      console.log("error", error);
    });
  }

}
