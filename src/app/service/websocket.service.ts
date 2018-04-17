import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { AuthGuard } from '../shared/guard/auth.guard';

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
        this.socket = io('http://localhost:5051');
        if(this.socket.connected)
            console.log("Socket connection done ");
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.socket.on('neworder', (data) => {
            console.log("Received Order from Websocket Server", data);
            this._orders.push(data);
        });
        this.socket.on('orderstatus', (data) => {
            if(data.by.id !== user._id) {
                for(var i=0; i<this._orders.length; i++) {
                    if(data.id === this._orders[i]._id) {
                        this._orders[i].status = data.status;
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
        let url = '/api/department/orders/'+this.authGuard.getCurrentUser()._id;
        this.http.get(url).toPromise()
            .then(data => {
                let res = data.json();
                this._orders = res.data;
            })
            .catch(error => {
                this._orders = [];
            });
    }

    public getOrders() {
        return this._orders;
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
        // console.log('this._rooms 1',this._rooms);        
        // return this._rooms;
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
}
