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
        if (body.hasOwnProperty('error')) {
            if (body.error.message === 'Token is required') {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                document.cookie = "token=" + '';
            } else {
                return Promise.resolve(body || {});
            }
        } else {
            return Promise.resolve(body || {});
        }
    }

    public handleErrorPromise(error: Response | any) {
        let body = error.json();
        if (error.status === 400) {
            return Promise.reject(body.error || error);
        } else {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
        }
    }

    public setStepData(data: any) {
        localStorage.setItem('stepData', JSON.stringify(data));
    }

    public getStepData() {
        let data = localStorage.getItem('stepData');
        return JSON.parse(data);
    }
    public setTabData(data: any) {
        localStorage.setItem('tabData', JSON.stringify(data));        
    }
    public getTabData() {
        let data = localStorage.getItem('tabData');
        return JSON.parse(data);
    }
}
