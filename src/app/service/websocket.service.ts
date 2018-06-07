import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { AuthGuard } from '../shared/guard/auth.guard';
import *  as _ from 'lodash';
@Injectable()
export class WebsocketService {
    // Our socket connection
    private socket;
    private socketUrl;
    public _orders: Array<any> = [];
    public _rooms: Array<any> = [];
    constructor(private http: Http, private authGuard: AuthGuard) {
        let url = '/server/env';
        this.http.get(url).toPromise()
            .then(data => {
                this.socketUrl = data.json().socketUrl;
                console.log(this.socketUrl);
                this.connect();
            })
            .catch(error => {
                console.log('connection scoket url not available')
            });
    }
    connect() {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        // this.socket = io('http://localhost:5051');
        this.socket = io(this.socketUrl);
        if (this.socket.connected)
            console.log("Socket connection done ");
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.socket.on('neworder', (data) => {
            console.log("Received Order from Websocket Server", data);
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                this._orders.push(data);
            }
            else if (userType == 4) {
                let steps = [];
                let sts = [];
                let isItemExist = false;
                for (let j = 0; j < data.item.length; j++) {
                    if (((data.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(data.item[j].category)) > -1)) {
                        isItemExist = true;
                        if (sts.indexOf(data.item[j].step) < 0) {
                            sts.push(data.item[j].step);
                            steps.push({
                                itemId: [],
                                step: data.item[j].step,
                                status: 0
                            });
                        }
                    }
                }
                if (isItemExist) {
                    data.step = steps;
                    this._orders.push(data);
                }
            }
        });
        this.socket.on('orderstatus', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data.id === this._orders[i]._id) {
                    var temp = _.cloneDeep(this._orders[i]);
                    let userType = this.authGuard.getCurrentUser().userType;
                    if (userType == 3) {
                        temp.step = data.step;
                    }
                    else if (userType == 4) {
                        let steps = [];
                        let sts = [];
                        if (temp && temp.item) {
                            for (let j = 0; j < temp.item.length; j++) {
                                for (let k = 0; k < data.step.length; k++) {
                                    if (((temp.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(temp.item[j].category)) > -1)) {
                                        if (temp.item[j].step == data.step[k].step) {
                                            if (sts.indexOf(data.step[k].step) < 0) {
                                                sts.push(data.step[k].step);
                                                steps.push(data.step[k]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        temp.step = steps;
                    }
                    temp.stepStatus = data.stepStatus;
                    temp.status = data.status;
                    if (temp && temp.item) {
                        for (var j = 0; j < temp.item.length; j++) {
                            if (data.order.itemId === temp.item[j].id._id && data.order.step === temp.item[j].step) {
                                temp.item[j].status = data.order.status;
                            }

                        }
                    }
                    let stepStatus = [];
                    for (let k in temp.step) {
                        if (temp.step[k].status == 1) {
                            stepStatus.push(temp.step[k].status);
                        }
                    }
                    this._orders[i] = _.cloneDeep(temp);
                    if (stepStatus.length == temp.step.length) {
                        this._orders.splice(i, 1);
                    }
                }
            }
        });
        this.socket.on('tablestatus', (data) => {
            for (var i = 0; i < this._rooms.length; i++) {
                if (data.room == this._rooms[i]._id) {
                    for (var j = 0; j < this._rooms[i].tables.length; j++) {
                        if (data.table == this._rooms[i].tables[j]._id) {
                            this._rooms[i].tables[j].status = data.status;
                            break;
                        }
                    }
                }
            }
        });
        this.socket.on('changeStep', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i].stepStatus = data.stepStatus;
                }
            }
        });
        this.socket.on('itemDeleted', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                }
            }
        });
        this.socket.on('itemUpdated', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                }
            }
        });
        this.socket.on('newItem', (data) => {
            var tempArray = [];
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    tempArray.push(this._orders[i]._id);
                    var temp = _.cloneDeep(this._orders[i]);
                    let userType = this.authGuard.getCurrentUser().userType;
                    if (userType == 3) {
                        temp.step = data.step;
                        temp.item = data.item;
                    }
                    else if (userType == 4) {
                        let steps = [];
                        let sts = [];
                        if (temp && temp.item) {
                            for (let j = 0; j < temp.item.length; j++) {
                                for (let k = 0; k < data.step.length; k++) {
                                    if (((temp.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(temp.item[j].category)) > -1)) {
                                        if (temp.item[j].step == data.step[k].step) {
                                            if (sts.indexOf(data.step[k].step) < 0) {
                                                sts.push(data.step[k].step);
                                                steps.push(data.step[k]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        temp.step = steps;
                        let itemsTemp = [];
                        if (data && data.item) {
                            for (let j = 0; j < data.item.length; j++) {
                                    if (((data.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(data.item[j].category)) > -1)) {
                                        itemsTemp.push(data.item[j]);
                                    }
                            }
                        }
                        temp.item = itemsTemp;
                    }
                    temp.stepStatus = data.stepStatus;
                    temp.status = data.status;

                    let stepStatus = [];
                    for (let k in temp.step) {
                        if (temp.step[k].status == 1) {
                            stepStatus.push(temp.step[k].status);
                        }
                    }
                    this._orders[i] = _.cloneDeep(temp);
                    if (stepStatus.length == temp.step.length) {
                        this._orders.splice(i, 1);
                    }
                }

            }
            if (tempArray.indexOf(data._id) < 0) {
                this._orders.push(data);
                for (var i = 0; i < this._orders.length; i++) {
                    if (data._id === this._orders[i]._id) {
                        var temp = _.cloneDeep(this._orders[i]);
                        let userType = this.authGuard.getCurrentUser().userType;
                        if (userType == 3) {
                            temp.step = data.step;
                        }
                        else if (userType == 4) {
                            let steps = [];
                            let sts = [];
                            if (temp && temp.item) {
                                for (let j = 0; j < temp.item.length; j++) {
                                    for (let k = 0; k < data.step.length; k++) {
                                        if (((temp.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(temp.item[j].category)) > -1)) {
                                            if (temp.item[j].step == data.step[k].step) {
                                                if (sts.indexOf(data.step[k].step) < 0) {
                                                    sts.push(data.step[k].step);
                                                    steps.push(data.step[k]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            temp.step = steps;
                        }
                        temp.stepStatus = data.stepStatus;
                        temp.status = data.status;
                        let stepStatus = [];
                        for (let k in temp.step) {
                            if (temp.step[k].status == 1) {
                                stepStatus.push(temp.step[k].status);
                            }
                        }
                        this._orders[i] = _.cloneDeep(temp);
                        if (stepStatus.length == temp.step.length) {
                            this._orders.splice(i, 1);
                        }
                    }
                }

            }
        });
    }

    public getOrders(): Promise<any> {
        let url = '/api/department/orders';
        let opts = {
            category: this.authGuard.getCurrentUser().category
        }
        return this.http.post(url, opts).toPromise()
            .then(data => {
                let res = data.json();
                this._orders = res.data;
                for (var i = 0; i < this._orders.length; i++) {
                    let stepStatus = [];
                    for (let k in this._orders[i].step) {
                        if (this._orders[i].step[k].status == 1) {
                            stepStatus.push(this._orders[i].step[k].status);
                        }
                    }
                    if (stepStatus.length == this._orders[i].step.length) {
                        this._orders.splice(i, 1);
                    }
                }

                return this._orders;
            })
            .catch(error => {
                this._orders = [];
                return error;
            });
    }
    public getWaiterOrders(): Promise<any> {
        let url = '/api/waiter/orders';
        return this.http.get(url).toPromise()
            .then(data => {
                let res = data.json();
                this._orders = res.data;
                return this._orders;
            })
            .catch(error => {
                this._orders = [];
                return error;
            });
    }
    public getRooms(): Promise<any> {
        let url1 = '/api/rooms';
        return this.http.get(url1).toPromise()
            .then(data => {
                let res = data.json();
                this._rooms = res.data;
                return this._rooms;
            })
            .catch(error => {
                this._rooms = [];
                return error;
            });
    }
    public updateOrder(id, opts): Promise<any> {
        let url = '/api/department/orders/' + id;
        return this.http.put(url, opts).toPromise()
            .then(data => {
                let res = data.json();
                for (var i = 0; i < this._orders.length; i++) {
                    if (res._id === this._orders[i]._id) {
                        let stepStatus = [];
                        for (let k in res.step) {
                            if (res.step[k].status == 1) {
                                stepStatus.push(res.step[k].status);
                            }
                        }
                        if (stepStatus.length == res.step.length) {
                            this._orders.splice(i, 1);
                        }
                    }
                }
                return data.json();
            })
            .catch(error => {
                return error;
            });
    }
    public updateDeliveredOrder(id, opts): Promise<any> {
        let url = '/api/orderStep/' + id;
        return this.http.put(url, opts).toPromise()
            .then(data => {
                return data.json();
            })
            .catch(error => {
                return error;
            });
    }
    public updateWaiterOrder(id, opts): Promise<any> {
        let url = '/api/waiter/orders/' + id;
        return this.http.put(url, opts).toPromise()
            .then(data => {
                return data.json();
            })
            .catch(error => {
                return error;
            });
    }
    public changeOrderStep(id, opts): Promise<any> {
        let url = '/api/orderStep/' + id;
        return this.http.put(url, opts).toPromise()
            .then(data => {
                return data.json();
            })
            .catch(error => {
                return error;
            });
    }
}
