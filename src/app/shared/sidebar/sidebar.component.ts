import { Component, OnInit } from '@angular/core';
import { AppService} from '../../service/app.service';
import { AuthGuard } from '../guard/auth.guard';
import { DepartmentProfileService } from '../../hirundo/department/department-profile/department-profile.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public userType;
    
    constructor(public appService : AppService, private authGuard: AuthGuard,private profileService: DepartmentProfileService) { }

    ngOnInit() {
        this.profileService.getCurrentUser().then(data => {
            localStorage.setItem('currentUser', JSON.stringify(data.data));
          }).catch(error => {
            console.log("error", error);
          });
    }

    public hideSidebar() {
        this.appService.sidebarToggle = false;
    }
}
