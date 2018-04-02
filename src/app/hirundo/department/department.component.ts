import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../shared/guard/auth.guard';

@Component({
    selector: 'app-department',
    template: `
    <app-header-login></app-header-login>
    <app-sidebar></app-sidebar>
    <div class="page-content">
    <router-outlet></router-outlet>
    </div>`,
    styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
    private currentUser: any;
    constructor( private authGuard: AuthGuard ) { }

    ngOnInit() {
        if( this.authGuard.isLoggedIn() ) {
            this.currentUser = this.authGuard.getCurrentUser();
            if(this.currentUser.userType === 3) {
                window.location.href = '/waiter';
            }
        } else {
            window.location.href = '/';
        }
    }

}
