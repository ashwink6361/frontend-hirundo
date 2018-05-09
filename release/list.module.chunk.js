webpackJsonp(["list.module"],{

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <!-- <div *ngIf=\"orders && orders.length\"> -->\n    <div class=\"card order-list\" *ngFor=\"let order of orders\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\" [class.disabled]=\"order.status == 1 || order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}</span>\n                </div>\n                <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <i class=\"far fa-clock\"></i>\n                    <span>{{order.created_at | date:'hh:mm a'}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div>\n            <div class=\"step-listing\">\n                <ul *ngIf=\"stepdata[order._id]\">\n                    <li *ngFor=\"let step of steps[order._id]; let i = index;\" (click)=\"selectedTab(steps[order._id][i],i,order._id)\" [class.active]=\"steps[order._id][i] == stepdata[order._id].step\">{{step}}</li>\n                </ul>\n            </div>\n            <div class=\"order-items-container\">\n                <div *ngFor=\"let item of order.item\">\n                    <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\n                        <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label>\n                        <div class=\"order-item-img\">\n                            {{item.quantity}} X\n                        </div>\n                        <div class=\"order-item-detail\">\n                            {{item.id.name}}\n                            <ul>\n                                <li *ngFor=\"let varient of item.variant\">\n                                    <i *ngIf=\"varient.status == 1\">+</i>\n                                    <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                </li>\n                            </ul>\n                        </div>\n                        <div class=\"order-quantity d-flex\">\n                            <!-- <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 1)\">\n                                <img src=\"assets/images/order-deliver.png\" alt=\"\" />\n                            </button>\n                            <button type=\"button\" class=\"btn btn-floting update-order-btn\" (click)=\"updateItem(item, order._id, 3)\">\n                                <i class=\"fas fa-times\"></i>\n                            </button> -->\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!-- <div class=\"btn-container d-flex justify-content-between\">\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 1)\">Delivered</button>\n                </div> -->\n        </div>\n        <div class=\"order-call-btn\">\n            <button *ngIf=\"stepdata[order._id]\" type=\"submit\" (click)=\"updateOrder(order, 1)\">Call ({{times[order._id][stepdata[order._id].step]}}:00)</button>\n        </div>\n    </div>\n    <!-- </div> -->\n</div>\n"

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
    function ListComponent(websocketService, globalService, router) {
        this.websocketService = websocketService;
        this.globalService = globalService;
        this.router = router;
        this.orders = [];
        this.loadingOrders = true;
        this.steps = [];
        this.activetab = [];
        this.stepdata = [];
        this.orderId = [];
        this.times = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.websocketService.getWaiterOrders().then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                for (var i = 0; i < _this.orders.length; i++) {
                    _this.orderId.push(_this.orders[i]._id);
                    var step = [];
                    // let time = [];                    
                    for (var j = 0; j < _this.orders[i].item.length; j++) {
                        if (step.indexOf(_this.orders[i].item[j].step) < 0) {
                            step.push(_this.orders[i].item[j].step);
                        }
                        // time.push(this.orders[i].item[j].id.preparationTime);
                    }
                    _this.steps[_this.orders[i]._id] = step;
                    // this.times[this.orders[i]._id] = Math.max(...time);
                    var time = {};
                    for (var k = 0; k < _this.steps[_this.orders[i]._id].length; k++) {
                        var temp = [];
                        for (var l = 0; l < _this.orders[i].item.length; l++) {
                            if (_this.orders[i].item[l].step == _this.steps[_this.orders[i]._id][k] && temp.indexOf(_this.orders[i].item[l].id.preparationTime) < 0) {
                                temp.push(_this.orders[i].item[l].id.preparationTime);
                            }
                        }
                        console.log('temp', temp);
                        time[_this.steps[_this.orders[i]._id][k]] = Math.max.apply(Math, temp);
                        console.log('time', time);
                    }
                    _this.times[_this.orders[i]._id] = time;
                    console.log('this.times', _this.times);
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
    ListComponent.prototype.selectedTab = function (step, tab, orderId) {
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
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object])
    ], ListComponent);
    return ListComponent;
    var _a, _b, _c;
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