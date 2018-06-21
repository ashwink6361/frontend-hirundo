// import { Component, OnInit, IterableDiffers, Input, DoCheck } from '@angular/core';
// import { WebsocketService } from '../../../service/websocket.service';
// import { Router } from '@angular/router';
// import { GlobalService } from '../../global.service'
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
// import *  as _ from 'lodash';

// @Component({
//     selector: 'app-list',
//     templateUrl: './list.component.html',
//     styleUrls: ['./list.component.scss']
// })
// export class ListComponent implements DoCheck {
//     @Input() orders: Array<any> = [];
//     differ: any;
//     public loadingOrders: boolean = true;
//     public steps: Array<any> = [];
//     public activetab: boolean[] = [];
//     public stepdata: Array<any> = [];
//     public orderId: Array<any> = [];
//     public times: Array<any> = [];    
//     public showToCall: Array<any> = [];  
//     constructor(public websocketService: WebsocketService, private globalService: GlobalService, public router: Router,private differs: IterableDiffers) {
//         this.differ = differs.find([]).create(null);
//      }

//     ngOnInit() {
//         this.websocketService.getWaiterOrders().then(data => {
//             this.orders = data;
//             if (this.orders.length) {
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let time = {};
//                     let call = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let temp = [];
//                         for (let l = 0; l < this.orders[i].item.length; l++) {
//                             if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                                 temp.push(this.orders[i].item[l].id.preparationTime);
//                             }
//                         }
//                         time[this.orders[i].step[k].step] = Math.max(...temp);
//                         call[this.orders[i].step[k].step] = true;
//                         if(this.orders[i].step[k].status == 1){
//                             let temparray = this.orders[i].step[k].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let stepTemp = temparray[0]+' '+ ++num;
//                             let temp = {
//                                 tab: num,
//                                 step: stepTemp,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                         }else{
//                             let tempp = {
//                                 tab: 0,
//                                 step: ''
//                             }
//                             if(this.orders[i].step.length>1){
//                                 tempp.tab = 1;
//                                 tempp.step = this.orders[i].step[1].step;
//                             }
//                             else{
//                                 tempp.tab = 0;
//                                 tempp.step = this.orders[i].step[0].step;
//                             }
//                             this.stepdata[this.orders[i]._id] = tempp;
//                         }
                        
//                     }
//                     this.times[this.orders[i]._id] = time;
//                     this.showToCall[this.orders[i]._id] = call;
//                 }
//             }
//             this.loadingOrders = false;
//         })
//             .catch(error => {
//             });
//     }

//     public getOrderStatus(status) {
//         var str = 'In progress';
//         switch (status) {
//             case 0:
//                 str = 'New order'; break;
//             case 1:
//                 str = 'Delivered'; break;
//             case 2:
//                 str = 'Prepared'; break;
//             case 3:
//                 str = 'Cancelled'; break;
//             case 4:
//                 str = 'In progress'; break;
//             default:
//                 break;
//         }

//         return str;
//     };

//     public updateOrder(order, status) {
//         order.status = status;
//         let items = [];
//         for (let i = 0; i < order.item.length; i++) {
//             items.push(order.item[i].id._id)
//         }
//         let opts = {
//             status: status,
//             itemId: items
//         };
//         this.websocketService.updateOrder(order._id, opts).then(data => {
//         }).catch(error => {
//         });
//     };

//     public updateItem(item, order, status) {
//         item.status = status;
//         let items = [];
//         items.push(item.id._id)
//         let opts = {
//             status: status,
//             itemId: items
//         };
//         this.websocketService.updateWaiterOrder(order, opts).then(data => {
//         }).catch(error => {
//         });
//     };


//     public changeStep(order, step, stepKey) {
//         let items = [];
//         let opts = {
//             step: step
//         };
//         this.websocketService.changeOrderStep(order._id, opts).then(data => {
//             this.showToCall[order._id][stepKey] = false;   
//         }).catch(error => {
//         });
//     };

//     selectedTab(step, tab, orderId) {        
//         let temp = {
//             tab: tab,
//             step: step
//         }
//         this.stepdata[orderId] = temp;
//     }

//     ngDoCheck() {
//         if(this.orders && this.orders.length){
//             const change = this.differ.diff(this.orders);
//             if(change != null){
//                 if (this.orders.length) {
//                     for (let i = 0; i < this.orders.length; i++) {
//                         let time = {};
//                         let call = {};                    
//                         for (let k = 0; k < this.orders[i].step.length; k++) {
//                             let temp = [];
//                             for (let l = 0; l < this.orders[i].item.length; l++) {
//                                 if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                                     temp.push(this.orders[i].item[l].id.preparationTime);
//                                 }
//                             }
//                             time[this.orders[i].step[k].step] = Math.max(...temp);
//                             call[this.orders[i].step[k].step] = true;                        
//                             let tempp = {
//                                 tab: 0,
//                                 step: ''
//                             }
//                             if(this.orders[i].step.length>1){
//                                 tempp.tab = 1;
//                                 tempp.step = this.orders[i].step[1].step;
//                             }
//                             else{
//                                 tempp.tab = 0;
//                                 tempp.step = this.orders[i].step[0].step;
//                             }
//                             this.stepdata[this.orders[i]._id] = tempp;
//                         }
//                         this.times[this.orders[i]._id] = time;
//                         this.showToCall[this.orders[i]._id] = call;                    
//                     }
//                 }
//             }
//         }
       
//     }
// }

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
    public loadingOrders: boolean = true;
    public stepdata: Array<any> = [];
    public itemStatusDelivered: Array<any> = [];
    public showToCall: Array<any> = [];  
    
    constructor(public websocketService: WebsocketService, private globalService: GlobalService, public router: Router,private differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
     }

    ngOnInit() {
        this.websocketService.getWaiterOrders().then(data => {
            this.orders = data;
            if (this.orders.length) {
                this.itemStatusDelivered = [];
                for (let i = 0; i < this.orders.length; i++) {
                    let itemStatusDelivered = {};
                    let call = {};                    
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let startTemp = [];                        
                        for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                            startTemp.push(this.orders[i].step[k].itemId[l].status);
                        }
                        itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                        call[this.orders[i].step[k].step] = true;                        
                        // if (startTemp.every(this.isEqualToOne)) {
                        //     let temparray = this.orders[i].step[k].step.split(' ');
                        //     let num = Number(temparray[1]);
                        //     let stepTemp = temparray[0] + ' ' + ++num;
                        //     let temp = {
                        //         tab: Number(temparray[1]),
                        //         step: stepTemp,
                        //     }
                        //     this.stepdata[this.orders[i]._id] = temp;
                        // } else {
                        //     let tempp = {
                        //         tab: 0,
                        //         step: ''
                        //     }
                        //     if(this.orders[i].step.length>1){
                        //         tempp.tab = 1;
                        //         tempp.step = this.orders[i].step[1].step;
                        //     }
                        //     else{
                        //         tempp.tab = 0;
                        //         tempp.step = this.orders[i].step[0].step;
                        //     }
                        //     this.stepdata[this.orders[i]._id] = tempp;
                        // }
                    }
                    this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
                    this.showToCall[this.orders[i]._id] = call;  
                    console.log('this.itemStatusDelivered',this.itemStatusDelivered);
                    if(this.orders[i].step.length>2){
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                console.log('this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m]]',this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]);
                                if(this.orders[i].step[m].step != 'Uscita 1'){
                                    let temparray = this.orders[i].step[m].step.split(' ');
                                    console.log('temparray',temparray);
                                    let num = Number(temparray[1]);
                                    let temp = {
                                        tab: num - 1,
                                        step: this.orders[i].step[m].step,
                                    }
                                    console.log('temp',temp);
                                    this.stepdata[this.orders[i]._id] = temp;
                                    console.log('this.stepdata',this.stepdata);
                                    break;
                                }
                                else{
                                    let temp = {
                                        tab: 1,
                                        step: this.orders[i].step[1].step,
                                    }
                                    console.log('temp',temp);
                                    this.stepdata[this.orders[i]._id] = temp;
                                    console.log('this.stepdata',this.stepdata);
                                    break;
                                }
                            }
                        }
                    }
                    if(this.orders[i].step.length == 2){
                        let tempp = {
                            tab: 1,
                            step: this.orders[i].step[1].step
                        }
                        this.stepdata[this.orders[i]._id] = tempp;
                    }
                    if(this.orders[i].step.length == 1){
                        let tempp = {
                            tab: 0,
                            step: this.orders[i].step[0].step
                        }
                        this.stepdata[this.orders[i]._id] = tempp;
                    }               
                }
            }
            this.loadingOrders = false;
        })
            .catch(error => {
            });
    }

    isEqualToOne(currentValue) {
        return currentValue == 1;
    };

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

    public changeStep(order, step) {
        let items = [];
        let opts = {
            step: step
        };
        this.websocketService.changeOrderStep(order._id, opts).then(data => {
            this.showToCall[order._id][step] = false;               
            if (this.orders.length) {
                this.itemStatusDelivered = [];
                for (let i = 0; i < this.orders.length; i++) {
                    let itemStatusDelivered = {};
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let startTemp = [];                        
                        for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                            startTemp.push(this.orders[i].step[k].itemId[l].status);
                        }
                        itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                    }
                    this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
                }
            }
        }).catch(error => {
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
        if(this.orders && this.orders.length){
            const change = this.differ.diff(this.orders);
            if(change != null){
                if (this.orders.length) {
                    this.itemStatusDelivered = [];
                    for (let i = 0; i < this.orders.length; i++) {
                        let itemStatusDelivered = {};
                        let call = {};                                            
                        for (let k = 0; k < this.orders[i].step.length; k++) {
                            let startTemp = [];                        
                            for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                            call[this.orders[i].step[k].step] = true;                                                    
                            // if (startTemp.every(this.isEqualToOne)) {
                            //     let temparray = this.orders[i].step[k].step.split(' ');
                            //     let num = Number(temparray[1]);
                            //     let stepTemp = temparray[0] + ' ' + ++num;
                            //     let temp = {
                            //         tab: Number(temparray[1]),
                            //         step: stepTemp,
                            //     }
                            //     this.stepdata[this.orders[i]._id] = temp;
                            // } else {
                            //     let tempp = {
                            //         tab: 0,
                            //         step: ''
                            //     }
                            //     if(this.orders[i].step.length>1){
                            //         tempp.tab = 1;
                            //         tempp.step = this.orders[i].step[1].step;
                            //     }
                            //     else{
                            //         tempp.tab = 0;
                            //         tempp.step = this.orders[i].step[0].step;
                            //     }
                            //     this.stepdata[this.orders[i]._id] = tempp;
                            // }
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
                        this.showToCall[this.orders[i]._id] = call;  
                        if(this.orders[i].step.length>2){
                            for (let m = 0; m < this.orders[i].step.length; m++) {
                                if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                    console.log('this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m]]',this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]);
                                    if(this.orders[i].step[m].step != 'Uscita 1'){
                                        let temparray = this.orders[i].step[m].step.split(' ');
                                        console.log('temparray',temparray);
                                        let num = Number(temparray[1]);
                                        let temp = {
                                            tab: num - 1,
                                            step: this.orders[i].step[m].step,
                                        }
                                        console.log('temp',temp);
                                        this.stepdata[this.orders[i]._id] = temp;
                                        console.log('this.stepdata',this.stepdata);
                                        break;
                                    }
                                    else{
                                        let temp = {
                                            tab: 1,
                                            step: this.orders[i].step[1].step,
                                        }
                                        console.log('temp',temp);
                                        this.stepdata[this.orders[i]._id] = temp;
                                        console.log('this.stepdata',this.stepdata);
                                        break;
                                    } 
                                }
                            }
                        }
                        if(this.orders[i].step.length == 2){
                            let tempp = {
                                tab: 1,
                                step: this.orders[i].step[1].step
                            }
                            this.stepdata[this.orders[i]._id] = tempp;
                        }
                        if(this.orders[i].step.length == 1){
                            let tempp = {
                                tab: 0,
                                step: this.orders[i].step[0].step
                            }
                            this.stepdata[this.orders[i]._id] = tempp;
                        }                                          
                    }
                }
            }
        }
       
    }
}