webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div> -->\n<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <div class=\"card order-list\" *ngFor=\"let order of orders | orderby: '-created_at'\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</div>\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div>\n            <div class=\"step-listing\">\n                <ul *ngIf=\"stepdata[order._id]\">\n                    <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\" [class.completed]=\"step.status == 1\">{{step.step}}</li>\n                </ul>\n            </div>\n            <div class=\"order-items-container\">\n                <div *ngFor=\"let item of order.item\">\n                    <div *ngIf=\"((item.department.indexOf(authGuard.getCurrentUser()._id)) > -1) || ((authGuard.getCurrentUser().category.indexOf(item.category)) > -1)\">\n                        <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\n                            <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\n                            <div class=\"order-item-img\">\n                                {{item.quantity}} X\n                            </div>\n                            <div class=\"order-item-detail\">\n                                {{item.id.name}}\n                                <ul>\n                                    <li *ngFor=\"let varient of item.variant\">\n                                        <i *ngIf=\"varient.status == 1\">+</i>\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"order-quantity d-flex w-105\">\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 2)\">\n                                    <img src=\"assets/images/order-deliver.png\" alt=\"\" />\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 4)\">\n                                    <i class=\"fas fa-sync-alt\"></i>\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 3)\">\n                                    <i class=\"fas fa-times\"></i>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!-- <div class=\"btn-container\">\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 4)\">In Progress</button>\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 2)\">Done</button>\n            </div> -->\n        </div>\n        <!-- <div class=\"order-call-btn\">\n            <button *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" (click)=\"updateStepItem(order, times[order._id][stepdata[order._id].step], 4)\" [disabled]=\"order.status == 4\"><span *ngIf=\"order.status == 0\">Start ({{times[order._id][stepdata[order._id].step]}}:00)</span><span *ngIf=\"order.status == 4\">Running {{remainingTime[order._id][stepdata[order._id].step]}}</span></button>\n            <button *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" (click)=\"updateStepItem(order, times[order._id][stepdata[order._id].step], 1)\">Delivered</button>\n            <div *ngIf=\"stepdata[order._id] && !showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" id=\"{{order._id}}_{{stepdata[order._id].step}}\" class=\"progress-btn\"></div>\n            <button *ngIf=\"stepdata[order._id] && showToCall[order._id][stepdata[order._id].step] && !showDeliveredButton[order._id][stepdata[order._id].step]\" type=\"submit\" [disabled]=\"true\">To Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\n        </div> -->\n        <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\n            <div *ngFor=\"let step of order.step; let indx = index;\">\n                <div *ngIf=\"stepdata[order._id].step == step.step\">\n                    <button type=\"submit\" *ngIf=\"stepdata[order._id] && (order.stepStatus == stepdata[order._id].step) && (step.status != 4) && (step.status != 5)\" (click)=\"updateStepItem(step,indx, order, times[order._id][stepdata[order._id].step], 4)\">Start ({{times[order._id][stepdata[order._id].step]}}:00)</button>                    \n                    <button type=\"submit\" *ngIf=\"step.status == 0 && (step.step == 'Uscita 1')\" (click)=\"updateStepItem(step,indx, order, times[order._id][stepdata[order._id].step], 4)\">Start ({{times[order._id][stepdata[order._id].step]}}:00)</button>\n                    <div class=\"running-label\" *ngIf=\"stepdata[order._id] && (step.step == stepdata[order._id].step) && (step.status == 4)\"><span class=\"running\">Running {{remainingTime[order._id][stepdata[order._id].step]}}</span></div>\n                    <button *ngIf=\"stepdata[order._id] && (step.step == stepdata[order._id].step) && (step.status == 5)\" type=\"submit\" (click)=\"updateStepItem(step,indx, order, times[order._id][stepdata[order._id].step], 1)\">Completed</button>\n                    <div *ngIf=\"stepdata[order._id] && (step.step == stepdata[order._id].step) && (step.status == 4)\" id=\"{{step.step.replace(' ','')+order._id+indx}}\" [ngStyle]=\"{'width': barWidth[step.step.replace(' ','')+order._id+indx]}\" class=\"progress-btn\"></div>\n                    <button class=\"bg-yellow\" *ngIf=\"stepdata[order._id] && (step.step != 'Uscita 1') && (step.status == 0) && (order.stepStatus != stepdata[order._id].step)\" type=\"submit\" [disabled]=\"true\">To Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- </div> -->\n\n\n<!-- <div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <div class=\"card order-list\" *ngFor=\"let order of orders | orderby: '-created_at'\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</div>\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div> -->\n            <!-- <div class=\"step-listing\">\n                <ul>\n                    <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step,i,order)\" [class.active]=\"step.active\" [class.completed]=\"step.status == 1\">{{step.step}}</li>\n                </ul>\n            </div> -->\n            <!-- <div class=\"order-items-container\" *ngFor=\"let step of order.step; let i = index;\">\n                <div class=\"step-listing\">\n                    <ul>\n                        <li (click)=\"selectedTab(step,i,order)\" [class.active]=\"step.active\" [class.completed]=\"step.status == 1\">{{step.step}}</li>\n                    </ul>\n                </div>\n                <div *ngFor=\"let item of order.item\">\n                    <div *ngIf=\"((item.department.indexOf(authGuard.getCurrentUser()._id)) > -1) || ((authGuard.getCurrentUser().category.indexOf(item.category)) > -1)\">\n                        <div class=\"order-item\" *ngIf=\"item.step == step.step\">\n                            <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\n                            <div class=\"order-item-img\">\n                                {{item.quantity}} X\n                            </div>\n                            <div class=\"order-item-detail\">\n                                {{item.id.name}}\n                                <ul>\n                                    <li *ngFor=\"let varient of item.variant\">\n                                        <i *ngIf=\"varient.status == 1\">+</i>\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"order-quantity d-flex w-105\">\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(step.step,item, order._id, 2)\">\n                                    <img src=\"assets/images/order-deliver.png\" alt=\"\" />\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(step.step,item, order._id, 4)\">\n                                    <i class=\"fas fa-sync-alt\"></i>\n                                </button>\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(step.step,item, order._id, 3)\">\n                                    <i class=\"fas fa-times\"></i>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\n            <div *ngFor=\"let step of order.step; let indx = index;\">\n                <div *ngIf=\"step.active\">\n                    <button type=\"submit\" *ngIf=\"step.status == 0\" (click)=\"updateStepItem(step.step,indx, order, times[order._id][step.step], 4)\">Start ({{times[order._id][step.step]}}:00)</button>\n                    <div class=\"running-label\" *ngIf=\"step.active && (step.status == 4)\"><span class=\"running\">Running {{remainingTime[order._id][step.step]}}</span></div>\n                    <button *ngIf=\"step.active && (step.status == 5)\" type=\"submit\" (click)=\"updateStepItem(step.step,indx, order, times[order._id][step.step], 1)\">Completed</button>\n                    <div *ngIf=\"step.active && (step.status == 4)\" id=\"{{step.step.replace(' ','')+order._id+indx}}\" [ngStyle]=\"{'width': barWidth[step.step.replace(' ','')+order._id+indx]}\" class=\"progress-btn\"></div>\n                    <button class=\"bg-yellow\" *ngIf=\"step.active && (step.status == 1)\" type=\"submit\" [disabled]=\"true\">To Call ({{times[order._id][step.step]}}:00)</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n -->\n"

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
    function OrderListComponent(websocketService, authGuard, differs) {
        this.websocketService = websocketService;
        this.authGuard = authGuard;
        this.differs = differs;
        this.orders = [];
        this.loadingOrders = true;
        this.steps = [];
        this.activetab = [];
        this.stepdata = [];
        this.orderId = [];
        this.times = [];
        // public showDeliveredButton: Array<any> = [];
        // public showToCall: Array<any> = [];
        this.remainingTime = [];
        this.barWidth = [];
        this.differ = differs.find([]).create(null);
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                for (var i = 0; i < _this.orders.length; i++) {
                    var time = {};
                    var remtime = {};
                    for (var k = 0; k < _this.orders[i].step.length; k++) {
                        var temp = [];
                        for (var l = 0; l < _this.orders[i].item.length; l++) {
                            if (_this.orders[i].item[l].step == _this.orders[i].step[k].step && temp.indexOf(_this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(_this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[_this.orders[i].step[k].step] = Math.max.apply(Math, temp);
                        remtime[_this.orders[i].step[k].step] = '0:00';
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
                    _this.times[_this.orders[i]._id] = time;
                    _this.remainingTime[_this.orders[i]._id] = remtime;
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
    OrderListComponent.prototype.updateStepItem = function (step, index, order, time, status) {
        var _this = this;
        var m = time - 1;
        var seconds = time * 60;
        var w = parseFloat((100 / seconds).toFixed(2));
        var timeInterval = 1000;
        var t = 0;
        var s = 60;
        var width = 0;
        var id = setInterval(function () {
            if (order.status != 1 && step.step == _this.stepdata[order._id].step) {
                t = t + 1;
                seconds = seconds - 1;
                s = s - 1;
                if (seconds == 0 && order.status != 1 && step.step == _this.stepdata[order._id].step) {
                    clearInterval(id);
                    var items_1 = [];
                    for (var i = 0; i < order.item.length; i++) {
                        for (var k = 0; k < _this.authGuard.getCurrentUser().category.length; k++) {
                            if (((order.item[i].department.indexOf(_this.authGuard.getCurrentUser()._id)) > -1) || ((_this.authGuard.getCurrentUser().category.indexOf(order.item[i].category)) > -1)) {
                                if (order.item[i].step == _this.stepdata[order._id].step) {
                                    order.item[i].status = status;
                                    if (items_1.indexOf(order.item[i].id._id) < 0) {
                                        items_1.push(order.item[i].id._id);
                                    }
                                }
                            }
                        }
                    }
                    var temp = {
                        status: 5,
                        itemId: items_1,
                        step: _this.stepdata[order._id].step
                    };
                    _this.websocketService.updateOrder(order._id, temp).then(function (data) {
                        order.status = data.data.status;
                        for (var i = 0; i < _this.orders.length; i++) {
                            if (_this.orders[i]._id == data.data._id) {
                                _this.orders[i].step = data.data.step;
                            }
                        }
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                }
                else {
                    width = width + w;
                    if (width < 100) {
                        _this.barWidth[step.step.replace(' ', '') + order._id + index] = width + '%';
                    }
                    else {
                        _this.barWidth[step.step.replace(' ', '') + order._id + index] = '100%';
                    }
                }
                if (t == 60) {
                    t = 0;
                    if (m == 0) {
                        m = 0;
                        s = 0;
                    }
                    else {
                        m = m - 1;
                        s = 60;
                    }
                }
                var minutes = m;
                _this.remainingTime[order._id][_this.stepdata[order._id].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s < 10 ? ('0' + s) : s);
            }
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
            order.status = data.data.status;
            order.step = data.data.step;
            if (order.step) {
                for (var j = 0; j < order.step.length - 1; j++) {
                    if (order.step[j].status == 1) {
                        var temparray = order.step[j].step.split(' ');
                        var num = Number(temparray[1]);
                        var stepTemp = temparray[0] + ' ' + ++num;
                        var temp = {
                            tab: num,
                            step: stepTemp,
                        };
                        _this.stepdata[order._id] = temp;
                    }
                }
            }
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
    OrderListComponent.prototype.ngDoCheck = function () {
        var change = this.differ.diff(this.orders);
        if (change != null) {
            if (this.orders.length) {
                for (var i = 0; i < this.orders.length; i++) {
                    var time = {};
                    var remtime = {};
                    for (var k = 0; k < this.orders[i].step.length; k++) {
                        var temp = [];
                        for (var l = 0; l < this.orders[i].item.length; l++) {
                            if (this.orders[i].item[l].step == this.orders[i].step[k].step && temp.indexOf(this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        time[this.orders[i].step[k].step] = Math.max.apply(Math, temp);
                        remtime[this.orders[i].step[k].step] = '0:00';
                        var tempp = {
                            tab: 0,
                            step: ''
                        };
                        tempp.tab = 0;
                        tempp.step = this.orders[i].step[0].step;
                        this.stepdata[this.orders[i]._id] = tempp;
                    }
                    this.times[this.orders[i]._id] = time;
                    this.remainingTime[this.orders[i]._id] = remtime;
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