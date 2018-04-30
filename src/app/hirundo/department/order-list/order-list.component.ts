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
            // for(let i = 0; i<this.orders.length; i++){
            //     this.itemsStore = [];
            //     for(let j = 0; j<this.orders[i].item.length; j++){
            //         if(this.orders[i].item[j].category == this.authGuard.getCurrentUser().category){
            //             this.itemsStore.push(this.orders[i].item[j]);
            //         }
            //         this.orders[i].itemsStore = this.itemsStore;
            //     }
            // }  
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
        let items = [];
        for (let i = 0; i < order.item.length; i++) {
            for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (order.item[i].category == this.authGuard.getCurrentUser().category[k]) {
                    items.push(order.item[i].id._id)
                }
            }
            // if(order.item[i].category == this.authGuard.getCurrentUser().category){
            //     items.push(order.item[i].id._id)
            // }
        }
        let opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateOrder(order._id, opts).then(data => {
            console.log("dept Order updated", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

    public updateItem(item, order, status) {
        item.status = status;
        let items = [];
        items.push(item.id._id)
        let opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateOrder(order, opts).then(data => {
            console.log("dept item updated", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

}
