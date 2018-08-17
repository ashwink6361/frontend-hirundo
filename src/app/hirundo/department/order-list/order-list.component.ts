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
//     public clock: any;
//     public tick: any;
//     public loadingOrders: boolean = true;
//     public steps: Array<any> = [];
//     public activetab: boolean[] = [];
//     public stepdata: Array<any> = [];
//     public orderId: Array<any> = [];
//     public times: Array<any> = [];
//     public itemStatusStart: Array<any> = [];
//     public itemStatusDelivered: Array<any> = [];
//     public itemStatusRunning: Array<any> = [];   
//     public itemStatusCompleted: Array<any> = [];   
//     public completeButton = false;
//     public remainingTime: Array<any> = [];
//     public orderStepData: {};
//     public barWidth: Array<any> = [];
//     public id;
//     public itemsArray = [];
//     constructor(public websocketService: WebsocketService, public authGuard: AuthGuard, private differs: IterableDiffers) {
//         this.differ = differs.find([]).create(null);
//     }

//     ngOnInit() {
//         this.websocketService.getOrders().then(data => {
//             this.orders = data;
//             if (this.orders.length) {
//                 this.itemStatusStart = [];
//                 this.itemStatusDelivered = [];
//                 this.itemStatusRunning = [];                
//                 this.itemStatusCompleted = [];                
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let time = {};
//                     let remtime = {};
//                     let itemStatusStart = {};
//                     let itemStatusDelivered = {};
//                     let itemStatusRunning = {};
//                     let itemStatusCompleted = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let temp = [];
//                         let startTemp = [];                        
//                         for (let l = 0; l < this.orders[i].step[k].item.length; l++) {
//                             if (temp.indexOf(this.orders[i].step[k].item[l].id.preparationTime) < 0) {
//                                 temp.push(this.orders[i].step[k].item[l].id.preparationTime);
//                             }
//                             startTemp.push(this.orders[i].step[k].item[l].status);
//                         }
//                         time[this.orders[i].step[k].step] = Math.max(...temp);
//                         remtime[this.orders[i].step[k].step] = '0:00';
//                         itemStatusStart[this.orders[i].step[k].step] = startTemp.every(this.isEqualToZero);
//                         itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
//                         itemStatusRunning[this.orders[i].step[k].step] = startTemp.every(this.isEqualToFour);
//                         itemStatusCompleted[this.orders[i].step[k].step] = startTemp.every(this.isEqualToFive);
//                         if (startTemp.every(this.isEqualToOne)) {
//                             let temparray = this.orders[i].step[k].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let stepTemp = temparray[0] + ' ' + ++num;
//                             let temp = {
//                                 tab: num,
//                                 step: stepTemp,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                             this.itemsArray[this.orders[i]._id] = this.orders[i].step[k].item;                            
//                         } else {
//                             let tempp = {
//                                 tab: 0,
//                                 step: ''
//                             }
//                             tempp.tab = 0;
//                             tempp.step = this.orders[i].step[0].step;
//                             this.stepdata[this.orders[i]._id] = tempp;
//                             this.itemsArray[this.orders[i]._id] = this.orders[i].step[0].item;
//                         }
//                     }
//                     this.times[this.orders[i]._id] = time;
//                     this.remainingTime[this.orders[i]._id] = remtime; 
//                     this.itemStatusStart[this.orders[i]._id] = itemStatusStart;
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                     this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                   
//                     this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted; 
//                 }
//             }
//             this.loadingOrders = false;
//         })
//             .catch(error => {
//             });
//         this.tick = setInterval(() => {
//             this.clock = Date.now();
//         }, 1000);
//     }

//     isEqualToZero(currentValue) {
//         return currentValue == 0;
//     };
//     isEqualToOne(currentValue) {
//         return currentValue == 1;
//     };
//     isEqualToFour(currentValue) {
//         return currentValue == 4;
//     }; 
//     isEqualToFive(currentValue) {
//         return currentValue == 5;
//     };

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
//             case 5:
//                 str = 'Completed'; break;
//             default:
//                 break;
//         }
//         return str;
//     };

//     public updateOrder(order, time, status) {
//         order.status = status;
//         let items = [];
//         let ids = [];
//         for (let i = 0; i < order.item.length; i++) {
//             for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                 if (order.item[i].category == this.authGuard.getCurrentUser().category[k]) {
//                     items.push(order.item[i].id._id);
//                     ids.push(order.item[i]._id);                    
//                 }
//             }
//         }
//         let opts = {
//             status: status,
//             itemId: items,
//             id: ids
//         };
//         this.websocketService.updateOrder(order._id, opts).then(data => {
//             if (this.orders.length) {
//                 this.itemStatusStart = [];
//                 this.itemStatusDelivered = [];
//                 this.itemStatusRunning = [];
//                 this.itemStatusCompleted = [];

//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusStart = {};
//                     let itemStatusDelivered = {};
//                     let itemStatusRunning = {};
//                     let itemStatusCompleted = {};

//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         let startTemp = [];
//                         for (let n = 0; n < this.orders[i].step[m].item.length; n++) {
//                             startTemp.push(this.orders[i].step[m].item[n].status);
//                         }
//                         itemStatusStart[this.orders[i].step[m].step] = startTemp.every(this.isEqualToZero);      
//                         itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);                          
//                         itemStatusRunning[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFour);                          
//                         itemStatusCompleted[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFive);                          

//                     }
//                     this.itemStatusStart[this.orders[i]._id] = itemStatusStart;  
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;   
//                     this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                    
//                     this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted;                    

//                 }
//             }
//         }).catch(error => {
//         });
//     };

//     public updateItem(item, order, status) {
//         item.status = status;
//         let items = [];
//         let ids = [];        
//         items.push(item.id._id);
//         ids.push(item._id);                            
//         let opts = {
//             status: status,
//             itemId: items,
//             step: this.stepdata[order._id].step,
//             id: ids            
//         };
//         this.websocketService.updateOrder(order, opts).then(data => {
//             if (this.orders.length) {
//                 this.itemStatusStart = [];
//                 this.itemStatusDelivered = [];
//                 this.itemStatusRunning = [];
//                 this.itemStatusCompleted = [];

//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusStart = {};
//                     let itemStatusDelivered = {};
//                     let itemStatusRunning = {};
//                     let itemStatusCompleted = {};

//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         let startTemp = [];
//                         for (let n = 0; n < this.orders[i].step[m].item.length; n++) {
//                             startTemp.push(this.orders[i].step[m].item[n].status);
//                         }
//                         itemStatusStart[this.orders[i].step[m].step] = startTemp.every(this.isEqualToZero);      
//                         itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne); 
//                         itemStatusRunning[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFour);      
//                         itemStatusCompleted[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFive);      

//                     }
//                     this.itemStatusStart[this.orders[i]._id] = itemStatusStart;   
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
//                     this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                    
//                     this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted;                    


//                 }
//             }
//         }).catch(error => {
//         });
//     };

//     public updateStepItem(step, index, order, time, status) {
//         if (localStorage.getItem('step') != null) {
//             localStorage.removeItem('step');
//         }
//         localStorage.setItem('step', JSON.stringify(step));
//         let seconds = time * 60;
//         let timeInterval = 1000;
//         let m = time - 1;
//         let w = parseFloat((100 / seconds).toFixed(2));
//         let t = 0;
//         let s = 60;
//         var width = 0;
//         step = JSON.parse(localStorage.getItem('step'));  // Clones the object                
//         this.id = setInterval(() => {
//             step = JSON.parse(localStorage.getItem('step'));  // Clones the object        
//             if (step.status != 1 && step.status != 5 && step.step == this.stepdata[order._id].step) {
//                 t = t + 1;
//                 seconds = seconds - 1;
//                 s = s - 1;
//                 if (seconds == 0 && step.status != 1 && step.step == this.stepdata[order._id].step) {
//                     clearInterval(this.id);
//                     this.remainingTime[order._id][step.step] = '0:00';
//                     let items = [];
//                     let ids = [];                    
//                     this.completeButton = true;
//                     for (let i = 0; i < order.item.length; i++) {
//                         for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                             if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
//                                 if (order.item[i].step == this.stepdata[order._id].step) {
//                                     order.item[i].status = status;
//                                     if (items.indexOf(order.item[i].id._id) < 0) {
//                                         items.push(order.item[i].id._id);
//                                         ids.push(order.item[i]._id);                                        
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                     let temp = {
//                         status: 5,
//                         itemId: items,
//                         step: this.stepdata[order._id].step,
//                         id: ids
//                     };
//                     this.websocketService.updateOrder(order._id, temp).then(data => {
//                         order.status = data.data.status;
//                         for (let i = 0; i < this.orders.length; i++) {
//                             if (this.orders[i]._id == data.data._id) {
//                                 this.orders[i].step = data.data.step;
//                             }
//                         }
//                         for (let i = 0; i < data.data.step.length; i++) {
//                             if (data.data.step[i].step == step.step) {
//                                 step.status = data.data.step[i].status;
//                             }
//                         }
//                         if (this.orders.length) {
//                             this.itemStatusStart = [];
//                             this.itemStatusDelivered = [];
//                             this.itemStatusRunning = [];
//                             this.itemStatusCompleted = [];

//                             for (let i = 0; i < this.orders.length; i++) {
//                                 let itemStatusStart = {};
//                                 let itemStatusDelivered = {};
//                                 let itemStatusRunning = {};
//                                 let itemStatusCompleted = {};

//                                 for (let m = 0; m < this.orders[i].step.length; m++) {
//                                     let startTemp = [];
//                                     for (let n = 0; n < this.orders[i].step[m].item.length; n++) {
//                                         startTemp.push(this.orders[i].step[m].item[n].status);
//                                     }
//                                     itemStatusStart[this.orders[i].step[m].step] = startTemp.every(this.isEqualToZero);      
//                                     itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);      
//                                     itemStatusRunning[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFour);      
//                                     itemStatusCompleted[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFive);      

//                                 }
//                                 this.itemStatusStart[this.orders[i]._id] = itemStatusStart;    
//                                 this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;                    
//                                 this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                    
//                                 this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted;                    

//                             }
//                         }
//                     }).catch(error => {
//                     });
//                 }
//                 else {
//                     width = width + w;
//                     if (width < 100) {
//                         this.barWidth[step.step.replace(' ', '') + order._id + index] = width + '%';
//                     } else {
//                         this.barWidth[step.step.replace(' ', '') + order._id + index] = '100%';
//                     }
//                 }
//                 if (t == 60) {
//                     t = 0;
//                     if (m == 0) {
//                         m = 0;
//                         s = 0;
//                     } else {
//                         m = m - 1;
//                         s = 60;
//                     }
//                 }
//                 var minutes = m;
//                 this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
//             }
//         }, timeInterval);
//         let items = [];
//         let ids = [];                            
//         for (let i = 0; i < order.item.length; i++) {
//             for (let k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
//                 if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
//                     if (order.item[i].step == this.stepdata[order._id].step) {
//                         order.item[i].status = status;
//                         if (items.indexOf(order.item[i].id._id) < 0) {
//                             items.push(order.item[i].id._id);
//                             ids.push(order.item[i]._id);                            
//                         }
//                     }
//                 }
//             }
//         }
//         let opts = {
//             status: status,
//             itemId: items,
//             step: this.stepdata[order._id].step,
//             id: ids
//         };
//         this.websocketService.updateOrder(order._id, opts).then((data) => {
//             order.status = data.data.status;
//             order.step = data.data.step;
//             if (this.orders.length) {
//                 this.itemStatusStart = [];    
//                 this.itemStatusDelivered = []; 
//                 this.itemStatusRunning = [];                                                                                                                 
//                 this.itemStatusCompleted = [];                                                                                                                 

//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusStart = {};
//                     let itemStatusDelivered = {};
//                     let itemStatusRunning = {};
//                     let itemStatusCompleted = {};

//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         let startTemp = [];
//                         for (let n = 0; n < this.orders[i].step[m].item.length; n++) {
//                             startTemp.push(this.orders[i].step[m].item[n].status);
//                         }
//                         itemStatusStart[this.orders[i].step[m].step] = startTemp.every(this.isEqualToZero);   
//                         itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);      
//                         itemStatusRunning[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFour);      
//                         itemStatusCompleted[this.orders[i].step[m].step] = startTemp.every(this.isEqualToFive);      

//                     }
//                     this.itemStatusStart[this.orders[i]._id] = itemStatusStart;  
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                     this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                    
//                     this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted;                    

//                 }
//             }
//             for (let i = 0; i < data.data.step.length; i++) {
//                 if (data.data.step[i].step == step.step) {
//                     step.status = data.data.step[i].status;
//                     if (step.status == 5) {
//                         seconds = 0;
//                         timeInterval = 0;
//                         clearInterval(this.id);
//                         setTimeout(this.id.data.handleId);
//                         this.remainingTime[order._id][step.step] = '0:00';
//                     }
//                     localStorage.setItem('step',JSON.stringify(data.data.step[i]));
//                 }
//             }
//             if (order.step) {
//                 for (let j = 0; j < order.step.length - 1; j++) {
//                     if (order.step[j].status == 1) {
//                         let temparray = order.step[j].step.split(' ');
//                         let num = Number(temparray[1]);
//                         let stepTemp = temparray[0] + ' ' + ++num;
//                         let temp = {
//                             tab: num,
//                             step: stepTemp,
//                         }
//                         this.stepdata[order._id] = temp;
//                     }
//                 }
//             }
//             if (data.data.status == 1) {
//                 for (var i = 0; i < this.orders.length; i++) {
//                     if (data.data._id === this.orders[i]._id) {
//                         this.orders.splice(i, 1);
//                     }
//                 }
//             }
//         }).catch(error => {
//         });
//     };

//     showCompleteBtn(step, index, order, time) {
//         this.completeButton = true;
//     }

//     selectedTab(step, tab, orderId) {
//         let temp = {
//             tab: tab,
//             step: step.step
//         }
//         this.stepdata[orderId] = temp;
//         this.itemsArray[orderId] = step.item;                                    
//     }

//     ngDoCheck() {
//         if(this.orders && this.orders.length){
//             const change = this.differ.diff(this.orders);
//             if (change != null) {
//                 if (this.orders.length) {
//                     this.itemStatusStart = [];
//                     this.itemStatusDelivered = [];
//                     this.itemStatusRunning = [];                
//                     this.itemStatusCompleted = [];                
//                     for (let i = 0; i < this.orders.length; i++) {
//                         let time = {};
//                         let remtime = {};
//                         let itemStatusStart = {};
//                         let itemStatusDelivered = {};
//                         let itemStatusRunning = {};
//                         let itemStatusCompleted = {};
//                         for (let k = 0; k < this.orders[i].step.length; k++) {
//                             let temp = [];
//                             let startTemp = [];                        
//                             for (let l = 0; l < this.orders[i].step[k].item.length; l++) {
//                                 if (temp.indexOf(this.orders[i].step[k].item[l].id.preparationTime) < 0) {
//                                     temp.push(this.orders[i].step[k].item[l].id.preparationTime);
//                                 }
//                                 startTemp.push(this.orders[i].step[k].item[l].status);
//                             }
//                             time[this.orders[i].step[k].step] = Math.max(...temp);
//                             remtime[this.orders[i].step[k].step] = '0:00';
//                             itemStatusStart[this.orders[i].step[k].step] = startTemp.every(this.isEqualToZero);
//                             itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
//                             itemStatusRunning[this.orders[i].step[k].step] = startTemp.every(this.isEqualToFour);
//                             itemStatusCompleted[this.orders[i].step[k].step] = startTemp.every(this.isEqualToFive);
//                             if (startTemp.every(this.isEqualToOne)) {
//                                 let temparray = this.orders[i].step[k].step.split(' ');
//                                 let num = Number(temparray[1]);
//                                 let stepTemp = temparray[0] + ' ' + ++num;
//                                 let temp = {
//                                     tab: num,
//                                     step: stepTemp,
//                                 }
//                                 this.stepdata[this.orders[i]._id] = temp;
//                                 this.itemsArray[this.orders[i]._id] = this.orders[i].step[k].item;                                    
//                             } else {
//                                 let tempp = {
//                                     tab: 0,
//                                     step: ''
//                                 }
//                                 tempp.tab = 0;
//                                 tempp.step = this.orders[i].step[0].step;
//                                 this.stepdata[this.orders[i]._id] = tempp;
//                                 this.itemsArray[this.orders[i]._id] = this.orders[i].step[0].item;                                                                    
//                             }
//                         }
//                         this.times[this.orders[i]._id] = time;
//                         this.remainingTime[this.orders[i]._id] = remtime; 
//                         this.itemStatusStart[this.orders[i]._id] = itemStatusStart;
//                         this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                         this.itemStatusRunning[this.orders[i]._id] = itemStatusRunning;                   
//                         this.itemStatusCompleted[this.orders[i]._id] = itemStatusCompleted; 
//                     }
//                 }
//             }
//         }

//     }
// }

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
//     public clock: any;
//     public tick: any;
//     public loadingOrders: boolean = true;
//     public stepdata: Array<any> = [];
//     public itemStatusDelivered: Array<any> = [];
//     public activetab = 1;
//     constructor(public websocketService: WebsocketService, public authGuard: AuthGuard, private differs: IterableDiffers) {
//         this.differ = differs.find([]).create(null);
//     }

//     ngOnInit() {
//         this.activetab = 1;
//         this.websocketService.getOrders(this.activetab).then(data => {
//             this.orders = data;
//             if (this.orders.length) {
//                 this.itemStatusDelivered = [];
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusDelivered = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let startTemp = [];                        
//                         for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
//                             startTemp.push(this.orders[i].step[k].itemId[l].status);
//                         }
//                         itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
//                     }
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                     console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                             let temparray = this.orders[i].step[m].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let temp = {
//                                 tab: num - 1,
//                                 step: this.orders[i].step[m].step,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                             break;
//                         }
//                     }
//                 }
//             }
//             this.loadingOrders = false;
//         })
//             .catch(error => {
//             });
//         this.tick = setInterval(() => {
//             this.clock = Date.now();
//         }, 1000);
//     }

//     isEqualToOne(currentValue) {
//         return currentValue == 1;
//     };

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
//             case 5:
//                 str = 'Completed'; break;
//             default:
//                 break;
//         }
//         return str;
//     };

//     public updateItem(item, order) {
//         item.status = 1;
//         let ids = [];        
//         ids.push(item._id);                            
//         let opts = {
//             id: ids            
//         };
//         this.websocketService.updateOrder(order, opts).then(data => {
//             order = data.data;
//             if (this.orders.length) {
//                 this.itemStatusDelivered = [];
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusDelivered = {};
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         let startTemp = [];
//                         for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
//                             startTemp.push(this.orders[i].step[m].itemId[n].status);
//                         }
//                         itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne); 
//                     }
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
//                     console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                             let temparray = this.orders[i].step[m].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let temp = {
//                                 tab: num - 1,
//                                 step: this.orders[i].step[m].step,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                             break;
//                         }
//                     }
//                 }
//             }
//         }).catch(error => {
//         });
//     };

//     public updateStepItem(step, order) {
//         var result = confirm("Do you want to deliver?");
//         if (result) {
//             console.log(step, 'step udpate');
//             console.log(order, 'step udpate');
//             let ids = [];
//             for (let i = 0; i < step.itemId.length; i++) {
//                 step.itemId[i].status = 1;
//                 if (ids.indexOf(step.itemId[i]._id) < 0) {
//                     ids.push(step.itemId[i]._id);
//                 }
//             }
//             let opts = {
//                 id: ids
//             };
//             this.websocketService.updateOrder(order._id, opts).then((data) => {
//                 order = data.data;
//                 this.websocketService.getOrders(this.activetab).then(data => {
//                     this.orders = data;
//                     if (this.orders.length) {
//                         this.itemStatusDelivered = [];
//                         for (let i = 0; i < this.orders.length; i++) {
//                             let itemStatusDelivered = {};
//                             for (let k = 0; k < this.orders[i].step.length; k++) {
//                                 let startTemp = [];                        
//                                 for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
//                                     startTemp.push(this.orders[i].step[k].itemId[l].status);
//                                 }
//                                 itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
//                             }
//                             this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                             console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                             for (let m = 0; m < this.orders[i].step.length; m++) {
//                                 if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                                     let temparray = this.orders[i].step[m].step.split(' ');
//                                     let num = Number(temparray[1]);
//                                     let temp = {
//                                         tab: num - 1,
//                                         step: this.orders[i].step[m].step,
//                                     }
//                                     this.stepdata[this.orders[i]._id] = temp;
//                                     break;
//                                 }
//                             }
//                         }
//                     }
//                     this.loadingOrders = false;
//                 })
//                 .catch(error => {
//                 });
//             }).catch(error => {
//             });
//         }
//     };

//     selectedTab(step, tab, orderId) {
//         let temp = {
//             tab: tab,
//             step: step
//         }
//         this.stepdata[orderId] = temp;
//     }

//     getFirstChar(text){
//         return text.charAt();
//     }

//     updateDepartmentStatus(department, order, step){
//         let opts = {
//             step: step
//         };
//         this.websocketService.updateDepartmentStatus(order._id, opts).then((data) => {
//             department.status = 1;
//             order = data.data;
//             if (this.orders.length) {
//                 this.itemStatusDelivered = [];
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusDelivered = {};
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         let startTemp = [];
//                         for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
//                             startTemp.push(this.orders[i].step[m].itemId[n].status);
//                         }
//                         itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);
//                     }
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
//                     console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                             let temparray = this.orders[i].step[m].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let temp = {
//                                 tab: num - 1,
//                                 step: this.orders[i].step[m].step,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                             break;
//                         }
//                     }
//                 }
//             }
//         }).catch(error => {
//         });
//     }

//     // getFirstChar(text){
//     //     return text.charAt();
//     // }

//     ngDoCheck() {
//         if (this.orders && this.orders.length) {
//             const change = this.differ.diff(this.orders);
//             if (change != null) {
//                 if (this.orders.length) {
//                     this.itemStatusDelivered = [];
//                     for (let i = 0; i < this.orders.length; i++) {
//                         let itemStatusDelivered = {};
//                         for (let m = 0; m < this.orders[i].step.length; m++) {
//                             let startTemp = [];
//                             for (let n = 0; n < this.orders[i].step[m].itemId.length; n++) {
//                                 startTemp.push(this.orders[i].step[m].itemId[n].status);
//                             }
//                             itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne); 
//                         }
//                         this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
//                         console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                         for (let m = 0; m < this.orders[i].step.length; m++) {
//                             if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                                 let temparray = this.orders[i].step[m].step.split(' ');
//                                 let num = Number(temparray[1]);
//                                 let temp = {
//                                     tab: num - 1,
//                                     step: this.orders[i].step[m].step,
//                                 }
//                                 this.stepdata[this.orders[i]._id] = temp;
//                                 break;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     public changeTab(tab){
//         this.activetab = tab;
//         this.websocketService.getOrders(this.activetab).then(data => {
//             this.orders = data;
//             if (this.orders.length) {
//                 this.itemStatusDelivered = [];
//                 for (let i = 0; i < this.orders.length; i++) {
//                     let itemStatusDelivered = {};
//                     for (let k = 0; k < this.orders[i].step.length; k++) {
//                         let startTemp = [];                        
//                         for (let l = 0; l < this.orders[i].step[k].itemId.length; l++) {
//                             startTemp.push(this.orders[i].step[k].itemId[l].status);
//                         }
//                         itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
//                     }
//                     this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered; 
//                     console.log('this.itemStatusDelivered',this.itemStatusDelivered);
//                     for (let m = 0; m < this.orders[i].step.length; m++) {
//                         if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
//                             let temparray = this.orders[i].step[m].step.split(' ');
//                             let num = Number(temparray[1]);
//                             let temp = {
//                                 tab: num - 1,
//                                 step: this.orders[i].step[m].step,
//                             }
//                             this.stepdata[this.orders[i]._id] = temp;
//                             break;
//                         }
//                     }
//                 }
//             }
//             this.loadingOrders = false;
//         })
//         .catch(error => {
//         });
//     }
//     removeText(orderid,step){
//         for (let i = 0; i < this.orders.length; i++) {
//             for (let k = 0; k < this.orders[i].step.length; k++) {
//                 }

//         }
//         let timePeriodInMs = step.preparationTime*60*1000;
//         console.log('timePeriodInMs',timePeriodInMs);        
//         setTimeout(function() 
//         { 
//             document.getElementById(orderid+'_'+step.step.replace(' ','')).style.display = "none"; 
//         }, 
//         timePeriodInMs);
//     }
// }

// new code*************************************************************************
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
    }

    ngOnInit() {        
        this.activetab = 1;
        this.websocketService.getOrders(this.activetab).then(data => {
            this.audioPlay = localStorage.getItem('autoplay');
            console.log(this.audioPlay, 'audioplay');
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
                        console.log('ngOnInit this.itemStatusDelivered', this.itemStatusDelivered);
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
        item.status = 1;
        let ids = [];
        ids.push(item._id);
        let opts = {
            id: ids
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
                        console.log('updateItem this.itemStatusDelivered', this.itemStatusDelivered);
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
                                console.log('updateStepItem this.itemStatusDelivered', this.itemStatusDelivered);
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
        // let opts = {
        //     step: step
        // };
        this.websocketService.updateDepartmentStatus(order._id, opts).then((data) => {
            // department.status = 1;
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
                        console.log('updateDepartmentStatus this.itemStatusDelivered', this.itemStatusDelivered);
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

    ngDoCheck() {
        if (this.websocketService.socketEvent) {
            if (this.orders && this.orders.length) {
                const change = this.differ.diff(this.orders);
                if (change != null) {
                    if (this.orders.length) {
                        for (let i = 0; i < this.orders.length; i++) {
                            if (this.orders[i]._id == this.websocketService.orderId) {
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
                                console.log('ngDoCheck this.itemStatusDelivered', this.itemStatusDelivered);
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
                                this.websocketService.orderId = '';
                                break;
                            }
                        }
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
                        console.log('changeTab this.itemStatusDelivered', this.itemStatusDelivered);
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
}