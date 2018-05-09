webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div> -->\r\n<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\r\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\r\n    <div class=\"card order-list\" *ngFor=\"let order of orders | orderby: '-created_at'\">\r\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\r\n            <h4 class=\"card-title\">\r\n                <div>\r\n                    <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</div>\r\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\r\n            </h4>\r\n            <div class=\"card-text\">\r\n                <p>\r\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\r\n                <p>\r\n                    <img src=\"assets/images/table.png\" alt=\"\">\r\n                    <span>{{order.tableName}}</span>\r\n                </p>\r\n                <p>\r\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\r\n            </div>\r\n            <div class=\"step-listing\">\r\n                <ul *ngIf=\"stepdata[order._id]\">\r\n                    <li *ngFor=\"let step of steps[order._id]; let i = index;\" (click)=\"selectedTab(steps[order._id][i],i,order._id)\" [class.active]=\"steps[order._id][i] == stepdata[order._id].step\">{{step}}</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"order-items-container\">\r\n                <div *ngFor=\"let item of order.item\">\r\n                    <div *ngIf=\"((item.department.indexOf(authGuard.getCurrentUser()._id)) > -1) || ((authGuard.getCurrentUser().category.indexOf(item.category)) > -1)\">\r\n                        <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\r\n                            <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\r\n                            <div class=\"order-item-img\">\r\n                                {{item.quantity}} X\r\n                            </div>\r\n                            <div class=\"order-item-detail\">\r\n                                {{item.id.name}}\r\n                                <ul>\r\n                                    <li *ngFor=\"let varient of item.variant\">\r\n                                        <i *ngIf=\"varient.status == 1\">+</i>\r\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"order-quantity d-flex w-105\">\r\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 2)\">\r\n                                    <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                                </button>\r\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 4)\">\r\n                                    <i class=\"fas fa-sync-alt\"></i>\r\n                                </button>\r\n                                <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 3)\">\r\n                                    <i class=\"fas fa-times\"></i>\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- <div class=\"btn-container\">\r\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\r\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 4)\">In Progress</button>\r\n                <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 2)\">Done</button>\r\n            </div> -->\r\n        </div>\r\n        <div class=\"order-call-btn\">\r\n            <button *ngIf=\"!showToCall[order._id] && !showDeliveredButton[order._id]\" type=\"submit\" (click)=\"updateOrder(order, times[order._id], 4)\" [disabled]=\"order.status == 4\"><span *ngIf=\"order.status == 0\">Start ({{times[order._id]}}:00)</span><span *ngIf=\"order.status == 4\">Running {{remainingTime[order._id]}}</span></button>\r\n            <button *ngIf=\"!showToCall[order._id] && showDeliveredButton[order._id]\" type=\"submit\" (click)=\"updateDeliveredOrder(order)\">Delivered</button>\r\n            <div *ngIf=\"!showToCall[order._id] && !showDeliveredButton[order._id]\" id=\"{{order._id}}\" class=\"progress-btn\"></div>\r\n            <button *ngIf=\"showToCall[order._id] && !showDeliveredButton[order._id]\" type=\"submit\" [disabled]=\"true\">To Call ({{times[order._id]}}:00)</button>\r\n       \r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- </div> -->\r\n"

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
        this.remainingTime = ['0:00'];
        this.showDeliveredButton = [false];
        this.showToCall = [false];
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                for (var i = 0; i < _this.orders.length; i++) {
                    _this.orderId.push(_this.orders[i]._id);
                    var step = [];
                    var time = [];
                    for (var j = 0; j < _this.orders[i].item.length; j++) {
                        if (step.indexOf(_this.orders[i].item[j].step) < 0) {
                            step.push(_this.orders[i].item[j].step);
                        }
                        time.push(_this.orders[i].item[j].id.preparationTime);
                    }
                    _this.steps[_this.orders[i]._id] = step;
                    _this.times[_this.orders[i]._id] = Math.max.apply(Math, time);
                    // for (let k = 0; k < this.steps[this.orders[i]._id].length; k++) {
                    // let time = {};
                    // let temp = [];                                                                
                    //     for (let l = 0; l < this.orders[i].item.length; l++) {
                    //         if(this.orders[i].item[l].step == this.steps[this.orders[i]._id][k]){
                    //             temp.push(this.orders[i].item[l].id.preparationTime);
                    //         }
                    //     }
                    //     console.log('temp',temp);
                    //     time[this.steps[this.orders[i]._id][k]] = Math.max(...temp);                        
                    //     console.log('time',time);                        
                    //     this.times[this.orders[i]._id] = time;                        
                    // }
                    // console.log('this.times',this.times);
                }
                // this.activetab[0] = true;
                if (_this.orderId && _this.orderId.length) {
                    for (var k = 0; k < _this.orderId.length; k++) {
                        var temp = {
                            tab: 0,
                            step: ''
                        };
                        temp.tab = 0;
                        temp.step = _this.steps[_this.orderId[k]][0];
                        _this.stepdata[_this.orderId[k]] = temp;
                    }
                }
                // this.stepdata = {
                //     tab: 0,
                //     step: this.steps[this.orderId[0]][0]
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
        var _this = this;
        this.showToCall[order._id] = false;
        var m = time - 1;
        var seconds = time * 60;
        var w = parseFloat((100 / seconds).toFixed(2));
        var timeInterval = 1000;
        var t = 0;
        var s = 60;
        var elem = document.getElementById(order._id);
        var width = 0;
        var id = setInterval(function () {
            t = t + 1;
            seconds = seconds - 1;
            s = s - 1;
            if (seconds == 0 || seconds < 0) {
                clearInterval(id);
                _this.showDeliveredButton[order._id] = true;
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
                _this.showDeliveredButton[order._id] = false;
            }
            if (t == 60) {
                t = 0;
                s = 60;
                m = m - 1;
            }
            var minutes = m;
            var seconds = s;
            _this.remainingTime[order._id] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (seconds < 10 ? ('0' + seconds) : seconds);
        }, timeInterval);
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
            itemId: items
        };
        this.websocketService.updateOrder(order, opts).then(function (data) {
            console.log("updateItem dept item updated+++++++++++++", data);
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    ;
    OrderListComponent.prototype.selectedTab = function (step, tab, orderId) {
        // this.activetab[tab] = true;
        // for (let i = 0; i < this.activetab.length; i++) {
        //   if (i != tab) {
        //     this.activetab[i] = false;
        //   }
        // }
        // this.stepdata = {
        //   tab: tab,
        //   step: this.steps[orderId][tab]
        // }
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    OrderListComponent.prototype.updateDeliveredOrder = function (order) {
        var _this = this;
        console.log(order, 'order ++++++');
        var opts = {
            step: this.stepdata[order._id].step,
        };
        this.websocketService.updateDeliveredOrder(order._id, opts).then(function (data) {
            console.log("updateDeliveredOrder dept Order updated++++++++++++++++", data);
            _this.showToCall[order._id] = true;
            _this.showDeliveredButton[order._id] = false;
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