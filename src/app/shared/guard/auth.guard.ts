import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }

    public isLoggedIn(): boolean {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        } else {
            return false;
        }
    }

    public getCurrentUser(): any {
        if(localStorage.getItem('currentUser')){
            return JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    public getCurrentUserId(): number {
        if(localStorage.getItem('currentUser')){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return user._id;
        }
    }
}
