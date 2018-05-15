import { Component, OnInit, IterableDiffers, Input, DoCheck } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import *  as _ from 'lodash';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements DoCheck {
    @Input() orders: Array<any> = [];
    differ: any;
    // public orders: Array<any> = [];
    public loadingOrders: boolean = true;
    public steps: Array<any> = [];
    public activetab: boolean[] = [];
    public stepdata: Array<any> = [];
    public orderId: Array<any> = [];
    public times: Array<any> = [];      
    constructor(public websocketService: WebsocketService, private globalService: GlobalService, public router: Router,private differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
     }

    ngOnInit() {
        this.websocketService.getWaiterOrders().then(data => {
            this.orders = data;
            // if (this.orders.length) {
            //     for (let i = 0; i < this.orders.length; i++) {
            //         this.orderId.push(this.orders[i]._id);
            //         let step = [];
            //         for (let j = 0; j < this.orders[i].item.length; j++) {
            //             if (step.length) {
            //                 for (let b = 0; b < step.length; b++) {
            //                     if (step[b].value !== this.orders[i].item[j].step) {
            //                         let key = this.orders[i].item[j].step.split(' ');
            //                         let newKey = Number(key[1]);
            //                         let value = this.orders[i].item[j].step;
            //                         step.push({ id: newKey, value: value });
            //                     }
            //                 }
            //             }
            //             if (!step.length) {
            //                 let key = this.orders[i].item[j].step.split(' ');
            //                 let newKey = Number(key[1]);
            //                 let value = this.orders[i].item[j].step;
            //                 step.push({ id: newKey, value: value });
            //             }
            //         }
            //         step.sort(function(a, b){
            //             return a.id-b.id
            //         });
            //         step = _.uniqBy(step,'value');
            //         // for (let j = 0; j < this.orders[i].item.length; j++) {
            //         //     if (step.indexOf(this.orders[i].item[j].step) < 0) {
            //         //         step.push(this.orders[i].item[j].step);
            //         //     }
            //         // }
            //         this.steps[this.orders[i]._id] = step;
            //         let time = {};                                                                        
            //         for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
            //         let temp = [];                          
            //             for (let l = 0; l < this.orders[i].item.length; l++) {
            //                 if(this.orders[i].item[l].step == this.steps[this.orders[i]._id][k].value && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0){
            //                     temp.push(this.orders[i].item[l].id.preparationTime);
            //                 }
            //             }
            //             time[this.steps[this.orders[i]._id][k].value] = Math.max(...temp);                        
            //         }
            //         this.times[this.orders[i]._id] = time;                                            
            //     }
            //     if (this.orderId && this.orderId.length) {
            //         for (let k = 0; k < this.orderId.length; k++) {
            //             let temp = {
            //                 tab: 0,
            //                 step: ''
            //             }
            //             temp.tab = 0;
            //             temp.step = this.steps[this.orderId[k]][0].value;
            //             this.stepdata[this.orderId[k]] = temp;
            //         }
            //     }
            // }
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    let time = {};
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let temp = [];
                        for (let l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max(...temp);
                        if(this.orders[i].step[k].status == 1){
                            let temparray = this.orders[i].step[k].step.split(' ');
                            let num = Number(temparray[1]);
                            let stepTemp = temparray[0]+' '+ ++num;
                            let temp = {
                                tab: num,
                                step: stepTemp,
                            }
                            this.stepdata[this.orders[i]._id] = temp;
                        }else{
                            let tempp = {
                                tab: 0,
                                step: ''
                            }
                            tempp.tab = 0;
                            tempp.step = this.orders[i].step[0].step;
                            this.stepdata[this.orders[i]._id] = tempp;
                        }
                        
                    }
                    this.times[this.orders[i]._id] = time;
                }
            }
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
        this.websocketService.updateOrder(order._id, opts).then(data => {
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
        this.websocketService.updateWaiterOrder(order, opts).then(data => {
        }).catch(error => {
            console.log("error", error);
        });
    };


    public changeStep(order, step) {
        let items = [];
        let opts = {
            step: step
        };
        this.websocketService.changeOrderStep(order._id, opts).then(data => {
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

    ngDoCheck() {
        const change = this.differ.diff(this.orders);
        if(change != null){
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    let time = {};
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let temp = [];
                        for (let l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max(...temp);
                        let tempp = {
                            tab: 0,
                            step: ''
                        }
                        tempp.tab = 0;
                        tempp.step = this.orders[i].step[0].step;
                        this.stepdata[this.orders[i]._id] = tempp;
                    }
                    this.times[this.orders[i]._id] = time;
                }
            }
        }
    }
}
