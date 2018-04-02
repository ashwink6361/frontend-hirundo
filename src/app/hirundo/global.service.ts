import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

@Injectable()
export class GlobalService {
    public room: {};
    constructor(private http: Http) {
    }

    public setLastHitUrl(url) {
        localStorage.setItem('lastHitUrl', url);
    }


    public setRoomData(room) {
        localStorage.setItem('roomdata', room);
    }

    public getRoomData(room) {
        return localStorage.getItem('roomdata');
    }

    public setTableData(table) {
        localStorage.setItem('tabledata', table);
    }

    public getTableData(table) {
        return localStorage.getItem('tabledata');
    }


    public getCartItemTotal() {
        return this.room;
    }

    public removeLastHitUrl() {
        localStorage.removeItem('lastHitUrl');
    }

    public getLastHitUrl() {
        let url = localStorage.getItem('lastHitUrl');
        return url ? url : false;
    }

    public extractData(res: Response) {
        let body = res.json();
        //console.log("Global Service called", body);
        if (body.hasOwnProperty('error')) {
            if (body.error.message === 'Token is required') {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                document.cookie = "token=" + '';
                // window.location.href = '/';
            } else {
                return Promise.resolve(body || {});
            }
        } else {
            return Promise.resolve(body || {});
        }
    }

    public handleErrorPromise(error: Response | any) {
        let body = error.json();
        console.log("Global Error Service called", error);
        if (error.status === 400) {
            return Promise.reject(body.error || error);
        } else {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
            // window.location.href = '/';
        }
    }
}
