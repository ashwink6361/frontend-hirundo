import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
    // Our socket connection
    private socket;
    public _orders: Array<any> = [];
    constructor( private http: Http ) {
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
        let url = '/api/department/orders';
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
