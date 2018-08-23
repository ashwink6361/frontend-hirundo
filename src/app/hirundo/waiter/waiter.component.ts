import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../shared/guard/auth.guard';
import {Router} from "@angular/router";
@Component({
    selector: 'app-waiter',
    template: `
    <app-header-login></app-header-login>
    <app-sidebar></app-sidebar>
    <div class="page-content">
    <router-outlet></router-outlet>
    </div>`,
})
export class WaiterComponent implements OnInit {
    private currentUser: any;
    constructor( private authGuard: AuthGuard, public router : Router ) { }

    ngOnInit() {
        if( this.authGuard.isLoggedIn() ) {
            this.currentUser = this.authGuard.getCurrentUser();
            if(this.currentUser.userType === 4) {
                this.router.navigate(['/department']);
                // window.location.href = '/department';
            }
        } else {
            this.router.navigate(['/']);
            // window.location.href = '/';
        }
    }

}
