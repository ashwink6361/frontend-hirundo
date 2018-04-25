import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public orders: Array<any> = [];
  public loadingOrders: boolean = true;
  constructor( public websocketService: WebsocketService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.websocketService.getWaiterOrders().then(data => {
      this.orders = data;
      this.loadingOrders = false;
    })
      .catch(error => {
        console.log('error', error);
      });
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
            items.push(order.item[i].id._id)
        }
        let opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateWaiterOrder(order._id, opts).then(data => {
            console.log("waiter Order updated", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

}
