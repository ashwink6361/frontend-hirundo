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
    public stepdata: Array<any> = [];
    public itemStatusDelivered: Array<any> = [];
    public remainingTime: Array<any> = [];
    public activetab = 1;
    public changedTab: boolean = false;
    public audioPlay: string = '';
    constructor(public websocketService: WebsocketService, public authGuard: AuthGuard, private differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        // if (this.websocketService.getAudio() == '1') {
        //     var x = (document.createElement('audio').canPlayType);
        //     var myAudio = document.createElement('audio');
        //     if (myAudio.canPlayType("audio/mpeg")) {
        //         myAudio.setAttribute("src", "../../../assets/audio/notication_sound.mp3");
        //     } else {
        //         myAudio.setAttribute("src", "../../../assets/audio/notication_sound.ogg");
        //     }
        //     myAudio.setAttribute("controls", "controls");
        //     myAudio.setAttribute("autoplay", "autoplay");
        //     document.body.appendChild(myAudio);
        // }
    }

    ngOnInit() {
        this.activetab = 1;
        this.websocketService.getOrders(this.activetab).then(data => {
            // this.audioPlay = localStorage.getItem('autoplay');
            this.orders = data;
            if (this.orders.length) {
                this.itemStatusDelivered = [];
                this.remainingTime = [];
                for (let i = 0; i < this.orders.length; i++) {
                    if (this.orders[i]) {
                        let itemStatusDelivered = {};
                        let remTime = {};
                        for (let k = 0; k < this.orders[i].step.length; k++) {
                            let startTemp = [];
                            for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                let temparray = this.orders[i].step[m].step.split(' ');
                                let num = Number(temparray[1]);
                                let temp = {
                                    tab: num - 1,
                                    step: this.orders[i].step[m].step,
                                }
                                this.stepdata[this.orders[i]._id] = temp;
                                break;
                            }
                        }
                        for (let k = 0; k < this.orders[i].step.length; k++) {
                            if (this.orders[i].step[k].preparationTime) {
                                if ((this.orders[i].step[k].step == 'Uscita 1') && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                    let seconds = this.orders[i].step[k].preparationTime * 60;
                                    let timeInterval = 1000;
                                    let m = this.orders[i].step[k].preparationTime - 1;
                                    let t = 0;
                                    let s = 60;
                                    var id = setInterval(() => {
                                        t = t + 1;
                                        seconds = seconds > 0 ? seconds - 1 : 0;
                                        s = s > 0 ? s - 1 : 0;
                                        if (seconds == 0) {
                                            clearInterval(id);
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
                                        if (this.orders[i] && this.orders[i].step[k]) {
                                            remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                        }
                                    }, timeInterval);
                                }
                                else if ((this.orders[i].step[k].step != 'Uscita 1') && (this.orders[i].stepStatus == this.orders[i].step[k].step) && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                    let seconds = this.orders[i].step[k].preparationTime * 60;
                                    let timeInterval = 1000;
                                    let m = this.orders[i].step[k].preparationTime - 1;
                                    let t = 0;
                                    let s = 60;
                                    var id = setInterval(() => {
                                        t = t + 1;
                                        seconds = seconds > 0 ? seconds - 1 : 0;
                                        s = s > 0 ? s - 1 : 0;
                                        if (seconds == 0) {
                                            clearInterval(id);
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
                                        if (this.orders[i] && this.orders[i].step[k]) {
                                            remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                        }
                                    }, timeInterval);
                                }
                            }
                        }
                        this.remainingTime[this.orders[i]._id] = remTime;
                    }
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
            case 5:
                str = 'Completed'; break;
            default:
                break;
        }
        return str;
    };

    public updateItem(item, order) {

        item.status = !item.status;
        let opts = {
            id: [ item._id ],
            statuses: [ item.status ]
        };
        
        this.websocketService.updateOrder(order, opts).then(data => {
        
            order = data.data;
            if (this.orders.length) {
                for (let i = 0; i < this.orders.length; i++) {
                    if (this.orders[i].id == order) {
                        let itemStatusDelivered = {};
                        let remTime = {};
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            let startTemp = [];
                            for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                let temparray = this.orders[i].step[m].step.split(' ');
                                let num = Number(temparray[1]);
                                let temp = {
                                    tab: num - 1,
                                    step: this.orders[i].step[m].step,
                                }
                                this.stepdata[this.orders[i]._id] = temp;
                                break;
                            }
                        }
                        for (let k = 0; k < this.orders[i].step.length; k++) {
                            if (this.orders[i].step[k].preparationTime) {
                                if ((this.orders[i].step[k].step == 'Uscita 1') && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                    let seconds = this.orders[i].step[k].preparationTime * 60;
                                    let timeInterval = 1000;
                                    let m = this.orders[i].step[k].preparationTime - 1;
                                    let t = 0;
                                    let s = 60;
                                    var id = setInterval(() => {
                                        t = t + 1;
                                        seconds = seconds > 0 ? seconds - 1 : 0;
                                        s = s > 0 ? s - 1 : 0;
                                        if (seconds == 0) {
                                            clearInterval(id);
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
                                        if (this.orders[i] && this.orders[i].step[k]) {
                                            remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                        }
                                    }, timeInterval);
                                }
                                else if ((this.orders[i].step[k].step != 'Uscita 1') && (this.orders[i].stepStatus == this.orders[i].step[k].step) && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                    let seconds = this.orders[i].step[k].preparationTime * 60;
                                    let timeInterval = 1000;
                                    let m = this.orders[i].step[k].preparationTime - 1;
                                    let t = 0;
                                    let s = 60;
                                    var id = setInterval(() => {
                                        t = t + 1;
                                        seconds = seconds > 0 ? seconds - 1 : 0;
                                        s = s > 0 ? s - 1 : 0;
                                        if (seconds == 0) {
                                            clearInterval(id);
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
                                        if (this.orders[i] && this.orders[i].step[k]) {

                                            remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                        }
                                    }, timeInterval);
                                }
                            }
                        }
                        this.remainingTime[this.orders[i]._id] = remTime;
                    }
                }
            }
        }).catch(error => {
        });
    };

    public updateStepItem(step, order) {
        var result = confirm("Do you want to deliver?");
        if (result) {
            let ids = [];
            for (let i = 0; i < step.itemId.length; i++) {
                step.itemId[i].status = 1;
                if (ids.indexOf(step.itemId[i]._id) < 0) {
                    ids.push(step.itemId[i]._id);
                }
            }
            let opts = {
                id: ids,
                key: 'delivered'
            };
            this.websocketService.updateOrder(order._id, opts).then((data) => {
                order = _.cloneDeep(data.data);
                this.websocketService.getOrders(this.activetab).then(data => {
                    this.orders = data;
                    if (this.orders.length) {
                        for (let i = 0; i < this.orders.length; i++) {
                            if (this.orders[i]._id == order._id) {
                                let itemStatusDelivered = {};
                                let remTime = {};
                                for (let k = 0; k < this.orders[i].step.length; k++) {
                                    let startTemp = [];
                                    for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                                        startTemp.push(this.orders[i].step[k].itemId[l].status);
                                    }
                                    itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                                }
                                this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                                for (let m = 0; m < this.orders[i].step.length; m++) {
                                    if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                        let temparray = this.orders[i].step[m].step.split(' ');
                                        let num = Number(temparray[1]);
                                        let temp = {
                                            tab: num - 1,
                                            step: this.orders[i].step[m].step,
                                        }
                                        this.stepdata[this.orders[i]._id] = temp;
                                        break;
                                    }
                                }
                                let stepIds = [];
                                for (let k = 0; k < this.orders[i].step.length; k++) {
                                    stepIds.push(this.orders[i].step[k]._id);
                                    if (this.orders[i].step[k].preparationTime) {
                                        if ((this.orders[i].step[k].step == 'Uscita 1') && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                            let seconds = this.orders[i].step[k].preparationTime * 60;
                                            let timeInterval = 1000;
                                            let m = this.orders[i].step[k].preparationTime - 1;
                                            let t = 0;
                                            let s = 60;
                                            var id = setInterval(() => {
                                                t = t + 1;
                                                seconds = seconds > 0 ? seconds - 1 : 0;
                                                s = s > 0 ? s - 1 : 0;
                                                if (seconds == 0) {
                                                    clearInterval(id);
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
                                                if (this.orders[i] && this.orders[i].step[k]) {

                                                    remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                                }
                                            }, timeInterval);
                                        }
                                        else if ((this.orders[i].step[k].step != 'Uscita 1') && (this.orders[i].stepStatus == this.orders[i].step[k].step) && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                                            let seconds = this.orders[i].step[k].preparationTime * 60;
                                            let timeInterval = 1000;
                                            let m = this.orders[i].step[k].preparationTime - 1;
                                            let t = 0;
                                            let s = 60;
                                            var id = setInterval(() => {
                                                t = t + 1;
                                                seconds = seconds > 0 ? seconds - 1 : 0;
                                                s = s > 0 ? s - 1 : 0;
                                                if (seconds == 0) {
                                                    clearInterval(id);
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
                                                if (this.orders[i] && this.orders[i].step[k]) {

                                                    remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                                                }
                                            }, timeInterval);
                                        }
                                    }
                                }
                                this.remainingTime[this.orders[i]._id] = _.cloneDeep(remTime);
                                break;
                            }
                        }
                    }
                    this.loadingOrders = false;
                })
                    .catch(error => {
                    });
            }).catch(error => {
            });
        }
    };
    isBelowThreshold(currentValue) {
        return currentValue == 1;
    };
    selectedTab(step, tab, orderId) {
        let temp = {
            tab: tab,
            step: step
        }
        this.stepdata[orderId] = temp;
    }

    getFirstChar(text) {
        return text.charAt();
    }

    updateDepartmentStatus(department, order, step) {
        if (department.status == 0) {
            department.status = 1;
            var opts = {
                step: step,
                status: 1
            };
        }
        else {
            department.status = 0;
            var opts = {
                step: step,
                status: 0
            };
        }
        this.websocketService.updateDepartmentStatus(order._id, opts).then((data) => {
            order = data.data;
            if (this.orders.length) {
                this.itemStatusDelivered = [];
                for (let i = 0; i < this.orders.length; i++) {
                    if (this.orders[i]) {
                        let itemStatusDelivered = {};
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            let startTemp = [];
                            for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                let temparray = this.orders[i].step[m].step.split(' ');
                                let num = Number(temparray[1]);
                                let temp = {
                                    tab: num - 1,
                                    step: this.orders[i].step[m].step,
                                }
                                this.stepdata[this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        }).catch(error => {
        });
    }

    isZero(currentValue) {
        return currentValue == 0;
    };
    ngDoCheck() {
        if (this.websocketService.socketEvent) {
            if (this.orders.length) {
                const change = this.differ.diff(this.orders);
                if (change != null) {
                    if (this.orders.length) {
                        // new code
                        for (let j = this.orders.length - 1; j >= 0; j--) {                                     
                            if (this.orders[j]._id == this.websocketService.orderId) {                            
                            let arr = [];
                            if (this.orders[j].stepStatus == null) {
                                this.orders[j].stepStatus = 'Uscita 1';
                            }
                            for (let k = 0; k < this.orders[j].step.length; k++) {
                                if(this.orders[j].step[k].itemId.length){
                                    for (let l = 0; l < this.orders[j].step[k].itemId.length; l++) {
                                        if (this.orders[j].stepStatus == this.orders[j].step[k].step) {
                                            arr.push(this.orders[j].step[k].itemId[l].status);
                                        }
                                    }
                                }
                            }
                            if (this.activetab == 2) {
                                if (!(_.uniq(arr).length === 1 && arr[0] === 1)) {
                                    this.orders.splice(j, 1);
                                }
                            }
                            else if (this.activetab == 3) {
                                if(!arr.length){
                                    this.orders.splice(j, 1);
                                }
                                if (_.uniq(arr).length === 1 && arr[0] === 1) {
                                    this.orders.splice(j, 1);
                                }
                            }
                            let itemStatusDelivered = {};
                            let remTime = {};
                            if(this.orders[j]){
                                for (let m = 0; m < this.orders[j].step.length; m++) {
                                    let startTemp = [];
                                    for (let n = 0; n < this.orders[j].step[m].itemId.length; n++) {
                                        startTemp.push(this.orders[j].step[m].itemId[n].status);
                                    }
                                    itemStatusDelivered[this.orders[j].step[m].step] = startTemp.every(this.isEqualToOne);
                                }
                                this.itemStatusDelivered[this.orders[j]._id] = itemStatusDelivered;
                                for (let m = 0; m < this.orders[j].step.length; m++) {
                                    if (!this.itemStatusDelivered[this.orders[j]._id][this.orders[j].step[m].step]) {
                                        let temparray = this.orders[j].step[m].step.split(' ');
                                        let num = Number(temparray[1]);
                                        let temp = {
                                            tab: num - 1,
                                            step: this.orders[j].step[m].step,
                                        }
                                        this.stepdata[this.orders[j]._id] = temp;
                                        break;
                                    }
                                }
                            }                           
                            this.websocketService.orderId = '';
                        }
                        }
                    //     if(this.orders.length){
                    //     for (let i = 0; i < this.orders.length; i++) {
                    //         if (this.orders[i]._id == this.websocketService.orderId) {
                    //             let itemStatusDelivered = {};
                    //             let remTime = {};
                    //             for (let m = 0; m < this.orders[i].step.length; m++) {
                    //                 let startTemp = [];
                    //                 for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
                    //                     startTemp.push(this.orders[i].step[m].itemId[n].status);
                    //                 }
                    //                 itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);
                    //             }
                    //             this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                    //             for (let m = 0; m < this.orders[i].step.length; m++) {
                    //                 if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                    //                     let temparray = this.orders[i].step[m].step.split(' ');
                    //                     let num = Number(temparray[1]);
                    //                     let temp = {
                    //                         tab: num - 1,
                    //                         step: this.orders[i].step[m].step,
                    //                     }
                    //                     this.stepdata[this.orders[i]._id] = temp;
                    //                     break;
                    //                 }
                    //             }
                    //             for (let k = 0; k < this.orders[i].step.length; k++) {
                    //                 if (this.orders[i].step[k].preparationTime) {
                    //                     if ((this.orders[i].step[k].step == 'Uscita 1') && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                    //                         let seconds = this.orders[i].step[k].preparationTime * 60;
                    //                         let timeInterval = 1000;
                    //                         let m = this.orders[i].step[k].preparationTime - 1;
                    //                         let t = 0;
                    //                         let s = 60;
                    //                         var id = setInterval(() => {
                    //                             t = t + 1;
                    //                             seconds = seconds > 0 ? seconds - 1 : 0;
                    //                             s = s > 0 ? s - 1 : 0;
                    //                             if (seconds == 0) {
                    //                                 clearInterval(id);
                    //                             }
                    //                             if (t == 60) {
                    //                                 t = 0;
                    //                                 if (m == 0) {
                    //                                     m = 0;
                    //                                     s = 0;
                    //                                 } else {
                    //                                     m = m - 1;
                    //                                     s = 60;
                    //                                 }
                    //                             }
                    //                             var minutes = m;
                    //                             if (this.orders[i] && this.orders[i].step[k]) {

                    //                                 remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                    //                             }
                    //                         }, timeInterval);
                    //                     }
                    //                     else if ((this.orders[i].step[k].step != 'Uscita 1') && (this.orders[i].stepStatus == this.orders[i].step[k].step) && !this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[k].step]) {
                    //                         let seconds = this.orders[i].step[k].preparationTime * 60;
                    //                         let timeInterval = 1000;
                    //                         let m = this.orders[i].step[k].preparationTime - 1;
                    //                         let t = 0;
                    //                         let s = 60;
                    //                         var id = setInterval(() => {
                    //                             t = t + 1;
                    //                             seconds = seconds > 0 ? seconds - 1 : 0;
                    //                             s = s > 0 ? s - 1 : 0;
                    //                             if (seconds == 0) {
                    //                                 clearInterval(id);
                    //                             }
                    //                             if (t == 60) {
                    //                                 t = 0;
                    //                                 if (m == 0) {
                    //                                     m = 0;
                    //                                     s = 0;
                    //                                 } else {
                    //                                     m = m - 1;
                    //                                     s = 60;
                    //                                 }
                    //                             }
                    //                             var minutes = m;
                    //                             if (this.orders[i] && this.orders[i].step[k]) {

                    //                                 remTime[this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                    //                             }
                    //                         }, timeInterval);
                    //                     }
                    //                 }
                    //             }
                    //             this.remainingTime[this.orders[i]._id] = remTime;
                    //             this.websocketService.orderId = '';
                    //             break;
                    //         }
                    //     }
                    // }
                    }
                }
            }
            this.websocketService.socketEvent = false;
        }
    }

    public changeTab(tab) {
        this.changedTab = true;
        this.activetab = tab;
        this.websocketService.getOrders(this.activetab).then(data => {
            this.orders = data;
            if (this.orders.length) {
                this.itemStatusDelivered = [];
                for (let i = 0; i < this.orders.length; i++) {
                    if (this.orders[i]) {
                        let itemStatusDelivered = {};
                        for (let k = 0; k < this.orders[i].step.length; k++) {
                            let startTemp = [];
                            for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        for (let m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                let temparray = this.orders[i].step[m].step.split(' ');
                                let num = Number(temparray[1]);
                                let temp = {
                                    tab: num - 1,
                                    step: this.orders[i].step[m].step,
                                }
                                this.stepdata[this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                }
            }
            this.loadingOrders = false;
        })
            .catch(error => {
            });
    }
    public getItemCount() {

        var counter = 0;

        for (let i = 0; i < this.orders.length; i++) {
            for (let k = 0; k < this.orders[i].step.length; k++) {
                for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
         
                    counter += this.orders[i].step[k].itemId[l].quantity;
                }
            }
        }

        return counter;
    }
}