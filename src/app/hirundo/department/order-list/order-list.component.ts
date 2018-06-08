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
    public clock: any;
    public tick: any;
    public loadingOrders: boolean = true;
    public steps: Array<any> = [];
    public activetab: boolean[] = [];
    public stepdata: Array<any> = [];
    public orderId: Array<any> = [];
    public times: Array<any> = [];
    public completeButton = false;
    public remainingTime: Array<any> = [];
    public orderStepData: {};
    public barWidth: Array<any> = [];
    public id;
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard, private differs: IterableDiffers) {
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
                        if (this.orders[i].step[k].status == 1) {
                            let temparray = this.orders[i].step[k].step.split(' ');
                            let num = Number(temparray[1]);
                            let stepTemp = temparray[0] + ' ' + ++num;
                            let temp = {
                                tab: num,
                                step: stepTemp,
                            }
                            this.stepdata[this.orders[i]._id] = temp;
                        } else {
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
                    this.remainingTime[this.orders[i]._id] = remtime;
                }
            }
            this.loadingOrders = false;
        })
            .catch(error => {
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
        }).catch(error => {
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
        }).catch(error => {
        });
    };

    public updateStepItem(step, index, order, time, status) {
        if (localStorage.getItem('step') != null) {
            localStorage.removeItem('step');
        }
        localStorage.setItem('step', JSON.stringify(step));
        let seconds = time * 60;
        let timeInterval = 1000;
        let m = time - 1;
        let w = parseFloat((100 / seconds).toFixed(2));
        let t = 0;
        let s = 60;
        var width = 0;
        step = JSON.parse(localStorage.getItem('step'));  // Clones the object                
        this.id = setInterval(() => {
            step = JSON.parse(localStorage.getItem('step'));  // Clones the object        
            if (step.status != 1 && step.status != 5 && step.step == this.stepdata[order._id].step) {
                t = t + 1;
                seconds = seconds - 1;
                s = s - 1;
                if (seconds == 0 && step.status != 1 && step.step == this.stepdata[order._id].step) {
                    clearInterval(this.id);
                    this.remainingTime[order._id][step.step] = '0:00';
                    let items = [];
                    this.completeButton = true;
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
                    });
                }
                else {
                    width = width + w;
                    if (width < 100) {
                        this.barWidth[step.step.replace(' ', '') + order._id + index] = width + '%';
                    } else {
                        this.barWidth[step.step.replace(' ', '') + order._id + index] = '100%';
                    }
                }
                if (t == 60) {
                    t = 0;
                    if (m == 0) {
                        m = 0;
                        s = 0;
                    } else {
                        m = m - 1;
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
        this.websocketService.updateOrder(order._id, opts).then((data) => {
            console.log('data',data);
            console.log('order',order);
            
            order.status = data.data.status;
            order.step = data.data.step;
            for (let i = 0; i < data.data.step.length; i++) {
                if (data.data.step[i].step == step.step) {
                    step.status = data.data.step[i].status;
                    if (step.status == 5) {
                        seconds = 0;
                        timeInterval = 0;
                        clearInterval(this.id);
                        setTimeout(this.id.data.handleId);
                        this.remainingTime[order._id][step.step] = '0:00';
                    }
                    localStorage.setItem('step',JSON.stringify(data.data.step[i]));
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
            if (data.data.status == 1) {
                for (var i = 0; i < this.orders.length; i++) {
                    if (data.data._id === this.orders[i]._id) {
                        this.orders.splice(i, 1);
                    }
                }
            }
            console.log('order 111111111111111111111111',order);
            
        }).catch(error => {
        });
    };

    showCompleteBtn(step, index, order, time) {
        this.completeButton = true;
    }

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
}