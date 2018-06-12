import { Component, OnInit } from '@angular/core';
import { AppService} from '../../service/app.service';
import { DepartmentProfileService } from '../../hirundo/department/department-profile/department-profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {
  currentLan: string = 'it';
  constructor(private appservice : AppService,private profileService: DepartmentProfileService, private translate: TranslateService) { }

  ngOnInit() {
  }
  sidebar(){
    this.appservice.sidebarToggle = !this.appservice.sidebarToggle;
    this.profileService.getCurrentUser().then(data => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
    }).catch(error => {
    });
  }

  changeLang(language: string) {
    this.currentLan = language;
    this.translate.use(language);
  }

}
