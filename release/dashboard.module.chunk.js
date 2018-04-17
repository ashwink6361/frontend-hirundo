webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabs-container\">\r\n    <ul>\r\n        <li class=\"prev\">\r\n          <i class=\"fas fa-chevron-left\"></i>\r\n        </li>\r\n        <li *ngFor=\"let room of roomData; let i= index\" [class.active]=\"activeRoom[i]\" (click)=\"getTables(room,i)\">\r\n            {{room.name}}\r\n        </li>\r\n        <li class=\"next\">\r\n          <i class=\"fas fa-chevron-right\"></i>\r\n        </li>\r\n      </ul>\r\n</div>\r\n<!-- <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Room\" /> -->\r\n<section class=\"room-container\">\r\n    <!-- <form [formGroup]=\"roomtable\">\r\n        <select class=\"form-control\" formControlName=\"room\">\r\n            <option *ngFor=\"let room of roomData\" [value]=\"room\">{{room.name}}</option>\r\n        </select>\r\n    </form> -->\r\n    <!-- <div class=\"room-name\">{{room.name}}</div> -->\r\n    <div class=\"d-flex flex-wrap \">\r\n        <div class=\"room\" (click)=\"createOrder(table)\" *ngFor=\"let table of tables\" [ngStyle]=\"table.status == 0 ? {'background-color':'green'} : table.status == 1 ? {'background-color':'yellow'} : {'background-color':'red'}\">\r\n            <div class=\"table\">\r\n                <span>{{table.name}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n"

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
    function DashboardComponent(router, dashboardService, websocketService) {
        this.router = router;
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_websocket_service__["a" /* WebsocketService */]) === "function" && _c || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c;
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