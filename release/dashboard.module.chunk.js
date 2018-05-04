webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabs-container\">\n    <ul>\n        <!-- <li class=\"prev\">\n          <i class=\"fas fa-chevron-left\"></i>\n        </li> -->\n        <li *ngFor=\"let room of roomData; let i= index\" [class.active]=\"activeRoom[i]\" (click)=\"getTables(room,i)\">\n            {{room.name}}\n        </li>\n        <!-- <li class=\"next\">\n          <i class=\"fas fa-chevron-right\"></i>\n        </li> -->\n      </ul>\n</div>\n<!-- <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Room\" /> -->\n<section class=\"room-container\">\n    <!-- <form [formGroup]=\"roomtable\">\n        <select class=\"form-control\" formControlName=\"room\">\n            <option *ngFor=\"let room of roomData\" [value]=\"room\">{{room.name}}</option>\n        </select>\n    </form> -->\n    <!-- <div class=\"room-name\">{{room.name}}</div> -->\n    <div class=\"d-flex flex-wrap \">\n        <div class=\"room\" (click)=\"createOrder(table)\" *ngFor=\"let table of tables\" [ngStyle]=\"table.status == 0 ? {'background-color':'#c5c8cd'} : table.status == 1 ? {'background-color':'#add278'} : table.status == 2 ? {'background-color':'yellow'} : {'background-color':''}\">\n            <div class=\"table\">\n                <span>{{table.name}}</span>\n            </div>\n        </div>\n    </div>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_order_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, orderService, dashboardService, websocketService) {
        this.router = router;
        this.orderService = orderService;
        this.dashboardService = dashboardService;
        this.websocketService = websocketService;
        this.roomData = [];
        this.tables = [];
        this.activeRoom = [false];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.removeItem('orderData');
        this.websocketService.getRooms().then(function (data) {
            _this.roomData = data;
            _this.activeRoom[0] = true;
            _this.tables = _this.roomData[0].tables;
            localStorage.setItem('roomdata', JSON.stringify(_this.roomData[0]));
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    DashboardComponent.prototype.createOrder = function (table) {
        localStorage.setItem('tabledata', JSON.stringify(table));
        var room = JSON.parse(localStorage.getItem('roomdata'));
        // console.log('table',table);
        // if(table.orderId && table.orderId._id){
        //   localStorage.setItem('orderId', JSON.stringify(table.orderId._id));
        //   localStorage.setItem('orderItems',JSON.stringify(table.orderId.item));
        //   let cp = 0;
        //   let itemno = 0;
        //   let varicost = 0;
        //   for (let i = 0; i < table.orderId.item.length; i++) {
        //     itemno += table.orderId.item[i].quantity;
        //     if (table.orderId.item[i].variant && table.orderId.item[i].variant.length) {
        //       for (let j = 0; j < table.orderId.item[i].variant.length; j++) {
        //         if (table.orderId.item[i].variant[j].status == 1) {
        //           varicost += table.orderId.item[i].variant[j].price;
        //         }
        //       }
        //     }
        //     cp += (table.orderId.item[i].price + varicost) * table.orderId.item[i].quantity;
        //   }
        //   let data = {
        //     roomId: table.orderId.room,
        //     tableId: table.orderId.table,
        //     noOfPeople: table.orderId.noOfPeople,
        //     selectedItems: [],
        //     cartTotalPrice : cp,
        //     cartTotalItem: itemno
        //   }
        //   this.orderService.setOrderData(data);
        // }
        // else{
        //   localStorage.removeItem('orderId');
        //   localStorage.removeItem('orderItems');
        // }
        // if(table.status == 1){
        //   this.router.navigate(['/waiter/order/:id/cart']);
        // }else{
        this.router.navigate(['/waiter/order', room._id]);
        // }
    };
    DashboardComponent.prototype.getTables = function (room, index) {
        localStorage.setItem('roomdata', JSON.stringify(room));
        this.tables = room.tables;
        this.activeRoom[index] = true;
        for (var i = 0; i < this.activeRoom.length; i++) {
            if (index != i) {
                this.activeRoom[i] = false;
            }
        }
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__order_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__order_order_service__["a" /* OrderService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_websocket_service__["a" /* WebsocketService */]) === "function" && _d || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__dashboard_routes__["a" /* DashboardRouting */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */]]
        })
    ], DashboardModule);
    return DashboardModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_component__["a" /* DashboardComponent */] }
];
var DashboardRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=dashboard.routes.js.map

/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map