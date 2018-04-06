webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"room-container\" *ngFor=\"let room of roomData\">\r\n    <!-- <form [formGroup]=\"roomtable\">\r\n        <select class=\"form-control\" formControlName=\"room\">\r\n            <option *ngFor=\"let room of roomData\" [value]=\"room\">{{room.name}}</option>\r\n        </select>\r\n    </form> -->\r\n    <div class=\"room-name\">{{room.name}}</div>\r\n    <div class=\"d-flex flex-wrap \">\r\n        <div class=\"room\" (click)=\"createOrder(table, room)\" *ngFor=\"let table of room.tables\">\r\n            <div class=\"table\">\r\n                <span>{{table.name}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n"

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
    function DashboardComponent(router, dashboardService) {
        this.router = router;
        this.dashboardService = dashboardService;
        this.roomData = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashboardService.getRooms().then(function (data) {
            console.log('data', data);
            _this.roomData = data.data;
            console.log('this.roomData', _this.roomData);
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    DashboardComponent.prototype.createOrder = function (table, room) {
        localStorage.setItem('roomdata', JSON.stringify(room));
        localStorage.setItem('tabledata', JSON.stringify(table));
        this.router.navigate(['/waiter/create-order', room._id]);
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */]) === "function" && _b || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b;
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
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* ReactiveFormsModule */]
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