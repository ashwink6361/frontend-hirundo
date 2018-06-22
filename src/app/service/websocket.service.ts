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
        if (this.socket.connected){
            console.log("Socket connection done ");
        }
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            this.socket.emit('connection');
            this.socket.on('connected', (data) => {
                if (data && this.socket.id == data.socketId) {
                    this.socket.emit('userAuth', { userId: user._id });
                    this.socket.on('authConnected', (data) => {
                    });
                }
            });
        };   

        this.socket.on('neworderAdmin', (data) => {
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                this._orders.unshift(data);
            }
        });     

        this.socket.on('neworder', (data) => {
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 4) {
                this._orders.push(data);
            }
        });
        this.socket.on('orderstatus', (data) => {
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                for (var i = 0; i < this._orders.length; i++) {
                    if (data._id == this._orders[i]._id) {
                        this._orders[i] = _.cloneDeep(data);
                        let itemsToSplice = [];
                        if (data.item.length) {
                            for (var k = 0; k < data.item.length; k++) {
                                itemsToSplice.push(data.item[k].status);
                            }
                        }
                        if (data.item.length && itemsToSplice.length == data.item.length && itemsToSplice.every(this.isBelowThreshold)) {
                            this._orders.splice(i, 1);
                        }
                    }
                }
            }
        });
        this.socket.on('orderstatusDept', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id == this._orders[i]._id) {
                    this._orders[i] = _.cloneDeep(data);
                    let itemsToSplice = [];
                    if (data.item.length) {
                        for (var k = 0; k < data.item.length; k++) {
                            itemsToSplice.push(data.item[k].status);
                        }
                    }
                    if (data.item.length && itemsToSplice.length == data.item.length && itemsToSplice.every(this.isBelowThreshold)) {
                        this._orders.splice(i, 1);
                    }
                }
            }
        });
        this.socket.on('tablestatus', (data) => {
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
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
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
        this.socket.on('itemDeletedW', (data) => {
            console.log('itemDeletedW', data);
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                for (var i = 0; i < this._orders.length; i++) {
                    if (data._id === this._orders[i]._id) {
                        this._orders[i] = data;
                    }
                }
            }
        });
        this.socket.on('itemUpdatedW', (data) => {
            console.log('itemUpdatedW', data);
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                for (var i = 0; i < this._orders.length; i++) {
                    if (data._id === this._orders[i]._id) {
                        this._orders[i] = data;
                    }
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
        this.socket.on('checkouttable', (data) => {
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                if(this._rooms && this._rooms.length){
                    for (var i = 0; i < this._rooms.length; i++) {
                        if (data.roomId == this._rooms[i]._id) {
                            for (var j = 0; j < this._rooms[i].tables.length; j++) {
                                if (data.tableId == this._rooms[i].tables[j]._id) {
                                    this._rooms[i].tables[j].orderId = [];
                                    break;
                                }
                            }
                        }
                    }
                }
                if (this._orders && this._orders.length) {
                    for (var i = 0; i < data.orderId.length; i++) {
                        for (var j = 0; j < this._orders.length; j++) {
                            if (data.orderId[i] == this._orders[j]._id) {
                                this._orders.splice(j, 1);
                            }
                        }                        
                    }  
                } 
            }  
        });

        this.socket.on('checkouttableD', (data) => {
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 4) {
                if (this._orders && this._orders.length) {
                    for (var i = 0; i < data.orderId.length; i++) {
                        for (var j = 0; j < this._orders.length; j++) {
                            if (data.orderId[i] == this._orders[j]._id) {
                                this._orders.splice(j, 1);
                            }
                        }                        
                    }  
                }  
            }
        });

        this.socket.on('checklist', (data) => {
            for (var i = 0; i < this._orders.length; i++) {
                if (data._id === this._orders[i]._id) {
                    this._orders[i] = data;
                }
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
                    if (res.data._id === this._orders[i]._id) {
                        let itemsToSplice = [];
                        if (res.data.item.length) {
                            for (var k = 0; k < res.data.item.length; k++) {
                                itemsToSplice.push(res.data.item[k].status);
                            }
                        }
                        if (itemsToSplice.length == res.data.item.length && itemsToSplice.every(this.isBelowThreshold)) {
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
