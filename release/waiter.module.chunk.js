webpackJsonp(["waiter.module"],{

/***/ "../../../../../src/app/hirundo/waiter/waiter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaiterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WaiterComponent = /** @class */ (function () {
    function WaiterComponent(authGuard) {
        this.authGuard = authGuard;
    }
    WaiterComponent.prototype.ngOnInit = function () {
        if (this.authGuard.isLoggedIn()) {
            this.currentUser = this.authGuard.getCurrentUser();
            if (this.currentUser.userType === 4) {
                window.location.href = '/department';
            }
        }
        else {
            window.location.href = '/';
        }
    };
    WaiterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-waiter',
            template: "\n    <app-header-login></app-header-login>\n    <app-sidebar></app-sidebar>\n    <div class=\"page-content\">\n    <router-outlet></router-outlet>\n    </div>",
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _a || Object])
    ], WaiterComponent);
    return WaiterComponent;
    var _a;
}());

//# sourceMappingURL=waiter.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/waiter.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterModule", function() { return WaiterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__waiter_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/waiter.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__waiter_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/waiter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__waiter_profile_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/dashboard/dashboard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var WaiterModule = /** @class */ (function () {
    function WaiterModule() {
    }
    WaiterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__waiter_routes__["a" /* WaiterRouting */],
                __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_angular_bootstrap_md__["a" /* MDBBootstrapModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* ReactiveFormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__waiter_component__["a" /* WaiterComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__waiter_profile_profile_service__["a" /* ProfileService */],
                __WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard_service__["a" /* DashboardService */]
            ]
        })
    ], WaiterModule);
    return WaiterModule;
}());

//# sourceMappingURL=waiter.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/waiter.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaiterRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__waiter_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/waiter.component.ts");


var routes = [
    { path: 'order/:id', loadChildren: './order/order.module#OrderModule' },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__waiter_component__["a" /* WaiterComponent */],
        children: [
            { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
        ],
        canActivate: []
    },
];
var WaiterRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=waiter.routes.js.map

/***/ })

});
//# sourceMappingURL=waiter.module.chunk.js.map