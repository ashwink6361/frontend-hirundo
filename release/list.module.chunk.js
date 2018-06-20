webpackJsonp(["list.module"],{

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <!-- <div *ngIf=\"orders && orders.length\"> -->\n    <div class=\"card order-list\" *ngFor=\"let order of orders\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}/<span class=\"order-number\">N.{{order.orderId}}</span></span>\n                </div>\n                <!-- <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div> -->\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <i class=\"far fa-clock\"></i>\n                    <span>{{order.created_at | date:'hh:mm a'}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div>\n            <div class=\"step-listing\">\n                <ul *ngIf=\"stepdata[order._id]\">\n                    <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\" [class.completed]=\"showToCall[order._id] && !showToCall[order._id][step.step] || step.step == 'Uscita 1'\">{{step.step}}</li>\n                </ul>\n            </div>\n            <div class=\"order-items-container\">\n                <div *ngFor=\"let step of order.step\">\n                    <div *ngFor=\"let item of step.itemId\">\n                        <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\n                            <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\n                            <div class=\"order-item-img\">\n                                {{item.quantity}} X\n                            </div>\n                            <div class=\"order-item-detail\">\n                                {{item.id.name}}\n                                <ul>\n                                    <li *ngFor=\"let varient of item.variant\">\n                                        <i *ngIf=\"varient.status == 1\">+</i>\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                    </li>\n                                </ul>\n                                <ul>\n                                    <li>\n                                        {{item.notes}}\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"order-quantity d-flex\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\n            <div *ngFor=\"let step of order.step; let indx = index;\">\n                <div *ngIf=\"stepdata[order._id].step == step.step\">\n                    <button *ngIf=\"stepdata[order._id] && stepdata[order._id].step != 'Uscita 1' && showToCall[order._id] && showToCall[order._id][step.step]\" type=\"submit\" (click)=\"changeStep(order, step.step)\">Call</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- </div> -->\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
// import { Component, OnInit, IterableDiffers, Input, DoCheck } from '@angular/core';
// import { WebsocketService } from '../../../service/websocket.service';
// import { Router } from '@angular/router';
// import { GlobalService } from '../../global.service'
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
// import *  as _ from 'lodash';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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





var ListComponent = /** @class */ (function () {
    function ListComponent(websocketService, globalService, router, differs) {
        this.websocketService = websocketService;
        this.globalService = globalService;
        this.router = router;
        this.differs = differs;
        this.orders = [];
        this.loadingOrders = true;
        this.stepdata = [];
        this.itemStatusDelivered = [];
        this.showToCall = [];
        this.differ = differs.find([]).create(null);
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getWaiterOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    var itemStatusDelivered = {};
                    var call = {};
                    for (var k = 0; k < _this.orders[i].step.length; k++) {
                        var startTemp = [];
                        for (var l = 0; l < _this.orders[i].step[k].itemId.length; l++) {
                            startTemp.push(_this.orders[i].step[k].itemId[l].status);
                        }
                        itemStatusDelivered[_this.orders[i].step[k].step] = startTemp.every(_this.isEqualToOne);
                        call[_this.orders[i].step[k].step] = true;
                        if (startTemp.every(_this.isEqualToOne)) {
                            var temparray = _this.orders[i].step[k].step.split(' ');
                            var num = Number(temparray[1]);
                            var stepTemp = temparray[0] + ' ' + ++num;
                            var temp = {
                                tab: Number(temparray[1]),
                                step: stepTemp,
                            };
                            _this.stepdata[_this.orders[i]._id] = temp;
                        }
                        else {
                            var tempp = {
                                tab: 0,
                                step: ''
                            };
                            if (_this.orders[i].step.length > 1) {
                                tempp.tab = 1;
                                tempp.step = _this.orders[i].step[1].step;
                            }
                            else {
                                tempp.tab = 0;
                                tempp.step = _this.orders[i].step[0].step;
                            }
                            _this.stepdata[_this.orders[i]._id] = tempp;
                        }
                    }
                    _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                    _this.showToCall[_this.orders[i]._id] = call;
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
        });
    };
    ListComponent.prototype.isEqualToOne = function (currentValue) {
        return currentValue == 1;
    };
    ;
    ListComponent.prototype.getOrderStatus = function (status) {
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
            default:
                break;
        }
        return str;
    };
    ;
    ListComponent.prototype.changeStep = function (order, step) {
        var _this = this;
        var items = [];
        var opts = {
            step: step
        };
        this.websocketService.changeOrderStep(order._id, opts).then(function (data) {
            _this.showToCall[order._id][step] = false;
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
                }
            }
        }).catch(function (error) {
        });
    };
    ;
    ListComponent.prototype.selectedTab = function (step, tab, orderId) {
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    ListComponent.prototype.ngDoCheck = function () {
        if (this.orders && this.orders.length) {
            var change = this.differ.diff(this.orders);
            if (change != null) {
                if (this.orders.length) {
                    this.itemStatusDelivered = [];
                    for (var i = 0; i < this.orders.length; i++) {
                        var itemStatusDelivered = {};
                        var call = {};
                        for (var k = 0; k < this.orders[i].step.length; k++) {
                            var startTemp = [];
                            for (var l = 0; l < this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[this.orders[i].step[k].step] = startTemp.every(this.isEqualToOne);
                            call[this.orders[i].step[k].step] = true;
                            if (startTemp.every(this.isEqualToOne)) {
                                var temparray = this.orders[i].step[k].step.split(' ');
                                var num = Number(temparray[1]);
                                var stepTemp = temparray[0] + ' ' + ++num;
                                var temp = {
                                    tab: Number(temparray[1]),
                                    step: stepTemp,
                                };
                                this.stepdata[this.orders[i]._id] = temp;
                            }
                            else {
                                var tempp = {
                                    tab: 0,
                                    step: ''
                                };
                                if (this.orders[i].step.length > 1) {
                                    tempp.tab = 1;
                                    tempp.step = this.orders[i].step[1].step;
                                }
                                else {
                                    tempp.tab = 0;
                                    tempp.step = this.orders[i].step[0].step;
                                }
                                this.stepdata[this.orders[i]._id] = tempp;
                            }
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        this.showToCall[this.orders[i]._id] = call;
                    }
                }
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "orders", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */]) === "function" && _d || Object])
    ], ListComponent);
    return ListComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=list.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/list/list.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__list_routes__["a" /* ListRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */]]
        })
    ], ListModule);
    return ListModule;
}());

//# sourceMappingURL=list.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/list/list.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__list_component__["a" /* ListComponent */] }
];
var ListRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=list.routes.js.map

/***/ })

});
//# sourceMappingURL=list.module.chunk.js.map