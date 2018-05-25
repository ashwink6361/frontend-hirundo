import { Component, OnInit, IterableDiffers, Input, DoCheck } from '@angular/core';
import { OrderByPipe } from '../../orderby';
import { OrderListService } from './order-list.service';
import { WebsocketService } from '../../../service/websocket.service';
import { AuthGuard } from '../../../shared/guard/auth.guard';
import *  as _ from 'lodash';
@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements DoCheck {
    @Input() orders: Array<any> = [];
    differ: any;
    // public orders: Array<any> = [];
    public clock: any;
    public tick: any;
    public loadingOrders: boolean = true;
    public steps: Array<any> = [];
    public activetab: boolean[] = [];
    public stepdata: Array<any> = [];
    public orderId: Array<any> = [];
    public times: Array<any> = [];
    // public showDeliveredButton: Array<any> = [];
    // public showToCall: Array<any> = [];
    public remainingTime: Array<any> = [];
    public orderStepData: {};
    public barWidth: Array<any> = [];
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard,private differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        this.websocketService.getOrders().then(data => {
            this.orders = data;
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    let time = {};
                    let remtime = {};
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let temp = [];
                        for (let l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max(...temp);
                        remtime[this.orders[i].step[k].step] = '0:00';
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
                    // this.orderId.push(this.orders[i]._id);
                    // let step = [];
                    // for (let j = 0; j < this.orders[i].item.length; j++) {
                    //     if (((this.orders[i].item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(this.orders[i].item[j].category)) > -1)) {
                    //         if (step.length) {
                    //             for (let b = 0; b < step.length; b++) {
                    //                 if (step[b].value !== this.orders[i].item[j].step) {
                    //                     let key = this.orders[i].item[j].step.split(' ');
                    //                     let newKey = Number(key[1]);
                    //                     let value = this.orders[i].item[j].step;
                    //                     step.push({ id: newKey, value: value });
                    //                 }
                    //             }
                    //         }
                    //         if (!step.length) {
                    //             let key = this.orders[i].item[j].step.split(' ');
                    //             let newKey = Number(key[1]);
                    //             let value = this.orders[i].item[j].step;
                    //             step.push({ id: newKey, value: value });
                    //         }
                    //     }
                    // }
                    // step.sort(function (a, b) {
                    //     return a.id - b.id
                    // });
                    // step = _.uniqBy(step, 'value');
                    // this.steps[this.orders[i]._id] = step;
                    // let time = {};
                    // let remtime = {};
                    // for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
                    //     let temp = [];
                    //     for (let l = 0; l < this.orders[i].item.length; l++) {
                    //         if (this.orders[i].item[l].step == this.steps[this.orders[i]._id][k].value && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                    //             temp.push(this.orders[i].item[l].id.preparationTime);
                    //         }
                    //     }
                    //     time[this.steps[this.orders[i]._id][k].value] = Math.max(...temp);
                    //     remtime[this.steps[this.orders[i]._id][k].value] = '0:00';
                    // }
                    this.times[this.orders[i]._id] = time;
                    this.remainingTime[this.orders[i]._id] = remtime;
                }
                // if (this.orderId && this.orderId.length) {
                //     for (let k = 0; k < this.orderId.length; k++) {
                //         let temp = {
                //             tab: 0,
                //             step: ''
                //         }
                //         temp.tab = 0;
                //         temp.step = this.steps[this.orderId[k]][0].value;
                //         this.stepdata[this.orderId[k]] = temp;
                //     }
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

    public updateStepItem(step, index, order, time, status) {
        let m = time - 1;
        let seconds = time * 60;
        let w = parseFloat((100 / seconds).toFixed(2));
        let timeInterval = 1000;
        let t = 0;
        let s = 60;
        var width = 0;
        var id = setInterval(() => {
            if(step.status != 1 && step.step == this.stepdata[order._id].step){
                t = t + 1;
                seconds = seconds - 1;
                s = s - 1;
                if (seconds == 0 && step.status != 1 && step.step == this.stepdata[order._id].step) {
                    clearInterval(id);
                    let items = [];
                    for (let i = 0; i < order.item.length; i++) {
                        for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                            if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                                if (order.item[i].step == this.stepdata[order._id].step) {
                                    order.item[i].status = status;
                                    if (items.indexOf(order.item[i].id._id) < 0) {
                                        items.push(order.item[i].id._id)
                                    }
                                }
                            }
                        }
                    }
                    let temp = {
                        status: 5,
                        itemId: items,
                        step: this.stepdata[order._id].step
                    };
                        this.websocketService.updateOrder(order._id, temp).then(data => {
                            order.status = data.data.status;
                            for (let i = 0; i < this.orders.length; i++) {
                                if (this.orders[i]._id == data.data._id) {
                                    this.orders[i].step = data.data.step;
                                }
                            }
                            for (let i = 0; i < data.data.step.length; i++) {
                                if (data.data.step[i].step == step.step) {
                                    step.status = data.data.step[i].status;
                                }
                            }
                        }).catch(error => {
                            console.log("error", error);
                        });
                } else {
                    width = width + w;
                    if (width < 100) {
                        this.barWidth[step.step.replace(' ', '')+order._id+index] = width + '%';
                    } else {
                        this.barWidth[step.step.replace(' ', '')+order._id+index] = '100%';
                    }
                }
                if (t == 60) {
                    t = 0;
                    if(m==0) {
                        m = 0;
                        s = 0;
                    } else {
                        m = m-1;
                        s = 60;
                    }
                }
                var minutes = m;
                this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
            }
        }, timeInterval);

        let items = [];
        for (let i = 0; i < order.item.length; i++) {
            for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                    if (order.item[i].step == this.stepdata[order._id].step) {
                        order.item[i].status = status;
                        if (items.indexOf(order.item[i].id._id) < 0) {
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
            order.status = data.data.status;
            order.step = data.data.step;
            for (let i = 0; i < data.data.step.length; i++) {
                if (data.data.step[i].step == step.step) {
                    step.status = data.data.step[i].status;
                }
            }
            if (order.step) {
                for (let j = 0; j < order.step.length - 1; j++) {
                    if (order.step[j].status == 1) {
                        let temparray = order.step[j].step.split(' ');
                        let num = Number(temparray[1]);
                        let stepTemp = temparray[0] + ' ' + ++num;
                        let temp = {
                            tab: num,
                            step: stepTemp,
                        }
                        this.stepdata[order._id] = temp;
                    }
                }
            }
            if(data.data.status == 1){
                for(var i=0; i<this.orders.length; i++) {
                    if(data.data._id === this.orders[i]._id) {
                        this.orders.splice(i,1);
                    }
                }
            }
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
        if (change != null) {
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    let time = {};
                    let remtime = {};
                    for (let k = 0; k < this.orders[i].step.length; k++) {
                        let temp = [];
                        for (let l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max(...temp);
                        remtime[this.orders[i].step[k].step] = '0:00';
                        let tempp = {
                            tab: 0,
                            step: ''
                        }
                        tempp.tab = 0;
                        tempp.step = this.orders[i].step[0].step;
                        this.stepdata[this.orders[i]._id] = tempp;
                    }
                    this.times[this.orders[i]._id] = time;
                    this.remainingTime[this.orders[i]._id] = remtime;
                }
            }
        }
    }
}


// import { Component, OnInit, IterableDiffers, Input, DoCheck } from '@angular/core';
// import { OrderByPipe } from '../../orderby';
// import { OrderListService } from './order-list.service';
// import { WebsocketService } from '../../../service/websocket.service';
// import { AuthGuard } from '../../../shared/guard/auth.guard';
// import *  as _ from 'lodash';
// @Component({
//     selector: 'app-order-list',
//     templateUrl: './order-list.component.html',
//     styleUrls: ['./order-list.component.scss']
// })

// export class OrderListComponent implements DoCheck {
//     @Input() orders: Array<any> = [];
//     differ: any;
//     // public orders: Array<any> = [];
//     public clock: any;
//     public tick: any;
//     public loadingOrders: boolean = true;
//     public steps: Array<any> = [];
//     public activetab: boolean[] = [];
//     public stepdata: Array<any> = [];
//     public orderId: Array<any> = [];
//     public times: Array<any> = [];
//     // public showDeliveredButton: Array<any> = [];
//     // public showToCall: Array<any> = [];
//     public remainingTime: Array<any> = [];
//     public orderStepData: {};
//     public barWidth: Array<any> = [];
//     public iterableDiffer: any;
//     // public remainingTime: Array<any> = ['0:00'];
//     // public showDeliveredButton: boolean[] = [false]; 
//     // public showToCall: boolean[] = [false];     
//     // public times = {};          
//     constructor(public websocketService: WebsocketService, public authGuard: AuthGuard,private differs: IterableDiffers) {
//         this.differ = differs.find([]).create(null);    }

//     ngOnInit() {
//         this.websocketService.getOrders().then(data => {
//             this.orders = data;
//             console.log(this.orders, 'orderlist pagfe')
//             if (this.orders.length) {
//                 for (let i = 0; i < this.orders.length; i++) {
//                     // this.orderId.push(this.orders[i]._id);
//                     // let step = [];
//                     // for (let j = 0; j < this.orders[i].item.length; j++) {
//                     //     if (((this.orders[i].item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(this.orders[i].item[j].category)) > -1)) {
//                     //         if (step.length) {
//                     //             for (let b = 0; b < step.length; b++) {
//                     //                 if (step[b].value !== this.orders[i].item[j].step) {
//                     //                     let key = this.orders[i].item[j].step.split(' ');
//                     //                     let newKey = Number(key[1]);
//                     //                     let value = this.orders[i].item[j].step;
//                     //                     step.push({ id: newKey, value: value });
//                     //                 }
//                     //             }
//                     //         }
//                     //         if (!step.length) {
//                     //             let key = this.orders[i].item[j].step.split(' ');
//                     //             let newKey = Number(key[1]);
//                     //             let value = this.orders[i].item[j].step;
//                     //             step.push({ id: newKey, value: value });
//                     //         }
//                     //     }
//                     // }
//                     // step.sort(function (a, b) {
//                     //     return a.id - b.id
//                     // });
//                     // step = _.uniqBy(step, 'value');
//                     // this.steps[this.orders[i]._id] = step;
//                     let time = {};
//                     let remtime = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let temp = [];
//                         for (let l = 0; l < this.orders[i].item.length; l++) {
//                             if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                                 temp.push(this.orders[i].item[l].id.preparationTime);
//                             }
//                         }
//                         time[this.orders[i].step[k].step] = Math.max(...temp);
//                         remtime[this.orders[i].step[k].step] = '0:00';
//                         // let tempp = {
//                         //     tab: 0,
//                         //     step: ''
//                         // }
//                         // tempp.tab = 0;
//                         // tempp.step = this.orders[i].step[0].step;
//                         // this.stepdata[this.orders[i]._id] = tempp;
//                     }
//                     this.times[this.orders[i]._id] = time;
//                     console.log('this.times',this.times);
//                     this.remainingTime[this.orders[i]._id] = remtime;
//                     // let time = {};
//                     // let delivered = {};
//                     // let call = {};
//                     // let remtime = {};
//                     // for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
//                     //     let temp = [];
//                     //     for (let l = 0; l < this.orders[i].item.length; l++) {
//                     //         if (this.orders[i].item[l].step == this.steps[this.orders[i]._id][k].value && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                     //             temp.push(this.orders[i].item[l].id.preparationTime);
//                     //         }
//                     //     }
//                     //     time[this.steps[this.orders[i]._id][k].value] = Math.max(...temp);
//                     //     delivered[this.steps[this.orders[i]._id][k].value] = false;
//                     //     call[this.steps[this.orders[i]._id][k].value] = false;
//                     //     remtime[this.steps[this.orders[i]._id][k].value] = '0:00';
//                     // } 
//                     // this.times[this.orders[i]._id] = time;
//                     // this.showDeliveredButton[this.orders[i]._id] = delivered;
//                     // this.showToCall[this.orders[i]._id] = call;
//                     // this.remainingTime[this.orders[i]._id] = remtime;
//                 }
//                 // if (this.orderId && this.orderId.length) {
//                 //     for (let k = 0; k < this.orderId.length; k++) {
//                 //         let temp = {
//                 //             tab: 0,
//                 //             step: ''
//                 //         }
//                 //         temp.tab = 0;
//                 //         temp.step = this.steps[this.orderId[k]][0].value;
//                 //         this.stepdata[this.orderId[k]] = temp;
//                 //     }
//                 // }
//                 // if (this.orders && this.orders.length) {
//                 //     for (let k = 0; k < this.orders.length; k++) {
//                 //         if(this.orders[k].stepStatus != null){
//                 //             var tabTemp =this.orders[k].stepStatus.split(' ')[1];
//                 //             let temp = {
//                 //                 tab: tabTemp + 1,
//                 //                 step: this.orders[k].stepStatus,
//                 //             }
//                 //             this.stepdata[this.orders[k]._id] = temp;
//                 //         }
//                 //     }
//                 // }
//             }
//             this.loadingOrders = false;
//         })
//             .catch(error => {
//                 console.log('error', error);
//             });
//         this.tick = setInterval(() => {
//             this.clock = Date.now();
//         }, 1000);
//     }

//     ngDoCheck() {
//         const change = this.differ.diff(this.orders);
//         console.log('changes detedcted',change);
//         if(change != null){
//             if (this.orders.length) {
//                 for (let i = 0; i < this.orders.length; i++) {
//                     // this.orderId.push(this.orders[i]._id);
//                     // let step = [];
//                     // for (let j = 0; j < this.orders[i].item.length; j++) {
//                     //     if (((this.orders[i].item[j].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(this.orders[i].item[j].category)) > -1)) {
//                     //         if (step.length) {
//                     //             for (let b = 0; b < step.length; b++) {
//                     //                 if (step[b].value !== this.orders[i].item[j].step) {
//                     //                     let key = this.orders[i].item[j].step.split(' ');
//                     //                     let newKey = Number(key[1]);
//                     //                     let value = this.orders[i].item[j].step;
//                     //                     step.push({ id: newKey, value: value });
//                     //                 }
//                     //             }
//                     //         }
//                     //         if (!step.length) {
//                     //             let key = this.orders[i].item[j].step.split(' ');
//                     //             let newKey = Number(key[1]);
//                     //             let value = this.orders[i].item[j].step;
//                     //             step.push({ id: newKey, value: value });
//                     //         }
//                     //     }
//                     // }
//                     // step.sort(function (a, b) {
//                     //     return a.id - b.id
//                     // });
//                     // step = _.uniqBy(step, 'value');
//                     // this.steps[this.orders[i]._id] = step;
//                     let time = {};
//                     let remtime = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let temp = [];
//                         for (let l = 0; l < this.orders[i].item.length; l++) {
//                             if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                                 temp.push(this.orders[i].item[l].id.preparationTime);
//                             }
//                         }
//                         time[this.orders[i].step[k].step] = Math.max(...temp);
//                         remtime[this.orders[i].step[k].step] = '0:00';
//                         // let tempp = {
//                         //     tab: 0,
//                         //     step: ''
//                         // }
//                         // tempp.tab = 0;
//                         // tempp.step = this.orders[i].step[0].step;
//                         // this.stepdata[this.orders[i]._id] = tempp;
//                     }
//                     this.times[this.orders[i]._id] = time;
//                     console.log('this.times',this.times);
//                     this.remainingTime[this.orders[i]._id] = remtime;
//                     // let time = {};
//                     // let delivered = {};
//                     // let call = {};
//                     // let remtime = {};
//                     // for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
//                     //     let temp = [];
//                     //     for (let l = 0; l < this.orders[i].item.length; l++) {
//                     //         if (this.orders[i].item[l].step == this.steps[this.orders[i]._id][k].value && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
//                     //             temp.push(this.orders[i].item[l].id.preparationTime);
//                     //         }
//                     //     }
//                     //     time[this.steps[this.orders[i]._id][k].value] = Math.max(...temp);
//                     //     delivered[this.steps[this.orders[i]._id][k].value] = false;
//                     //     call[this.steps[this.orders[i]._id][k].value] = false;
//                     //     remtime[this.steps[this.orders[i]._id][k].value] = '0:00';
//                     // } 
//                     // this.times[this.orders[i]._id] = time;
//                     // this.showDeliveredButton[this.orders[i]._id] = delivered;
//                     // this.showToCall[this.orders[i]._id] = call;
//                     // this.remainingTime[this.orders[i]._id] = remtime;
//                 }
//                 // if (this.orderId && this.orderId.length) {
//                 //     for (let k = 0; k < this.orderId.length; k++) {
//                 //         let temp = {
//                 //             tab: 0,
//                 //             step: ''
//                 //         }
//                 //         temp.tab = 0;
//                 //         temp.step = this.steps[this.orderId[k]][0].value;
//                 //         this.stepdata[this.orderId[k]] = temp;
//                 //     }
//                 // }
//                 // if (this.orders && this.orders.length) {
//                 //     for (let k = 0; k < this.orders.length; k++) {
//                 //         if(this.orders[k].stepStatus != null){
//                 //             var tabTemp =this.orders[k].stepStatus.split(' ')[1];
//                 //             let temp = {
//                 //                 tab: tabTemp + 1,
//                 //                 step: this.orders[k].stepStatus,
//                 //             }
//                 //             this.stepdata[this.orders[k]._id] = temp;
//                 //         }
//                 //     }
//                 // }
//             }
//         }
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

//     public updateOrder(order, time, status) {        
//         order.status = status;
//         let items = [];
//         for (let i = 0; i < order.item.length; i++) {
//             for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                 if (order.item[i].category == this.authGuard.getCurrentUser().category[k]) {
//                     items.push(order.item[i].id._id)
//                 }
//             }
//         }
//         let opts = {
//             status: status,
//             itemId: items
//         };
//         this.websocketService.updateOrder(order._id, opts).then(data => {
//             console.log("updateOrder dept Order updated++++++++++++++++", data);
//         }).catch(error => {
//             console.log("error", error);
//         });
//     };

//     public updateItem(step,item, order, status) {
//         item.status = status;
//         let items = [];
//         items.push(item.id._id)
//         let opts = {
//             status: status,
//             itemId: items,
//             step: step
//         };
//         this.websocketService.updateOrder(order, opts).then(data => {
//             console.log("updateItem dept item updated+++++++++++++", data);
//         }).catch(error => {
//             console.log("error", error);
//         });
//     };

//     public updateStepItem(step,index, order, time, status) {
//         // this.showToCall[order._id][this.stepdata[order._id].step] = false;
//         let m = time - 1;
//         let seconds = time * 60;
//         let w = parseFloat((100 / seconds).toFixed(2));
//         let timeInterval = 1000;
//         let t = 0;
//         let s = 60;
//         // console.log(this.stepdata[order._id].step.replace(' ', '')+order._id+index);
//         console.log(step.replace(' ', '')+order._id+index);        
//         var width = 0;
//         var id = setInterval(() => {
//             t = t + 1;
//             seconds = seconds - 1;
//             s = s - 1;
//             if (seconds == 0) {
//                 console.log(seconds, 'seconds');
//                 clearInterval(id);
//                 let items = [];
//                 for (let i = 0; i < order.item.length; i++) {
//                     for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                         if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
//                             // if (order.item[i].step == this.stepdata[order._id].step) {
//                             if (order.item[i].step == step) {                                
//                                 order.item[i].status = status;
//                                 if (items.indexOf(order.item[i].id._id) < 0) {
//                                     items.push(order.item[i].id._id)
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 let opts = {
//                     status: 5,
//                     itemId: items,
//                     // step: this.stepdata[order._id].step
//                     step: step
                    
//                 };
//                 this.websocketService.updateOrder(order._id, opts).then(data => {
//                     for (let i = 0; i < this.orders.length; i++) {
//                         if (this.orders[i]._id == data.data._id) {
//                             this.orders[i].step = data.data.step;
//                         }
//                     }
//                     console.log('this.orders', this.orders);
//                 }).catch(error => {
//                     console.log("error", error);
//                 });
//             } else {
//                 width = width + w;
//                 if (width < 100) {
//                     // this.barWidth[this.stepdata[order._id].step.replace(' ', '')+order._id+index] = width + '%';
//                     this.barWidth[step.replace(' ', '')+order._id+index] = width + '%';                
//                 } else {
//                     // this.barWidth[this.stepdata[order._id].step.replace(' ', '')+order._id+index] = '100%';
//                     this.barWidth[step.replace(' ', '')+order._id+index] = '100%';                    
//                 }
//             }
//             if (t == 60) {
//                 t = 0;
//                 if(m==0) {
//                     m = 0;
//                     s = 0;
//                 } else {
//                     m = m-1;
//                     s = 60;
//                 }
//             }
//             var minutes = m;
//             // this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
//             this.remainingTime[order._id][step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
     
//         }, timeInterval);

//         let items = [];
//         for (let i = 0; i < order.item.length; i++) {
//             for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                 if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
//                     // if (order.item[i].step == this.stepdata[order._id].step) {
//                     if (order.item[i].step == step) {                        
//                         order.item[i].status = status;
//                         if (items.indexOf(order.item[i].id._id) < 0) {
//                             items.push(order.item[i].id._id)
//                         }
//                     }
//                 }
//             }
//         }
//         let opts = {
//             status: status,
//             itemId: items,
//             // step: this.stepdata[order._id].step
//             step: step            
//         };
//         this.websocketService.updateOrder(order._id, opts).then(data => {
//             console.log("update step Item dept item updated+++++++++++++", data);
//             order.step = data.data.step;
//             // for (let i = 0; i < this.orders.length; i++) {
//             //     if (this.orders[i]._id == data.data._id) {
//             //         this.orders[i].step = data.data.step;
//             //     }
//                 // if(this.orders[i].step){
//                 //     for(let j=0;j<this.orders[i].step.length;j++){
//                 //         if(this.orders[i]._id == order._id && this.orders[i].step[j].status == 1){
//                 //             let temparray = this.orders[i].step[j].step.split(' ');
//                 //             let tabTemp = temparray[1];
//                 //             let stepTemp = temparray[0]+' '+Number(temparray[1])+1;
//                 //             let temp = {
//                 //                 tab: tabTemp,
//                 //                 step: stepTemp,
//                 //             }
//                 //             this.stepdata[this.orders[i]._id] = temp;
//                 //             console.log('this.stepdata',this.stepdata);
//                 //         }
//                 //     }
//                 // }
//             // }
//             console.log('this.orders', this.orders);
//         }).catch(error => {
//             console.log("error", error);
//         });
//     };

//     // selectedTab(step, tab, orderId) {
//     //     let temp = {
//     //         tab: tab,
//     //         step: step
//     //     }
//     //     this.stepdata[orderId] = temp;        
//     // }


//     selectedTab(step, index, order) {
//         step.active = true;
//         for (let i = 0; i < order.step.length; i++) {
//             if (i != index) {
//                 order.step[i].active = false;
//             }
//         }
//     }

//     // public updateDeliveredOrder(order) {
//     //     console.log(order, 'order ++++++');
//     //     let items = [];
//     //     for (let i = 0; i < order.item.length; i++) {
//     //         for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//     //             if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
//     //                 if (order.item[i].step == this.stepdata[order._id].step) {
//     //                     items.push(order.item[i].id._id)
//     //                 }
//     //             }
//     //         }
//     //     }
//     //     let opts = {
//     //         step: this.stepdata[order._id].step,
//     //         item: items
//     //     };
//     //     this.websocketService.updateDeliveredOrder(order._id, opts).then(data => {
//     //         console.log("updateDeliveredOrder dept Order updated++++++++++++++++", data);
//     //         // this.showToCall[order._id][this.stepdata[order._id].step] = true;
//     //         // this.showDeliveredButton[order._id][this.stepdata[order._id].step] = false;
//     //     }).catch(error => {
//     //         console.log("error", error);
//     //     });
//     // };
// }

