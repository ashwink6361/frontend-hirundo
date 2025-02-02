import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';
import { LoginService } from './login.service';
import { AppService } from '../../service/app.service';
import {Router} from "@angular/router";
// import 'player.js';

declare function playAudio(): void;
declare function stopAudio(): void;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    User: any = {};
    loginForm: FormGroup;
    loginError: boolean = false;
    loginErrorMsg: string = '';
    loginSuccessMsg: string = '';
    public bgGrey: boolean = false;
    requestRunning: boolean = false;
    constructor(

        public router : Router,
        public appService: AppService,
        private globalService: GlobalService,
        private loginService: LoginService,
    ) { 
    }

    ngOnInit() {
        this.createLoginForm();
    }
    private createLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }
    login(user): void {
        this.requestRunning = true;
        this.User.userName = user.email;
        this.User.password = user.password;
        this.User.deviceType = 'web';
        this.loginService.login(this.User).then(data => {            
            this.loginSuccessMsg = 'Login success!';
            document.cookie = "token=" + data.token;
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            localStorage.setItem('token', data.token);            
            setTimeout(() => {
                this.loginSuccessMsg = '';
                if (data.data.userType === 3) {
                    this.router.navigate(['/waiter']);
                    // window.location.href = '/waiter';
                } else {
                    document.body.style.backgroundColor = '#e9ecef';
                    this.router.navigate(['/department']);
                    // window.location.href = '/department';
                }
            }, 4000);
        }).catch(error => {
            this.requestRunning = false;
            this.loginErrorMsg = error;
            setTimeout(() => {
                this.loginErrorMsg = '';
            }, 4000);
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
        });
    }

}
