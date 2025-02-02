webpackJsonp(["list.module"],{

/***/ "../../../../../src/app/hirundo/waiter/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"loader text-center\" *ngIf=\"loadingOrders\"><img src=\"assets/images/loader.gif\"></div>\n<div *ngIf=\"!loadingOrders\">\n<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container\">\n    <div class=\"card order-list\" *ngFor=\"let order of orders\">\n        <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\n            <h4 class=\"card-title\">\n                <div>\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span>{{order.tableName}}/<span class=\"order-number\">N.{{order.orderId}}</span></span>\n                </div>\n                <!-- <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div> -->\n            </h4>\n            <div class=\"card-text\">\n                <p>\n                    <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\n                <p>\n                    <i class=\"far fa-clock\"></i>\n                    <span>{{order.created_at | date:'hh:mm a'}}</span>\n                </p>\n                <p>\n                    <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\n            </div>\n            <div class=\"step-listing\">\n                <ul *ngIf=\"stepdata[order._id]\">\n                    <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\" [class.completed]=\"(itemStatusDelivered[order._id] && itemStatusDelivered[order._id][step.step]) || (step.step == 'Uscita 1')\">{{step.step}}</li>\n                </ul>\n            </div>\n            <div class=\"order-items-container\">\n                <div *ngFor=\"let step of order.step\">\n                    <div *ngFor=\"let item of step.itemId\">\n                        <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\">\n                            <!-- <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label> -->\n                            <div class=\"order-item-img\">\n                                {{item.quantity}} X\n                            </div>\n                            <div class=\"order-item-detail\">\n                                {{item.id.name}}\n                                <ul>\n                                    <li *ngFor=\"let varient of item.variant\">\n                                        <i *ngIf=\"varient.status == 1\">+</i>\n                                        <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\n                                    </li>\n                                </ul>\n                                <ul>\n                                    <li>\n                                        {{item.notes}}\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"order-quantity d-flex\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\n            <div *ngFor=\"let step of order.step; let indx = index;\">\n                <div *ngIf=\"stepdata[order._id].step == step.step\">\n                    <button *ngIf=\"stepdata[order._id] && stepdata[order._id].step != 'Uscita 1' && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step] && showToCall[order._id] && showToCall[order._id][step.step]\" type=\"submit\" (click)=\"changeStep(order, step.step)\">Call</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n</div>\n"

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
                        // call[this.orders[i].step[k].step] = true;                           
                        if (_this.orders[i].step[k].step == _this.orders[i].stepStatus) {
                            call[_this.orders[i].step[k].step] = false;
                        }
                        else {
                            call[_this.orders[i].step[k].step] = true;
                        }
                    }
                    _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                    _this.showToCall[_this.orders[i]._id] = call;
                    if (_this.orders[i].step.length > 2) {
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                if (_this.orders[i].step[m].step != 'Uscita 1') {
                                    var temparray = _this.orders[i].step[m].step.split(' ');
                                    var num = Number(temparray[1]);
                                    var temp = {
                                        tab: num - 1,
                                        step: _this.orders[i].step[m].step,
                                    };
                                    _this.stepdata[_this.orders[i]._id] = temp;
                                    break;
                                }
                                else {
                                    var temp = {
                                        tab: 1,
                                        step: _this.orders[i].step[1].step,
                                    };
                                    _this.stepdata[_this.orders[i]._id] = temp;
                                    break;
                                }
                            }
                        }
                    }
                    if (_this.orders[i].step.length == 2) {
                        var tempp = {
                            tab: 1,
                            step: _this.orders[i].step[1].step
                        };
                        _this.stepdata[_this.orders[i]._id] = tempp;
                    }
                    if (_this.orders[i].step.length == 1) {
                        var tempp = {
                            tab: 0,
                            step: _this.orders[i].step[0].step
                        };
                        _this.stepdata[_this.orders[i]._id] = tempp;
                    }
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
                            // call[this.orders[i].step[k].step] = true;   
                            if (this.orders[i].step[k].step == this.orders[i].stepStatus) {
                                call[this.orders[i].step[k].step] = false;
                            }
                            else {
                                call[this.orders[i].step[k].step] = true;
                            }
                        }
                        this.itemStatusDelivered[this.orders[i]._id] = itemStatusDelivered;
                        this.showToCall[this.orders[i]._id] = call;
                        if (this.orders[i].step.length > 2) {
                            for (var m = 0; m < this.orders[i].step.length; m++) {
                                if (!this.itemStatusDelivered[this.orders[i]._id][this.orders[i].step[m].step]) {
                                    if (this.orders[i].step[m].step != 'Uscita 1') {
                                        var temparray = this.orders[i].step[m].step.split(' ');
                                        var num = Number(temparray[1]);
                                        var temp = {
                                            tab: num - 1,
                                            step: this.orders[i].step[m].step,
                                        };
                                        this.stepdata[this.orders[i]._id] = temp;
                                        break;
                                    }
                                    else {
                                        var temp = {
                                            tab: 1,
                                            step: this.orders[i].step[1].step,
                                        };
                                        this.stepdata[this.orders[i]._id] = temp;
                                        break;
                                    }
                                }
                            }
                        }
                        if (this.orders[i].step.length == 2) {
                            var tempp = {
                                tab: 1,
                                step: this.orders[i].step[1].step
                            };
                            this.stepdata[this.orders[i]._id] = tempp;
                        }
                        if (this.orders[i].step.length == 1) {
                            var tempp = {
                                tab: 0,
                                step: this.orders[i].step[0].step
                            };
                            this.stepdata[this.orders[i]._id] = tempp;
                        }
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