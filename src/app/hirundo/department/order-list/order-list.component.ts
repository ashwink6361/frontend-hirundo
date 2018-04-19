import { Component, OnInit } from '@angular/core';
import { OrderByPipe } from '../../orderby';
import { OrderListService } from './order-list.service';
import { WebsocketService } from '../../../service/websocket.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements OnInit {
    public orders: Array<any> = [];
    public clock: any;
    public tick: any;
    public loadingOrders: boolean = true;
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard) {
        //websocketService.connect();
    }

    ngOnInit() {
        this.websocketService.getOrders().then(data => {
            this.orders = data;  
            this.loadingOrders = false;            
          })
            .catch(error => {
              console.log('error', error);
            });

        // setTimeout(()=>{
        //     this.orders = this.websocketService.getOrders();
        //     this.loadingOrders = false;
        //     //console.log('this.orders ', this.orders);
        // }, 5000);

        this.tick = setInterval(() => {
            this.clock = Date.now();
        }, 1000);
    }

    public getOrderStatus(status) {
        var str = 'In progress';
        switch (status) {
            case 0:
                str = 'New order'; break;
            case 1:
                str = 'Delivered'; break;
            case 2:
                str = 'Prepared'; break;
            case 3:
                str = 'Cancelled'; break;
            case 4:
                str = 'In progress'; break;
            default:
                break;
        }

        return str;
    };

    public updateOrder(order, status) {
        order.status = status;
        this.websocketService.updateOrder(order._id, { status: status }).then(data => {
            console.log("Order updated", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

}
