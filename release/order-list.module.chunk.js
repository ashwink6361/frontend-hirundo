webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"text-center\" *ngIf=\"loadingOrders\">Loading...</div>\r\n    <div *ngIf=\"!loadingOrders\">\r\n        <div class=\"card order-list\" *ngFor=\"let order of orders | orderby: '-created_at'\">\r\n            <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\r\n                <h4 class=\"card-title\">\r\n                    <div>\r\n                        <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</div>\r\n                    <div class=\"status\" [class.bg-red]=\"order.status == 0\" [class.bg-green]=\"order.status == 2\" [class.bg-yellow]=\"order.status == 4\">{{getOrderStatus(order.status)}}</div>\r\n                </h4>\r\n                <div class=\"card-text\">\r\n                    <p>\r\n                        <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\r\n                    <p>\r\n                        <img src=\"assets/images/table.png\" alt=\"\">\r\n                        <span>Table 2</span>\r\n                    </p>\r\n                    <p>\r\n                        <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\r\n                </div>\r\n                <div class=\"btn-container d-flex justify-content-between\">\r\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 3)\">Cancel</button>\r\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 4)\">In Progress</button>\r\n                    <button class=\"btn btn-primary waves-light\" mdbRippleRadius (click)=\"updateOrder(order, 2)\">Done</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

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
    function OrderListComponent(websocketService) {
        this.websocketService = websocketService;
        this.orders = [];
        this.loadingOrders = true;
        //websocketService.connect();
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.orders = _this.websocketService.getOrders();
            _this.loadingOrders = false;
            //console.log('this.orders ', this.orders);
        }, 5000);
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
    OrderListComponent.prototype.updateOrder = function (order, status) {
        order.status = status;
        this.websocketService.updateOrder(order._id, { status: status }).then(function (data) {
            console.log("Order updated", data);
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object])
    ], OrderListComponent);
    return OrderListComponent;
    var _a;
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
            console.log('res', res);
            _this.orderList = res.data;
        })
            .catch(function (error) {
            _this.orderList = [];
        });
    }
    OrderListService.prototype.setOrder = function (data) {
        console.log('data', data);
        this.orderList.push(data);
        console.log('this.orderList', this.orderList);
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