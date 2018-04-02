import { Component, OnInit } from '@angular/core';
import { AppService} from '../../service/app.service';
import { AuthGuard } from '../guard/auth.guard';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public userType;
    
    constructor(public appService : AppService, private authGuard: AuthGuard) { }

    ngOnInit() {
        let data = this.authGuard.getCurrentUser();
        this.userType = data.userType;
    }

    public hideSidebar() {
        this.appService.sidebarToggle = false;
    }
}
