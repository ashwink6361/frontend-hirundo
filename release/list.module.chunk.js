webpackJsonp(["list.module"],{

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\r\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\r\n    <!-- <div *ngIf=\"orders && orders.length\"> -->\r\n    <div class=\"card order-list\" *ngFor=\"let order of orders\">\r\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\r\n            <h4 class=\"card-title\">\r\n                <div>\r\n                    <img src=\"assets/images/table.png\" alt=\"\">\r\n                    <span>{{order.tableName}}</span>\r\n                </div>\r\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\r\n            </h4>\r\n            <div class=\"card-text\">\r\n                <p>\r\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\r\n                <p>\r\n                    <i class=\"far fa-clock\"></i>\r\n                    <span>{{order.created_at | date:'hh:mm a'}}</span>\r\n                </p>\r\n                <p>\r\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\r\n            </div>\r\n            <div class=\"step-listing\">\r\n                <ul *ngIf=\"stepdata[order._id]\">\r\n                    <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\" [class.completed]=\"step.status == 1\">{{step.step}}</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"order-items-container\">\r\n                <div *ngFor=\"let item of order.item\">\r\n                    <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\r\n                        <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\r\n                        <div class=\"order-item-img\">\r\n                            {{item.quantity}} X\r\n                        </div>\r\n                        <div class=\"order-item-detail\">\r\n                            {{item.id.name}}\r\n                            <ul>\r\n                                <li *ngFor=\"let varient of item.variant\">\r\n                                    <i *ngIf=\"varient.status == 1\">+</i>\r\n                                    <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"order-quantity d-flex\">\r\n                            <!-- <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 1)\">\r\n                                <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                            </button>\r\n                            <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 3)\">\r\n                                <i class=\"fas fa-times\"></i>\r\n                            </button> -->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- <div class=\"btn-container d-flex justify-content-between\">\r\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\r\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 1)\">Delivered</button>\r\n                </div> -->\r\n        </div>\r\n        <!-- <div class=\"order-call-btn\">\r\n            <button *ngIf=\"stepdata[order._id] && stepdata[order._id].step != 'Uscita 1' \" type=\"submit\" (click)=\"changeStep(order, stepdata[order._id].step)\">Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\r\n        </div> -->\r\n        <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\r\n            <div *ngFor=\"let step of order.step; let indx = index;\">\r\n                <div *ngIf=\"stepdata[order._id].step == step.step\">\r\n                    <button *ngIf=\"stepdata[order._id] && stepdata[order._id].step != 'Uscita 1' && step.status != 1\" type=\"submit\" (click)=\"changeStep(order, stepdata[order._id].step)\">Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- </div> -->\r\n</div>\r\n"

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListComponent = /** @class */ (function () {
    function ListComponent(websocketService, globalService, router, differs) {
        this.websocketService = websocketService;
        this.globalService = globalService;
        this.router = router;
        this.differs = differs;
        this.orders = [];
        // public orders: Array<any> = [];
        this.loadingOrders = true;
        this.steps = [];
        this.activetab = [];
        this.stepdata = [];
        this.orderId = [];
        this.times = [];
        this.differ = differs.find([]).create(null);
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getWaiterOrders().then(function (data) {
            _this.orders = data;
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
            if (_this.orders.length) {
                for (var i = 0; i < _this.orders.length; i++) {
                    var time = {};
                    for (var k = 0; k < _this.orders[i].step.length; k++) {
                        var temp = [];
                        for (var l = 0; l < _this.orders[i].item.length; l++) {
                            if (_this.orders[i].item[l].step == _this.orders[i].step[k].step && temp.indexOf(_this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(_this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[_this.orders[i].step[k].step] = Math.max.apply(Math, temp);
                        if (_this.orders[i].step[k].status == 1) {
                            var temparray = _this.orders[i].step[k].step.split(' ');
                            var num = Number(temparray[1]);
                            var stepTemp = temparray[0] + ' ' + ++num;
                            var temp_1 = {
                                tab: num,
                                step: stepTemp,
                            };
                            _this.stepdata[_this.orders[i]._id] = temp_1;
                        }
                        else {
                            var tempp = {
                                tab: 0,
                                step: ''
                            };
                            tempp.tab = 0;
                            tempp.step = _this.orders[i].step[0].step;
                            _this.stepdata[_this.orders[i]._id] = tempp;
                        }
                    }
                    _this.times[_this.orders[i]._id] = time;
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
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
    ListComponent.prototype.updateOrder = function (order, status) {
        order.status = status;
        var items = [];
        for (var i = 0; i < order.item.length; i++) {
            items.push(order.item[i].id._id);
        }
        var opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateOrder(order._id, opts).then(function (data) {
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    ListComponent.prototype.updateItem = function (item, order, status) {
        item.status = status;
        var items = [];
        items.push(item.id._id);
        var opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateWaiterOrder(order, opts).then(function (data) {
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    ListComponent.prototype.changeStep = function (order, step) {
        var items = [];
        var opts = {
            step: step
        };
        this.websocketService.changeOrderStep(order._id, opts).then(function (data) {
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    ListComponent.prototype.selectedTab = function (step, tab, orderId) {
        console.log('step', step);
        console.log('tab', tab);
        console.log('orderId', orderId);
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    ListComponent.prototype.ngDoCheck = function () {
        var change = this.differ.diff(this.orders);
        if (change != null) {
            if (this.orders.length) {
                for (var i = 0; i < this.orders.length; i++) {
                    var time = {};
                    for (var k = 0; k < this.orders[i].step.length; k++) {
                        var temp = [];
                        for (var l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max.apply(Math, temp);
                        var tempp = {
                            tab: 0,
                            step: ''
                        };
                        tempp.tab = 0;
                        tempp.step = this.orders[i].step[0].step;
                        this.stepdata[this.orders[i]._id] = tempp;
                    }
                    this.times[this.orders[i]._id] = time;
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