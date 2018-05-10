webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div> -->\n<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <div class=\"card order-list\" *ngFor=\"let order of orders | orderby: '-created_at'\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</div>\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div>\n            <div class=\"step-listing\">\n                <ul *ngIf=\"stepdata[order._id]\">\n                    <li *ngFor=\"let step of steps[order._id]; let i = index;\" (click)=\"selectedTab(steps[order._id][i].value,i,order._id)\" [class.active]=\"steps[order._id][i].value == stepdata[order._id].step\">{{step.value}}</li>\n                </ul>\n            </div>\n            <div class=\"order-items-container\">\n                <div *ngFor=\"let item of order.item\">\n                    <div *ngIf=\"((item.department.indexOf(authGuard.getCurrentUser()._id)) > -1) || ((authGuard.getCurrentUser().category.indexOf(item.category)) > -1)\">\n                        <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\n                            <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\n                            <div class=\"order-item-img\">\n                                {{item.quantity}} X\n                            </div>\n                            <div class=\"order-item-detail\">\n                                {{item.id.name}}\n                                <ul>\n                                    <li *ngFor=\"let varient of item.variant\">\n                                        <i *ngIf=\"varient.status == 1\">+</i>\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"order-quantity d-flex w-105\">\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 2)\">\n                                    <img src=\"assets/images/order-deliver.png\" alt=\"\" />\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 4)\">\n                                    <i class=\"fas fa-sync-alt\"></i>\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 3)\">\n                                    <i class=\"fas fa-times\"></i>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!-- <div class=\"btn-container\">\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 4)\">In Progress</button>\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 2)\">Done</button>\n            </div> -->\n        </div>\n        <div class=\"order-call-btn\">\n            <button *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" (click)=\"updateStepItem(order, times[order._id][stepdata[order._id].step], 4)\" [disabled]=\"order.status == 4\"><span *ngIf=\"order.status == 0\">Start ({{times[order._id][stepdata[order._id].step]}}:00)</span><span *ngIf=\"order.status == 4\">Running {{remainingTime[order._id][stepdata[order._id].step]}}</span></button>\n            <button *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" (click)=\"updateStepItem(order, times[order._id][stepdata[order._id].step], 1)\">Delivered</button>\n            <div *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" id=\"{{stepdata[order._id].step}}\" class=\"progress-btn\"></div>\n            <button *ngIf=\"stepdata[order._id] && showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" [disabled]=\"true\">To Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\n        </div>\n    </div>\n</div>\n<!-- </div> -->\n"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrderListComponent = /** @class */ (function () {
    // public remainingTime: Array<any> = ['0:00'];
    // public showDeliveredButton: boolean[] = [false]; 
    // public showToCall: boolean[] = [false];     
    // public times = {};          
    function OrderListComponent(websocketService, authGuard) {
        this.websocketService = websocketService;
        this.authGuard = authGuard;
        this.orders = [];
        this.loadingOrders = true;
        this.steps = [];
        this.activetab = [];
        this.stepdata = [];
        this.orderId = [];
        this.times = [];
        this.showDeliveredButton = [];
        this.showToCall = [];
        this.remainingTime = [];
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                for (var i = 0; i < _this.orders.length; i++) {
                    _this.orderId.push(_this.orders[i]._id);
                    var step = [];
                    for (var j = 0; j < _this.orders[i].item.length; j++) {
                        if (((_this.orders[i].item[j].department.indexOf(_this.authGuard.getCurrentUser()._id)) > -1) || ((_this.authGuard.getCurrentUser().category.indexOf(_this.orders[i].item[j].category)) > -1)) {
                            if (step.length) {
                                for (var b = 0; b < step.length; b++) {
                                    if (step[b].value !== _this.orders[i].item[j].step) {
                                        var key = _this.orders[i].item[j].step.split(' ');
                                        var newKey = Number(key[1]);
                                        var value = _this.orders[i].item[j].step;
                                        step.push({ id: newKey, value: value });
                                    }
                                }
                            }
                            if (!step.length) {
                                var key = _this.orders[i].item[j].step.split(' ');
                                var newKey = Number(key[1]);
                                var value = _this.orders[i].item[j].step;
                                step.push({ id: newKey, value: value });
                            }
                        }
                    }
                    step.sort(function (a, b) {
                        return a.id - b.id;
                    });
                    step = __WEBPACK_IMPORTED_MODULE_3_lodash__["uniqBy"](step, 'value');
                    _this.steps[_this.orders[i]._id] = step;
                    var time = {};
                    var delivered = {};
                    var call = {};
                    var remtime = {};
                    for (var k = 0; k < _this.steps[_this.orders[i]._id].length; k++) {
                        var temp = [];
                        for (var l = 0; l < _this.orders[i].item.length; l++) {
                            if (_this.orders[i].item[l].step == _this.steps[_this.orders[i]._id][k].value && temp.indexOf(_this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(_this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[_this.steps[_this.orders[i]._id][k].value] = Math.max.apply(Math, temp);
                        delivered[_this.steps[_this.orders[i]._id][k].value] = false;
                        call[_this.steps[_this.orders[i]._id][k].value] = false;
                        remtime[_this.steps[_this.orders[i]._id][k].value] = '0:00';
                    }
                    _this.times[_this.orders[i]._id] = time;
                    _this.showDeliveredButton[_this.orders[i]._id] = delivered;
                    _this.showToCall[_this.orders[i]._id] = call;
                    _this.remainingTime[_this.orders[i]._id] = remtime;
                }
                if (_this.orderId && _this.orderId.length) {
                    for (var k = 0; k < _this.orderId.length; k++) {
                        var temp = {
                            tab: 0,
                            step: ''
                        };
                        temp.tab = 0;
                        temp.step = _this.steps[_this.orderId[k]][0].value;
                        _this.stepdata[_this.orderId[k]] = temp;
                    }
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
            console.log('error', error);
        });
        this.tick = setInterval(function () {
            _this.clock = Date.now();
        }, 1000);
    };
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
            default:
                break;
        }
        return str;
    };
    ;
    OrderListComponent.prototype.updateOrder = function (order, time, status) {
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
        var items = [];
        for (var i = 0; i < order.item.length; i++) {
            for (var k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (order.item[i].category == this.authGuard.getCurrentUser().category[k]) {
                    items.push(order.item[i].id._id);
                }
            }
        }
        var opts = {
            status: status,
            itemId: items
        };
        this.websocketService.updateOrder(order._id, opts).then(function (data) {
            console.log("updateOrder dept Order updated++++++++++++++++", data);
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    OrderListComponent.prototype.updateItem = function (item, order, status) {
        item.status = status;
        var items = [];
        items.push(item.id._id);
        var opts = {
            status: status,
            itemId: items,
            step: this.stepdata[order._id].step
        };
        this.websocketService.updateOrder(order, opts).then(function (data) {
            console.log("updateItem dept item updated+++++++++++++", data);
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    OrderListComponent.prototype.updateStepItem = function (order, time, status) {
        var _this = this;
        this.showToCall[order._id][this.stepdata[order._id].step] = false;
        var m = time - 1;
        var seconds = time * 60;
        var w = parseFloat((100 / seconds).toFixed(2));
        var timeInterval = 1000;
        var t = 0;
        var s = 60;
        var elem = document.getElementById(this.stepdata[order._id].step);
        var width = 0;
        var id = setInterval(function () {
            t = t + 1;
            seconds = seconds - 1;
            s = s - 1;
            if (seconds == 0 || seconds < 0) {
                clearInterval(id);
                _this.showDeliveredButton[order._id][_this.stepdata[order._id].step] = true;
            }
            else {
                width = width + w;
                console.log(width);
                if (width < 100) {
                    elem.style.width = width + '%';
                }
                else {
                    elem.style.width = '100%';
                }
                _this.showDeliveredButton[order._id][_this.stepdata[order._id].step] = false;
            }
            if (t == 60) {
                t = 0;
                s = 60;
                m = m - 1;
            }
            var minutes = m;
            var seconds = s;
            _this.remainingTime[order._id][_this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (seconds < 10 ? ('0' + seconds) : seconds);
        }, timeInterval);
        var items = [];
        for (var i = 0; i < order.item.length; i++) {
            for (var k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                    if (order.item[i].step == this.stepdata[order._id].step) {
                        order.item[i].status = status;
                        if (items.indexOf(order.item[i].id._id) < 0) {
                            items.push(order.item[i].id._id);
                        }
                    }
                }
            }
        }
        var opts = {
            status: status,
            itemId: items,
            step: this.stepdata[order._id].step
        };
        this.websocketService.updateOrder(order._id, opts).then(function (data) {
            console.log("update step Item dept item updated+++++++++++++", data);
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    OrderListComponent.prototype.selectedTab = function (step, tab, orderId) {
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    OrderListComponent.prototype.updateDeliveredOrder = function (order) {
        var _this = this;
        console.log(order, 'order ++++++');
        var items = [];
        for (var i = 0; i < order.item.length; i++) {
            for (var k = 0; k < this.authGuard.getCurrentUser().category.length; k++) {
                if (((order.item[i].department.indexOf(this.authGuard.getCurrentUser()._id)) > -1) || ((this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                    if (order.item[i].step == this.stepdata[order._id].step) {
                        items.push(order.item[i].id._id);
                    }
                }
            }
        }
        var opts = {
            step: this.stepdata[order._id].step,
            item: items
        };
        this.websocketService.updateDeliveredOrder(order._id, opts).then(function (data) {
            console.log("updateDeliveredOrder dept Order updated++++++++++++++++", data);
            _this.showToCall[order._id][_this.stepdata[order._id].step] = true;
            // this.showDeliveredButton[order._id][this.stepdata[order._id].step] = false;
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    OrderListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-order-list',
            template: __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object])
    ], OrderListComponent);
    return OrderListComponent;
    var _a, _b;
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