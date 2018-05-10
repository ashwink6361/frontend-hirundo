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
    public showDeliveredButton: Array<any> = []; 
    public showToCall: Array<any> = []; 
    public remainingTime: Array<any> = [];    
    // public remainingTime: Array<any> = ['0:00'];
    // public showDeliveredButton: boolean[] = [false]; 
    // public showToCall: boolean[] = [false];     
    // public times = {};          
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard) {
    }

    ngOnInit() {
        this.websocketService.getOrders().then(data => {
            this.orders = data;
            console.log(this.orders, 'orderlist pagfe')
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    this.orderId.push(this.orders[i]._id);
                    let step = [];
                    // let time = [];
                    for (let j = 0; j < this.orders[i].item.length; j++) {
                        if (step.indexOf(this.orders[i].item[j].step) < 0) {
                            step.push(this.orders[i].item[j].step);
                        }
                        // time.push(this.orders[i].item[j].id.preparationTime);
                    }
                    this.steps[this.orders[i]._id] = step;
                    // this.times[this.orders[i]._id] = Math.max(...time);
                    let time = {}; 
                    let delivered = {};                                                                        
                    let call = {};                                                                        
                    let remtime = {};                                                                        
                                                                                           
                    for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
                    let temp = [];                          
                        for (let l = 0; l < this.orders[i].item.length; l++) {
                            if(this.orders[i].item[l].step == this.steps[this.orders[i]._id][k] && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0){
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        console.log('temp',temp);
                        time[this.steps[this.orders[i]._id][k]] = Math.max(...temp);   
                        delivered[this.steps[this.orders[i]._id][k]] = false;                        
                        call[this.steps[this.orders[i]._id][k]] = false;                        
                        remtime[this.steps[this.orders[i]._id][k]] = '0:00';                        
                        console.log('time',time);   
                        console.log('delivered',delivered);                        
                        console.log('call',call);  
                        console.log('remtime',remtime);                                                                      
                    }
                    this.times[this.orders[i]._id] = time;                                            
                    console.log('this.times',this.times);
                    this.showDeliveredButton[this.orders[i]._id] = delivered;  
                    console.log('this.showDeliveredButton',this.showDeliveredButton);
                    this.showToCall[this.orders[i]._id] = call;     
                    console.log('this.showToCall',this.showToCall);
                    this.remainingTime[this.orders[i]._id] = remtime;  
                    console.log('this.remainingTime',this.remainingTime);
                }
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
        // this.showToCall[order._id][this.stepdata[order._id].step] = false; 
        // let m = time - 1;
        // let seconds = time * 60;
        // let w = parseFloat((100/seconds).toFixed(2));
        // let timeInterval = 1000;
        // let t = 0;
        // let s = 60;
        // var elem = document.getElementById(this.stepdata[order._id].step);
        // var width = 0;
        // var id = setInterval(() => {
        //     t = t + 1;
        //     seconds = seconds-1;
        //     console.log(seconds, 'seconds =====')
        //     s = s-1;
        //     if(seconds == 0 || seconds<0) {   
        //         clearInterval(id);
        //         this.showDeliveredButton[order._id][this.stepdata[order._id].step] = true;            
        //     } else {
        //         width = width + w;
        //         console.log(width);
        //         if(width < 100){
        //             elem.style.width = width + '%';
        //         } else {
        //             elem.style.width = '100%';
        //         }
        //         this.showDeliveredButton[order._id][this.stepdata[order._id].step] = false;
        //     }
        //     if (t == 60) {
        //         t = 0;
        //         s = 60;
        //         m = m-1;
        //     }
        //     var minutes = m;
        //     var seconds = s;
        //     console.log(seconds, 'seconds =====++++++')
            
        //     this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes<10?('0'+minutes):minutes) + ":" + (seconds<10?('0'+seconds):seconds);
        // }, timeInterval);

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
            itemId: items,
            step: this.stepdata[order._id].step
        };
        this.websocketService.updateOrder(order, opts).then(data => {
            console.log("updateItem dept item updated+++++++++++++", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

    public updateStepItem(order, time, status) {
        this.showToCall[order._id][this.stepdata[order._id].step] = false; 
        let m = time - 1;
        let seconds = time * 60;
        let w = parseFloat((100/seconds).toFixed(2));
        let timeInterval = 1000;
        let t = 0;
        let s = 60;
        var elem = document.getElementById(order._id+'_'+this.stepdata[order._id].step);
        var width = 0;
        var id = setInterval(() => {
            t = t + 1;
            seconds = seconds-1;
            console.log(seconds, 'seconds =====')
            s = s-1;
            if (t == 60) {
                console.log('Hello');
                t = 0;
                s = 60;
                m = m-1;
            }
            var minutes = m;
            // var seconds = s;
            console.log(seconds, 'seconds =====++++++')
            if(seconds == 0 || seconds<0) {   
                clearInterval(id);
                this.showDeliveredButton[order._id][this.stepdata[order._id].step] = true;            
            } else {
                width = width + w;
                console.log(width);
                if(width < 100){
                    elem.style.width = width + '%';
                } else {
                    elem.style.width = '100%';
                }
                this.showDeliveredButton[order._id][this.stepdata[order._id].step] = false;
            }            
            this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes<10?('0'+minutes):minutes) + ":" + (s<10?('0'+s):s);
        }, timeInterval);

        let items = [];
        for (let i = 0; i < order.item.length; i++) {
            for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                    if(order.item[i].step == this.stepdata[order._id].step){
                        order.item[i].status = status;
                        if(items.indexOf(order.item[i].id._id)<0){
                            items.push(order.item[i].id._id)
                        }
                    }
                }
            }
        }
        let opts = {
            status: status,
            itemId: items,
            step: this.stepdata[order._id].step
        };
        this.websocketService.updateOrder(order._id, opts).then(data => {
            console.log("update step Item dept item updated+++++++++++++", data);
        }).catch(error => {
            console.log("error", error);
        });
    };

    selectedTab(step, tab, orderId) {
        let temp = {
            tab: tab,
            step: step
        }
        this.stepdata[orderId] = temp;
    } 

    public updateDeliveredOrder(order) {
        console.log(order, 'order ++++++');
        let items = [];
        for (let i = 0; i < order.item.length; i++) {
            for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                    if(order.item[i].step == this.stepdata[order._id].step){
                        items.push(order.item[i].id._id)
                    }
                }
            }
        }
        let opts = {
            step: this.stepdata[order._id].step,
            item: items
        };
        this.websocketService.updateDeliveredOrder(order._id, opts).then(data => {
            console.log("updateDeliveredOrder dept Order updated++++++++++++++++", data);
            this.showToCall[order._id][this.stepdata[order._id].step] = true;
            // this.showDeliveredButton[order._id][this.stepdata[order._id].step] = false;
        }).catch(error => {
            console.log("error", error);
        });
    };
}
