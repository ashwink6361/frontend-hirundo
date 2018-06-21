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
        // this.socket = io(this.socketUrl, { 'transports': ['polling'] });
        console.log("this.socket ",this.socket);   
        console.log("this.socket.connected ",this.socket.connected);   
        if (this.socket.connected){
            console.log("Socket connection done ");
        }
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            this.socket.emit('connection');
            console.log('user', user);
            this.socket.on('connected', (data) => {
                console.log('connected', data);
                if (data && this.socket.id == data.socketId) {
                    this.socket.emit('userAuth', { userId: user._id });
                    this.socket.on('authConnected', (data) => {
                        console.log('authConnected', data);
                    });
                }
            });
        }   

        this.socket.on('neworderAdmin', (data) => {
            console.log('neworderAdmin',data); 
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                this._orders.unshift(data);
            }
        });     

        this.socket.on('neworder', (data) => {
            console.log('neworder',data); 
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 4) {
                this._orders.push(data);
            }
        });
        this.socket.on('orderstatus', (data) => {
            console.log('orderstatus',data);
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id == this._orders[i]._id) {
                    // var temp = _.cloneDeep(this._orders[i]);
                    // let userType = this.authGuard.getCurrentUser().userType;
                    // if (userType == 3) {
                    //     temp.step = data.step;
                    //     temp.item = data.orderData.item;
                    // }
                    // else if (userType == 4) {
                    //     let steps = [];
                    //     let sts = [];
                    //     if (temp && temp.item) {
                    //         for (let j = 0; j < temp.item.length; j++) {
                    //             for (let k = 0; k < data.step.length; k++) {
                    //                 if (((temp.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(temp.item[j].category)) > -1)) {
                    //                     if (temp.item[j].step == data.step[k].step) {
                    //                         if (sts.indexOf(data.step[k].step) < 0) {
                    //                             sts.push(data.step[k].step);
                    //                             steps.push(data.step[k]);
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }
                    //     temp.step = steps;
                    //     let itemsTemp = [];
                    //     if (data && data.orderData.item) {
                    //         for (let j = 0; j < data.orderData.item.length; j++) {
                    //             if (((data.orderData.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(data.orderData.item[j].category)) > -1)) {
                    //                 itemsTemp.push(data.orderData.item[j]);
                    //             }
                    //         }
                    //     }
                    //     temp.item = itemsTemp;
                    // }
                    // temp.stepStatus = data.stepStatus;
                    // temp.status = data.status;
                    // if (temp && temp.item) {
                    //     for (var j = 0; j < temp.item.length; j++) {
                    //         if (data.order.itemId === temp.item[j].id._id && data.order.step === temp.item[j].step) {
                    //             temp.item[j].status = data.order.status;
                    //         }

                    //     }
                    // }
                    this._orders[i] = data;
                    // let itemsToSplice = [];
                    // if (temp.item.length) {
                    //     for (var k = 0; k < temp.item.length; k++) {
                    //         itemsToSplice.push(temp.item[k].status);
                    //     }
                    // }
                    // if (temp.item.length && itemsToSplice.length == temp.item.length && itemsToSplice.every(this.isBelowThreshold)) {
                    //     this._orders.splice(i, 1);
                    // }
                    // if (temp.item.length == 0) {
                    //     this._orders.splice(i, 1);
                    // }
                }
            }
        });
        this.socket.on('tablestatus', (data) => {
            console.log('tablestatus',data);    
            if(this._rooms && this._rooms.length){
                for (var i = 0; i < this._rooms.length; i++) {
                    if (data.room._id == this._rooms[i]._id) {
                        for (var j = 0; j < this._rooms[i].tables.length; j++) {
                            if (data.table == this._rooms[i].tables[j]._id) {
                                this._rooms[i].tables[j].orderId.push(data);
                                break;
                            }
                        }
                    }
                }
            }                  
        });
        this.socket.on('changeStep', (data) => {
            console.log('changeStep',data);                                  
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                }
            }
        });
        this.socket.on('itemDeleted', (data) => {
            console.log('itemDeleted',data);                                              
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                }
            }
        });
        this.socket.on('itemUpdated', (data) => {
            console.log('itemUpdated',data);                                                          
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                    // var temp = _.cloneDeep(this._orders[i]);
                    // let userType = this.authGuard.getCurrentUser().userType;
                    // if (userType == 3) {
                    //     temp.step = data.step;
                    //     temp.item = data.item;
                    // }
                    // else if (userType == 4) {
                    //     let steps = [];
                    //     let sts = [];
                    //     if (temp && temp.item) {
                    //         for (let j = 0; j < temp.item.length; j++) {
                    //             for (let k = 0; k < data.step.length; k++) {
                    //                 if (((temp.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(temp.item[j].category)) > -1)) {
                    //                     if (temp.item[j].step == data.step[k].step) {
                    //                         if (sts.indexOf(data.step[k].step) < 0) {
                    //                             sts.push(data.step[k].step);
                    //                             steps.push(data.step[k]);
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }
                    //     temp.step = steps;
                    //     let itemsTemp = [];
                    //     if (data && data.item) {
                    //         for (let j = 0; j < data.item.length; j++) {
                    //             if (((data.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(data.item[j].category)) > -1)) {
                    //                 itemsTemp.push(data.item[j]);
                    //             }
                    //         }
                    //     }
                    //     temp.item = itemsTemp;
                    // }
                    // temp.stepStatus = data.stepStatus;
                    // temp.status = data.status;
                    // this._orders[i] = _.cloneDeep(temp);
                }
                // if (data._id === this._orders[i]._id) {
                //     this._orders[i] = data;
                // }
            }
        });
    };

    isBelowThreshold(currentValue) {
        return currentValue == 1;
    };

    public getOrders(): Promise<any> {
        let url = '/api/department/orders';
        let opts = {
            category: this.authGuard.getCurrentUser().category
        }
        return this.http.post(url, opts).toPromise()
            .then(data => {
                let res = data.json();
                this._orders = res.data;
                let orderid = [];
                for (var i = 0; i < this._orders.length; i++) {
                    let itemsToSplice = [];
                    if (this._orders[i].item.length) {
                        for (var k = 0; k < this._orders[i].item.length; k++) {
                            itemsToSplice.push(this._orders[i].item[k].status);
                        }
                    }
                    if (itemsToSplice.length == this._orders[i].item.length && itemsToSplice.every(this.isBelowThreshold)) {
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
                let orderid = [];
                for (var i = 0; i < this._orders.length; i++) {
                    if (res._id === this._orders[i]._id) {
                        let itemsToSplice = [];
                        if (res.item.length) {
                            for (var k = 0; k < res.item.length; k++) {
                                itemsToSplice.push(res.item[k].status);
                            }
                        }
                        if (itemsToSplice.length == res.item.length && itemsToSplice.every(this.isBelowThreshold)) {
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
    public updateDepartmentStatus(id, opts): Promise<any> {
        let url = '/api/department/status/' + id;
        return this.http.put(url, opts).toPromise()
            .then(data => {
                return data.json();
            })
            .catch(error => {
                return error;
            });
    }
}
