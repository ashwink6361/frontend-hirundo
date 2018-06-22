webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\r\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-6 col-md-3\" *ngFor=\"let order of orders\">\r\n            <div class=\"card order-list\">\r\n                <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\r\n                    <h4 class=\"card-title\">\r\n                        <div>\r\n                            <img src=\"assets/images/table.png\" alt=\"\">\r\n                            <span>{{order.tableName}}/\r\n                                <span class=\"order-number\">N.{{order.orderId}}</span>\r\n                            </span>\r\n                        </div>\r\n                        <!-- <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div> -->\r\n                    </h4>\r\n                    <div class=\"card-text\">\r\n                        <p>\r\n                            <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\r\n                        <p>\r\n                            <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</p>\r\n                        <p>\r\n                            <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\r\n                    </div>\r\n                    <div class=\"step-listing\">\r\n                        <ul *ngIf=\"stepdata[order._id]\">\r\n                            <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\"\r\n                                [class.completed]=\"itemStatusDelivered[order._id] && itemStatusDelivered[order._id][step.step]\">{{step.step}}</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"order-items-container\">\r\n                        <div *ngFor=\"let step of order.step; let i= index\">\r\n                            <div *ngFor=\"let item of step.itemId\">\r\n                                <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\r\n                                    <!-- <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label> -->\r\n                                    <div class=\"order-item-img\">\r\n                                        {{item.quantity}} X\r\n                                    </div>\r\n                                    <div class=\"order-item-detail\">\r\n                                        {{item.id.name}}\r\n                                        <ul>\r\n                                            <li *ngFor=\"let varient of item.variant\">\r\n                                                <i *ngIf=\"varient.status == 1\">+</i>\r\n                                                <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\r\n                                            </li>\r\n                                        </ul>\r\n                                        <ul>\r\n                                            <li>\r\n                                                {{item.notes}}\r\n                                            </li>\r\n                                        </ul>\r\n                                    </div>\r\n                                    <div class=\"order-quantity d-flex w-105\">\r\n                                        <button type=\"button\" class=\"btn btn-floting update-order-btn\" *ngIf=\"(step.step == 'Uscita 1')\" (click)=\"updateItem(item, order._id, 2)\">\r\n                                            <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                                        </button>\r\n                                        <button type=\"button\" class=\"btn btn-floting update-order-btn\" *ngIf=\"(step.step != 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step] && stepdata[order._id] && (order.stepStatus == step.step)\" (click)=\"updateItem(item, order._id, 2)\">\r\n                                            <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                                        </button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\r\n                    <div *ngFor=\"let step of order.step\">\r\n                        <div *ngIf=\"stepdata[order._id].step == step.step\">\r\n                            <div class=\"department-checkbtn-container\">\r\n                                <span *ngFor=\"let department of step.department\">\r\n                                    <span class=\"department-checkbtn\" *ngIf=\"(step.step == 'Uscita 1') && (authGuard.getCurrentUser()._id == department.id._id) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                        [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\" (click)=\"updateDepartmentStatus(department,order,step.step)\">\r\n                                        <i class=\"fas fa-check-circle\"></i>\r\n                                    </span>\r\n                                    <span class=\"department-checkbtn\" *ngIf=\"(step.step != 'Uscita 1') && stepdata[order._id] && (order.stepStatus == step.step) && (authGuard.getCurrentUserId() == department.id._id) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                        [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\" (click)=\"updateDepartmentStatus(department,order,step.step)\">\r\n                                        <i class=\"fas fa-check-circle\"></i>\r\n                                    </span>\r\n                                    <span class=\"department-name\" [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\">{{getFirstChar(department.id.firstName)}}</span>\r\n                                </span>\r\n                            </div>\r\n                            <button type=\"submit\" *ngIf=\"stepdata[order._id] && (step.step == 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                            (click)=\"updateStepItem(step, order)\">Delivered</button>\r\n                            <button type=\"submit\" *ngIf=\"(step.step != 'Uscita 1') && stepdata[order._id] && (order.stepStatus == step.step) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                            (click)=\"updateStepItem(step, order)\">Delivered</button>\r\n                            <button class=\"bg-yellow\" *ngIf=\"(step.step != 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step] && stepdata[order._id] && (order.stepStatus != step.step)\"\r\n                                type=\"submit\" [disabled]=\"true\">To Call</button>\r\n                        </div>\r\n\r\n                        <!-- Modal -->\r\n\r\n                        <div class=\"modal fade modal-sm\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n                            <div class=\"modal-dialog\" role=\"document\">\r\n                                <div class=\"modal-content\">\r\n                                    <div class=\"modal-header\">\r\n                                        <h4 class=\"modal-title\" id=\"exampleModalLabel\">Confirm Deliver</h4>\r\n                                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                                            <span aria-hidden=\"true\">&times;</span>\r\n                                        </button>\r\n                                    </div>\r\n                                    <div class=\"modal-body\">\r\n\r\n                                    </div>\r\n                                    <div class=\"modal-footer\">\r\n                                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n                                        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"updateStepItem(step, order)\">Confirm</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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



var OrderListComponent = /** @class */ (function () {
    function OrderListComponent(websocketService, authGuard, differs) {
        this.websocketService = websocketService;
        this.authGuard = authGuard;
        this.differs = differs;
        this.orders = [];
        this.loadingOrders = true;
        this.stepdata = [];
        this.itemStatusDelivered = [];
        this.differ = differs.find([]).create(null);
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    var itemStatusDelivered = {};
                    for (var k = 0; k < _this.orders[i].step.length; k++) {
                        var startTemp = [];
                        for (var l = 0; l < _this.orders[i].step[k].itemId.length; l++) {
                            startTemp.push(_this.orders[i].step[k].itemId[l].status);
                        }
                        itemStatusDelivered[_this.orders[i].step[k].step] = startTemp.every(_this.isEqualToOne);
                    }
                    _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                    console.log('this.itemStatusDelivered', _this.itemStatusDelivered);
                    for (var m = 0; m < _this.orders[i].step.length; m++) {
                        if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                            var temparray = _this.orders[i].step[m].step.split(' ');
                            var num = Number(temparray[1]);
                            var temp = {
                                tab: num - 1,
                                step: _this.orders[i].step[m].step,
                            };
                            _this.stepdata[_this.orders[i]._id] = temp;
                            break;
                        }
                    }
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
        });
        this.tick = setInterval(function () {
            _this.clock = Date.now();
        }, 1000);
    };
    OrderListComponent.prototype.isEqualToOne = function (currentValue) {
        return currentValue == 1;
    };
    ;
    OrderListComponent.prototype.getOrderStatus = function (status) {
        var str = 'In progress';
        switch (status) {
            case 0:
                str = 'New order';
                break;
            case 1:
                str = 'Delivered';
                break;
            case 2:
                str = 'Prepared';
                break;
            case 3:
                str = 'Cancelled';
                break;
            case 4:
                str = 'In progress';
                break;
            case 5:
                str = 'Completed';
                break;
            default:
                break;
        }
        return str;
    };
    ;
    OrderListComponent.prototype.updateItem = function (item, order) {
        var _this = this;
        item.status = 1;
        var ids = [];
        ids.push(item._id);
        var opts = {
            id: ids
        };
        this.websocketService.updateOrder(order, opts).then(function (data) {
            order = data.data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    var itemStatusDelivered = {};
                    for (var m = 0; m < _this.orders[i].step.length; m++) {
                        var startTemp = [];
                        for (var n = 0; n < _this.orders[i].step[m].itemId.length; n++) {
                            startTemp.push(_this.orders[i].step[m].itemId[n].status);
                        }
                        itemStatusDelivered[_this.orders[i].step[m].step] = startTemp.every(_this.isEqualToOne);
                    }
                    _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                    console.log('this.itemStatusDelivered', _this.itemStatusDelivered);
                    for (var m = 0; m < _this.orders[i].step.length; m++) {
                        if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                            var temparray = _this.orders[i].step[m].step.split(' ');
                            var num = Number(temparray[1]);
                            var temp = {
                                tab: num - 1,
                                step: _this.orders[i].step[m].step,
                            };
                            _this.stepdata[_this.orders[i]._id] = temp;
                            break;
                        }
                    }
                }
            }
        }).catch(function (error) {
        });
    };
    ;
    OrderListComponent.prototype.updateStepItem = function (step, order) {
        var _this = this;
        var result = confirm("Do you want to deliver?");
        if (result) {
            console.log(step, 'step udpate');
            console.log(order, 'step udpate');
            var ids = [];
            for (var i = 0; i < step.itemId.length; i++) {
                step.itemId[i].status = 1;
                if (ids.indexOf(step.itemId[i]._id) < 0) {
                    ids.push(step.itemId[i]._id);
                }
            }
            var opts = {
                id: ids
            };
            this.websocketService.updateOrder(order._id, opts).then(function (data) {
                order = data.data;
                if (_this.orders.length) {
                    _this.itemStatusDelivered = [];
                    for (var i = 0; i < _this.orders.length; i++) {
                        var itemStatusDelivered = {};
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            var startTemp = [];
                            for (var n = 0; n < _this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(_this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[_this.orders[i].step[m].step] = startTemp.every(_this.isEqualToOne);
                        }
                        _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                        console.log('this.itemStatusDelivered', _this.itemStatusDelivered);
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                var temparray = _this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: _this.orders[i].step[m].step,
                                };
                                _this.stepdata[_this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                    // var minutes = m;
                    // this.remainingTime[order._id][this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
                }
            }).catch(function (error) {
            });
        }
    };
    ;
    OrderListComponent.prototype.selectedTab = function (step, tab, orderId) {
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    OrderListComponent.prototype.getFirstChar = function (text) {
        return text.charAt();
    };
    OrderListComponent.prototype.updateDepartmentStatus = function (department, order, step) {
        var _this = this;
        var opts = {
            step: step
        };
        this.websocketService.updateDepartmentStatus(order._id, opts).then(function (data) {
            department.status = 1;
            order = data.data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    var itemStatusDelivered = {};
                    for (var m = 0; m < _this.orders[i].step.length; m++) {
                        var startTemp = [];
                        for (var n = 0; n < _this.orders[i].step[m].itemId.length; n++) {
                            startTemp.push(_this.orders[i].step[m].itemId[n].status);
                        }
                        itemStatusDelivered[_this.orders[i].step[m].step] = startTemp.every(_this.isEqualToOne);
                    }
                    _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                    console.log('this.itemStatusDelivered', _this.itemStatusDelivered);
                    for (var m = 0; m < _this.orders[i].step.length; m++) {
                        if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                            var temparray = _this.orders[i].step[m].step.split(' ');
                            var num = Number(temparray[1]);
                            var temp = {
                                tab: num - 1,
                                step: _this.orders[i].step[m].step,
                            };
                            _this.stepdata[_this.orders[i]._id] = temp;
                            break;
                        }
                    }
                }
            }
        }).catch(function (error) {
        });
    };
    // getFirstChar(text){
    //     return text.charAt();
    // }
    OrderListComponent.prototype.ngDoCheck = function () {
        if (this.orders && this.orders.length) {
            var change = this.differ.diff(this.orders);
            if (change != null) {
                if (this.orders.length) {
                    this.itemStatusDelivered = [];
                    for (var i = 0; i < this.orders.length; i++) {
                        var itemStatusDelivered = {};
                        for (var m = 0; m < this.orders[i].step.length; m++) {
                            var startTemp = [];
                            for (var n = 0; n < this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[this.orders[i].step[m].step] = startTemp.every(this.isEqualToOne);
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        console.log('this.itemStatusDelivered', this.itemStatusDelivered);
                        for (var m = 0; m < this.orders[i].step.length; m++) {
                            if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                var temparray = this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: this.orders[i].step[m].step,
                                };
                                this.stepdata[this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], OrderListComponent.prototype, "orders", void 0);
    OrderListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-order-list',
            template: __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */]) === "function" && _c || Object])
    ], OrderListComponent);
    return OrderListComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=order-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderListModule", function() { return OrderListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_list_component__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_list_routes__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_list_service__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__orderby__ = __webpack_require__("../../../../../src/app/hirundo/orderby.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var OrderListModule = /** @class */ (function () {
    function OrderListModule() {
    }
    OrderListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__order_list_routes__["a" /* OrderListRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__order_list_component__["a" /* OrderListComponent */], __WEBPACK_IMPORTED_MODULE_6__orderby__["a" /* OrderByPipe */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NO_ERRORS_SCHEMA */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__service_websocket_service__["a" /* WebsocketService */],
                __WEBPACK_IMPORTED_MODULE_4__order_list_service__["a" /* OrderListService */]
            ],
        })
    ], OrderListModule);
    return OrderListModule;
}());

//# sourceMappingURL=order-list.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_list_component__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__order_list_component__["a" /* OrderListComponent */] }
];
var OrderListRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=order-list.routes.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderListService = /** @class */ (function () {
    function OrderListService(http) {
        var _this = this;
        this.http = http;
        this.orderList = [];
        var url = '/api/department/orders';
        this.http.get(url).toPromise()
            .then(function (data) {
            var res = data.json();
            _this.orderList = res.data;
        })
            .catch(function (error) {
            _this.orderList = [];
        });
    }
    OrderListService.prototype.setOrder = function (data) {
        this.orderList.push(data);
    };
    OrderListService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.hasOwnProperty('error')) {
            if (body.error.message === 'Token is required') {
                this.logout();
            }
            else {
                return Promise.resolve(body || {});
            }
        }
        else {
            return Promise.resolve(body || {});
        }
    };
    OrderListService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        if (error.status === 400 || error.status === 401) {
            return Promise.reject(body.message || error);
        }
        else {
            this.logout();
        }
    };
    OrderListService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    OrderListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], OrderListService);
    return OrderListService;
    var _a;
}());

//# sourceMappingURL=order-list.service.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/orderby.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//The pipe class implements the PipeTransform interface's transform method that accepts an input value and an optional array of parameters and returns the transformed value.

//We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library.
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        if (typeof args[0] === "undefined") {
            return array;
        }
        var direction = args[0][0];
        var column = args.replace('-', '');
        array.sort(function (a, b) {
            var left = Number(new Date(a[column]));
            var right = Number(new Date(b[column]));
            return (direction === "-") ? right - left : left - right;
        });
        return array;
    };
    OrderByPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({
            //The @Pipe decorator takes an object with a name property whose value is the pipe name that we'll use within a template expression. It must be a valid JavaScript identifier. Our pipe's name is orderby.
            name: "orderby"
        })
    ], OrderByPipe);
    return OrderByPipe;
}());

//# sourceMappingURL=orderby.js.map

/***/ })

});
//# sourceMappingURL=order-list.module.chunk.js.map