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
    public steps: Array<any> = [];
    public activetab: boolean[] = [];
    public stepdata: Array<any> = [];
    public orderId: Array<any> = [];    
    public times: Array<any> = []; 
    public showDeliveredButton: boolean = false;  
    // public times = {};          
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard) {
    }

    ngOnInit() {
        this.websocketService.getOrders().then(data => {
            this.orders = data;
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    this.orderId.push(this.orders[i]._id);
                    let step = [];
                    let time = [];
                    for (let j = 0; j < this.orders[i].item.length; j++) {
                        if (step.indexOf(this.orders[i].item[j].step) < 0) {
                            step.push(this.orders[i].item[j].step);
                        }
                        time.push(this.orders[i].item[j].id.preparationTime);
                    }
                    this.steps[this.orders[i]._id] = step;
                    this.times[this.orders[i]._id] = Math.max(...time);
                    // for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
                    // let time = {};
                    // let temp = [];                                                                
                    //     for (let l = 0; l < this.orders[i].item.length; l++) {
                    //         if(this.orders[i].item[l].step == this.steps[this.orders[i]._id][k]){
                    //             temp.push(this.orders[i].item[l].id.preparationTime);
                    //         }
                    //     }
                    //     console.log('temp',temp);
                    //     time[this.steps[this.orders[i]._id][k]] = Math.max(...temp);                        
                    //     console.log('time',time);                        
                    //     this.times[this.orders[i]._id] = time;                        
                    // }
                    // console.log('this.times',this.times);
                }
                // this.activetab[0] = true;
                if (this.orderId && this.orderId.length) {
                    for (let k = 0; k < this.orderId.length; k++) {
                        let temp = {
                            tab: 0,
                            step: ''
                        }
                        temp.tab = 0;
                        temp.step = this.steps[this.orderId[k]][0];
                        this.stepdata[this.orderId[k]] = temp;
                    }
                }
                // this.stepdata = {
                //     tab: 0,
                //     step: this.steps[this.orderId[0]][0]
                // }
            }
            this.loadingOrders = false;
        })
            .catch(error => {
                console.log('error', error);
            });
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

    public updateOrder(order, time, status) {
        console.log(time, 'order item time++++++');
        // var hours = Math.floor(time / 60);
        // var minutes = time % 60;
        // var Pretime = hours + ":" + minutes;
        // console.log(Pretime, 'Pretime');
        let seconds = time * 60;
        // let mlSeconds = seconds * 1000;
        console.log(seconds, 'seconds');
        // console.log(mlSeconds, 'mlSeconds');

        var elem = document.getElementById(order._id);
        var width = 0;
        var id = setInterval(frame, seconds);
        console.log(id, 'id time');
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                this.showDeliveredButton = false;
            } else {
                width++;
                elem.style.width = width + '%';
                this.showDeliveredButton = true;
            }
        }

        order.status = status;
        let items = [];
        for (let i = 0; i < order.item.length; i++) {
            for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (order.item[i].category == this.authGuard.getCurrentUser().category[k]) {
                    items.push(order.item[i].id._id)
                }
            }
        }
        let opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateOrder(order._id, opts).then(data => {
            console.log("updateOrder dept Order updated++++++++++++++++", data);
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
            console.log("updateItem dept item updated+++++++++++++", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

    selectedTab(step, tab, orderId) {
        // this.activetab[tab] = true;
        // for (let i = 0; i < this.activetab.length; i++) {
        //   if (i != tab) {
        //     this.activetab[i] = false;
        //   }
        // }
        // this.stepdata = {
        //   tab: tab,
        //   step: this.steps[orderId][tab]
        // }
        let temp = {
            tab: tab,
            step: step
        }
        this.stepdata[orderId] = temp;
    }

}
