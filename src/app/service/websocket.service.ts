import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { AuthGuard } from '../shared/guard/auth.guard';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class WebsocketService {
    // Our socket connection
    private socket;
    public _orders: Array<any> = [];
    public _rooms: Array<any> = [];    
    constructor( private http: Http, private authGuard: AuthGuard ) {
        this.connect();
    }
    connect() {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        // this.socket = io('http://localhost:5051');
        this.socket = io('http://52.209.187.183:5051');
        if(this.socket.connected)
            console.log("Socket connection done ");
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.socket.on('neworder', (data) => {
            console.log("Received Order from Websocket Server", data);
            let userType = this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                this._orders.unshift(data);
            }
            else if (userType == 4) {
                for (let j = 0; j < data.item.length; j++) {
                    if (((data.item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(data.item[j].category)) > -1)) {
                        this._orders.unshift(data);
                        break;
                    }
                }
            }
        });
        this.socket.on('orderstatus', (data) => {
            console.log(data, 'order status');
            // if(data.by.id !== user._id) {
                for(var i=0; i<this._orders.length; i++) {
                    if(data.id === this._orders[i]._id) {
                        this._orders[i].status = data.status;
                        for(var j=0; j<this._orders[i].item.length; j++) {
                            if(data.order.itemId === this._orders[i].item[j].id._id) {
                                this._orders[i].item[j].status = data.order.status;
                            }
                        }
                    }
                }
            // }
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
    }

    public getOrders(): Promise<any> {
        let url = '/api/department/orders';
        let opts = {
            category : this.authGuard.getCurrentUser().category
        }
        return this.http.post(url,opts).toPromise()
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
        let url = '/api/department/orders/'+id;
        return this.http.put(url,opts).toPromise()
          .then(data => {
            return data.json();
          })
          .catch(error => {
            return error;
          });
    }
    public updateDeliveredOrder(id, opts): Promise<any> {
        let url = '/api/orderStep/'+id;
        return this.http.put(url,opts).toPromise()
          .then(data => {
            return data.json();
          })
          .catch(error => {
            return error;
          });
    }
    public updateWaiterOrder(id, opts): Promise<any> {
        let url = '/api/waiter/orders/'+id;
        return this.http.put(url,opts).toPromise()
          .then(data => {
            return data.json();
          })
          .catch(error => {
            return error;
          });
    }
}
