webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./change-password/change-password.module": [
		"../../../../../src/app/hirundo/waiter/change-password/change-password.module.ts",
		"change-password.module"
	],
	"./dashboard/dashboard.module": [
		"../../../../../src/app/hirundo/waiter/dashboard/dashboard.module.ts",
		"common",
		"dashboard.module"
	],
	"./department-change-password/department-change-password.module": [
		"../../../../../src/app/hirundo/department/department-change-password/department-change-password.module.ts",
		"department-change-password.module"
	],
	"./department-profile/department-profile.module": [
		"../../../../../src/app/hirundo/department/department-profile/department-profile.module.ts",
		"department-profile.module"
	],
	"./department/department.module": [
		"../../../../../src/app/hirundo/department/department.module.ts",
		"department.module"
	],
	"./home/home.module": [
		"../../../../../src/app/hirundo/home/home.module.ts",
		"home.module"
	],
	"./list/list.module": [
		"../../../../../src/app/hirundo/waiter/list/list.module.ts",
		"common",
		"list.module"
	],
	"./login/login.module": [
		"../../../../../src/app/hirundo/login/login.module.ts",
		"login.module"
	],
	"./order-list/order-list.module": [
		"../../../../../src/app/hirundo/department/order-list/order-list.module.ts",
		"order-list.module"
	],
	"./order/order.module": [
		"../../../../../src/app/hirundo/waiter/order/order.module.ts",
		"common",
		"order.module"
	],
	"./profile/profile.module": [
		"../../../../../src/app/hirundo/waiter/profile/profile.module.ts",
		"common",
		"profile.module"
	],
	"./register/register.module": [
		"../../../../../src/app/hirundo/register/register.module.ts",
		"register.module"
	],
	"./waiter/waiter.module": [
		"../../../../../src/app/hirundo/waiter/waiter.module.ts",
		"common",
		"waiter.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Approuting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");

var routes = [
    { path: '', redirectTo: 'thankyooh', pathMatch: 'full' },
    { path: '**', redirectTo: 'thankyooh' },
];
var Approuting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes, { useHash: false });
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
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



var AppComponent = /** @class */ (function () {
    function AppComponent(translate, authGuard) {
        this.translate = translate;
        this.authGuard = authGuard;
        translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('it');
        var browserLang = translate.getBrowserLang();
        this.isLoggedIn = this.authGuard.isLoggedIn();
        this.currentUser = this.authGuard.getCurrentUser();
        //translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'it');
        translate.use('it');
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-root',
            template: '<router-outlet></router-outlet>',
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hirundo_hirundo_module__ = __webpack_require__("../../../../../src/app/hirundo/hirundo.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, '/assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__app_routing_module__["a" /* Approuting */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_13__hirundo_hirundo_module__["a" /* HirundoModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_12_angular_bootstrap_md__["a" /* MDBBootstrapModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]]
                    }
                })
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NO_ERRORS_SCHEMA */]],
            providers: [__WEBPACK_IMPORTED_MODULE_9__shared__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DepartmentProfileService = /** @class */ (function () {
    function DepartmentProfileService(http) {
        this.http = http;
    }
    DepartmentProfileService.prototype.updateProfile = function (opts) {
        var url = "api/user";
        return this.http.put(url, opts).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    };
    DepartmentProfileService.prototype.getCurrentUser = function () {
        var url = "api/user";
        return this.http.get(url).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    };
    DepartmentProfileService.prototype.updateProfilePicture = function (opts) {
        var url = "api/user/picture/upload";
        var fd = new FormData();
        for (var key in opts) {
            fd.append(key, opts[key]);
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        headers.append('privatekey', 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://localhost:5051/' + url, fd, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    };
    DepartmentProfileService.prototype.getCookie = function (name) {
        console.log('localStorage.getItem', localStorage.getItem('token'));
        console.log('document.cookie', document.cookie);
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    };
    DepartmentProfileService.prototype.extractData = function (res) {
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
    DepartmentProfileService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        if (error.status === 400 || error.status === 401) {
            return Promise.reject(body.message || error);
        }
        else {
            return Promise.reject(body.message || error);
        }
    };
    DepartmentProfileService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    DepartmentProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], DepartmentProfileService);
    return DepartmentProfileService;
    var _a;
}());

//# sourceMappingURL=department-profile.service.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/global.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GlobalService = /** @class */ (function () {
    function GlobalService(http) {
        this.http = http;
    }
    GlobalService.prototype.setLastHitUrl = function (url) {
        localStorage.setItem('lastHitUrl', url);
    };
    GlobalService.prototype.setRoomData = function (room) {
        localStorage.setItem('roomdata', room);
    };
    GlobalService.prototype.getRoomData = function (room) {
        return localStorage.getItem('roomdata');
    };
    GlobalService.prototype.setTableData = function (table) {
        localStorage.setItem('tabledata', table);
    };
    GlobalService.prototype.getTableData = function (table) {
        return localStorage.getItem('tabledata');
    };
    GlobalService.prototype.getCartItemTotal = function () {
        return this.room;
    };
    GlobalService.prototype.removeLastHitUrl = function () {
        localStorage.removeItem('lastHitUrl');
    };
    GlobalService.prototype.getLastHitUrl = function () {
        var url = localStorage.getItem('lastHitUrl');
        return url ? url : false;
    };
    GlobalService.prototype.extractData = function (res) {
        var body = res.json();
        //console.log("Global Service called", body);
        if (body.hasOwnProperty('error')) {
            if (body.error.message === 'Token is required') {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                document.cookie = "token=" + '';
                // window.location.href = '/';
            }
            else {
                return Promise.resolve(body || {});
            }
        }
        else {
            return Promise.resolve(body || {});
        }
    };
    GlobalService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        console.log("Global Error Service called", error);
        if (error.status === 400) {
            return Promise.reject(body.error || error);
        }
        else {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
            // window.location.href = '/';
        }
    };
    GlobalService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], GlobalService);
    return GlobalService;
    var _a;
}());

//# sourceMappingURL=global.service.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/hirundo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HirundoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HirundoComponent = /** @class */ (function () {
    function HirundoComponent() {
    }
    HirundoComponent.prototype.ngOnInit = function () {
    };
    HirundoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-hirundo',
            template: "\n  <app-header></app-header>\n  <router-outlet></router-outlet>\n  <app-footer></app-footer>",
        }),
        __metadata("design:paramtypes", [])
    ], HirundoComponent);
    return HirundoComponent;
}());

//# sourceMappingURL=hirundo.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/hirundo.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HirundoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hirundo_routes__ = __webpack_require__("../../../../../src/app/hirundo/hirundo.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__hirundo_component__ = __webpack_require__("../../../../../src/app/hirundo/hirundo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_service__ = __webpack_require__("../../../../../src/app/hirundo/login/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var HirundoModule = /** @class */ (function () {
    function HirundoModule() {
    }
    HirundoModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__hirundo_routes__["a" /* MainRouting */],
                __WEBPACK_IMPORTED_MODULE_3_angular_bootstrap_md__["a" /* MDBBootstrapModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__hirundo_component__["a" /* HirundoComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__login_login_service__["a" /* LoginService */],
                __WEBPACK_IMPORTED_MODULE_7__global_service__["a" /* GlobalService */],
                __WEBPACK_IMPORTED_MODULE_8__service_websocket_service__["a" /* WebsocketService */]
            ],
        })
    ], HirundoModule);
    return HirundoModule;
}());

//# sourceMappingURL=hirundo.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/hirundo.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hirundo_component__ = __webpack_require__("../../../../../src/app/hirundo/hirundo.component.ts");


var routes = [
    { path: 'waiter', loadChildren: './waiter/waiter.module#WaiterModule' },
    { path: 'department', loadChildren: './department/department.module#DepartmentModule' },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__hirundo_component__["a" /* HirundoComponent */],
        children: [
            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'register', loadChildren: './register/register.module#RegisterModule' },
        ],
        canActivate: []
    },
];
var MainRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=hirundo.routes.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/login/login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.login = function (user) {
        var url = "/login";
        return this.http.post(url, user).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    };
    LoginService.prototype.extractData = function (res) {
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
    LoginService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        if (error.status === 400 || error.status === 401) {
            return Promise.reject(body.message || error);
        }
        else {
            this.logout();
        }
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    LoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], LoginService);
    return LoginService;
    var _a;
}());

//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppService = /** @class */ (function () {
    function AppService() {
        this.sidebarToggle = false;
    }
    AppService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    AppService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AppService);
    return AppService;
}());

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/websocket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WebsocketService = /** @class */ (function () {
    function WebsocketService(http, authGuard) {
        this.http = http;
        this.authGuard = authGuard;
        this._orders = [];
        this._rooms = [];
        this.connect();
    }
    WebsocketService.prototype.connect = function () {
        var _this = this;
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__('http://localhost:5051');
        if (this.socket.connected)
            console.log("Socket connection done ");
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.socket.on('neworder', function (data) {
            console.log("Received Order from Websocket Server", data);
            // for (let j = 0; j < data.item.length; j++) {
            //     let userType = this.authGuard.getCurrentUser().userType;
            //     if(userType == 3){
            //         this._orders.unshift(data);                    
            //         break;                    
            //     }
            //     else if(userType == 4){
            //         if (data.item[j].category == this.authGuard.getCurrentUser().category) {
            //             this._orders.unshift(data);
            //             break;
            //         }
            //     }
            // }
            var userType = _this.authGuard.getCurrentUser().userType;
            if (userType == 3) {
                _this._orders.unshift(data);
            }
            else if (userType == 4) {
                for (var j = 0; j < data.item.length; j++) {
                    if (data.item[j].category == _this.authGuard.getCurrentUser().category) {
                        _this._orders.unshift(data);
                        break;
                    }
                }
            }
        });
        this.socket.on('orderstatus', function (data) {
            if (data.by.id !== user._id) {
                for (var i = 0; i < _this._orders.length; i++) {
                    if (data.id === _this._orders[i]._id) {
                        _this._orders[i].status = data.status;
                    }
                }
            }
        });
        this.socket.on('tablestatus', function (data) {
            for (var i = 0; i < _this._rooms.length; i++) {
                if (data.room == _this._rooms[i]._id) {
                    for (var j = 0; j < _this._rooms[i].tables.length; j++) {
                        if (data.table == _this._rooms[i].tables[j]._id) {
                            _this._rooms[i].tables[j].status = data.status;
                            break;
                        }
                    }
                }
            }
        });
    };
    WebsocketService.prototype.getOrders = function () {
        var _this = this;
        var url = '/api/department/orders/' + this.authGuard.getCurrentUser().category;
        return this.http.get(url).toPromise()
            .then(function (data) {
            var res = data.json();
            _this._orders = res.data;
            return _this._orders;
        })
            .catch(function (error) {
            _this._orders = [];
            return error;
        });
    };
    WebsocketService.prototype.getWaiterOrders = function () {
        var _this = this;
        var url = '/api/waiter/orders';
        return this.http.get(url).toPromise()
            .then(function (data) {
            var res = data.json();
            _this._orders = res.data;
            return _this._orders;
        })
            .catch(function (error) {
            _this._orders = [];
            return error;
        });
    };
    WebsocketService.prototype.getRooms = function () {
        var _this = this;
        var url1 = '/api/rooms';
        return this.http.get(url1).toPromise()
            .then(function (data) {
            var res = data.json();
            _this._rooms = res.data;
            return _this._rooms;
        })
            .catch(function (error) {
            _this._rooms = [];
            return error;
        });
    };
    WebsocketService.prototype.updateOrder = function (id, opts) {
        var url = '/api/department/orders/' + id;
        return this.http.put(url, opts).toPromise()
            .then(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    WebsocketService.prototype.updateWaiterOrder = function (id, opts) {
        var url = '/api/waiter/orders/' + id;
        return this.http.put(url, opts).toPromise()
            .then(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    WebsocketService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object])
    ], WebsocketService);
    return WebsocketService;
    var _a, _b;
}());

//# sourceMappingURL=websocket.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer>\n  <div class=\"footer-bottom\">\n    <div class=\"container\">\n      <div class=\"d-flex justify-space-between\">\n        <div class=\"copyright\">\n          &copy; 2018 Hirundo | All Rights Reserved.\n        </div>\n      </div>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/footer/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_component__ = __webpack_require__("../../../../../src/app/shared/footer/footer.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__footer_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/guard/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    };
    AuthGuard.prototype.isLoggedIn = function () {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthGuard.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem('currentUser'));
    };
    AuthGuard.prototype.getCurrentUserId = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        return user.id;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());

//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/shared/header-login/header-login.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"menu-btn\" (click)=\"sidebar()\">\n    <i class=\"fas fa-bars\"></i>\n  </div>\n  <div class=\"logo\">\n    <img src=\"assets/images/logo.png\" alt=\"\" />\n  </div>\n  <!-- <div class=\"cart\">\n    <a routerLink=\"/waiter/cart\"><i class=\"fas fa-shopping-cart\"></i></a>\n  </div> -->\n</header>\n"

/***/ }),

/***/ "../../../../../src/app/shared/header-login/header-login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/header-login/header-login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderLoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_app_service__ = __webpack_require__("../../../../../src/app/service/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hirundo_department_department_profile_department_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderLoginComponent = /** @class */ (function () {
    function HeaderLoginComponent(appservice, profileService) {
        this.appservice = appservice;
        this.profileService = profileService;
    }
    HeaderLoginComponent.prototype.ngOnInit = function () {
    };
    HeaderLoginComponent.prototype.sidebar = function () {
        this.appservice.sidebarToggle = !this.appservice.sidebarToggle;
        this.profileService.getCurrentUser().then(function (data) {
            localStorage.setItem('currentUser', JSON.stringify(data.data));
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    HeaderLoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-header-login',
            template: __webpack_require__("../../../../../src/app/shared/header-login/header-login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/header-login/header-login.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__hirundo_department_department_profile_department_profile_service__["a" /* DepartmentProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__hirundo_department_department_profile_department_profile_service__["a" /* DepartmentProfileService */]) === "function" && _b || Object])
    ], HeaderLoginComponent);
    return HeaderLoginComponent;
    var _a, _b;
}());

//# sourceMappingURL=header-login.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<mdb-navbar SideClass=\"navbar navbar-expand-lg navbar-light\">\n    <logo>\n        <a class=\"navbar-brand\" routerLink=\"/\">\n            <img src=\"/assets/images/logo_dark.png\" alt=\"\">\n        </a>\n    </logo>\n    <links>        \n        <ul class=\"navbar-nav ml-auto\">            \n            <li class=\"language-option\">\n                <div class=\"text-right\">\n                    <a class=\"dropdown-toggle\" id=\"language\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                        <img src=\"assets/images/flags/English.png\" *ngIf=\"(currentLan=='en')\" alt=\"\" title=\"\">\n                        <img src=\"assets/images/flags/Italian.png\" *ngIf=\"(currentLan=='it')\" alt=\"\" title=\"\">\n                        <span class=\"fa fa-chevron-down\" aria-hidden=\"true\"></span>\n                    </a>\n                    <div class=\"dropdown-menu\" aria-labelledby=\"language\">\n                        <a class=\"dropdown-item\" (click)=\"changeLang('en')\">\n                            <img src=\"assets/images/flags/English.png\"> English</a>\n                        <a class=\"dropdown-item\" (click)=\"changeLang('it')\">\n                            <img src=\"assets/images/flags/Italian.png\"> Italian</a>\n                    </div>\n                </div>\n            </li>\n        </ul>\n    </links>\n</mdb-navbar>\n"

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(translate) {
        this.translate = translate;
        this.currentLan = 'it';
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.changeLang = function (language) {
        this.currentLan = language;
        this.translate.use(language);
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/shared/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());

//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/header/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_component__ = __webpack_require__("../../../../../src/app/shared/header/header.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__header_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter(function (it) {
            return it.name.toLowerCase().includes(searchText);
        });
    };
    FilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({
            name: 'filter',
            pure: false
        })
    ], FilterPipe);
    return FilterPipe;
}());

//# sourceMappingURL=filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header__ = __webpack_require__("../../../../../src/app/shared/header/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer__ = __webpack_require__("../../../../../src/app/shared/footer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__header_login_header_login_component__ = __webpack_require__("../../../../../src/app/shared/header-login/header-login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sidebar_sidebar_component__ = __webpack_require__("../../../../../src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_change_passowrd_user_change_passowrd_component__ = __webpack_require__("../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_change_passowrd_user_change_password_service__ = __webpack_require__("../../../../../src/app/shared/user-change-passowrd/user-change-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_pipes_filter_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_app_service__ = __webpack_require__("../../../../../src/app/service/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__hirundo_department_department_profile_department_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__steps_steps_component__ = __webpack_require__("../../../../../src/app/shared/steps/steps.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var NGA_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_3__header__["a" /* HeaderComponent */],
    __WEBPACK_IMPORTED_MODULE_4__footer__["a" /* FooterComponent */],
    __WEBPACK_IMPORTED_MODULE_6__header_login_header_login_component__["a" /* HeaderLoginComponent */],
    __WEBPACK_IMPORTED_MODULE_7__sidebar_sidebar_component__["a" /* SidebarComponent */],
    __WEBPACK_IMPORTED_MODULE_8__user_change_passowrd_user_change_passowrd_component__["a" /* UserChangePassowrdComponent */],
    __WEBPACK_IMPORTED_MODULE_12__shared_pipes_filter_pipe__["a" /* FilterPipe */],
    __WEBPACK_IMPORTED_MODULE_15__steps_steps_component__["a" /* StepsComponent */]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__user_change_passowrd_user_change_password_service__["a" /* UserChangePasswordService */],
                __WEBPACK_IMPORTED_MODULE_13__service_app_service__["a" /* AppService */],
                __WEBPACK_IMPORTED_MODULE_14__hirundo_department_department_profile_department_profile_service__["a" /* DepartmentProfileService */]
            ],
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular_bootstrap_md__["a" /* MDBBootstrapModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_forms__["g" /* ReactiveFormsModule */]
            ],
            declarations: NGA_COMPONENTS.slice(),
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NO_ERRORS_SCHEMA */]],
            exports: NGA_COMPONENTS.slice(),
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" [class.sidebartoggle]=\"appService.sidebarToggle\">\n    <div class=\"sidebar-user-detail\">\n        <img *ngIf=\"!authGuard.getCurrentUser().picture.small\" src=\"assets/images/profile-placeholder.jpg\" alt=\"\" />\n        <img *ngIf=\"authGuard.getCurrentUser().picture.small\" [src]=\"authGuard.getCurrentUser().picture.small\" alt=\"\" />        \n        <p>{{authGuard.getCurrentUser().firstName}}\n            <span *ngIf=\"authGuard.getCurrentUser().lastName\">&nbsp;{{authGuard.getCurrentUser().lastName}}</span>\n        </p>\n    </div>\n    <div class=\"sidebar-nav\">\n        <ul>\n            <li>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 3\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/waiter\">\n                    <i class=\"fas fa-tachometer-alt\"></i> Home</a>\n            </li>\n            <li>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 3\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/waiter/list\">\n                    <i class=\"fas fa-tags\"></i> Order List</a>\n            </li>\n            <li>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 3\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/waiter/profile\">\n                    <i class=\"far fa-user\"></i> Profile</a>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 4\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/department/profile\">\n                    <i class=\"far fa-user\"></i> Profile</a>\n            </li>\n            <li *ngIf=\"authGuard.getCurrentUser().userType == 4\">\n                <a class=\"waves-effect\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/department\">\n                    <i class=\"fas fa-cart-plus\"></i> Orders</a>\n            </li>\n            <li>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 3\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/waiter/change-password\">\n                    <i class=\"fas fa-cog\"></i> Change Password</a>\n                <a class=\"waves-effect\" *ngIf=\"authGuard.getCurrentUser().userType == 4\" mdbRippleRadius (click)=\"hideSidebar()\" routerLink=\"/department/change-password\">\n                    <i class=\"fas fa-cog\"></i> Change Password</a>\n            </li>\n            <li>\n                <a class=\"waves-effect\" mdbRippleRadius (click)=\"appService.logout()\">\n                    <i class=\"fas fa-power-off\"></i> Logout</a>\n            </li>\n        </ul>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/shared/sidebar/sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_app_service__ = __webpack_require__("../../../../../src/app/service/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hirundo_department_department_profile_department_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(appService, authGuard, profileService) {
        this.appService = appService;
        this.authGuard = authGuard;
        this.profileService = profileService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.profileService.getCurrentUser().then(function (data) {
            localStorage.setItem('currentUser', JSON.stringify(data.data));
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    SidebarComponent.prototype.hideSidebar = function () {
        this.appService.sidebarToggle = false;
    };
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-sidebar',
            template: __webpack_require__("../../../../../src/app/shared/sidebar/sidebar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__hirundo_department_department_profile_department_profile_service__["a" /* DepartmentProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__hirundo_department_department_profile_department_profile_service__["a" /* DepartmentProfileService */]) === "function" && _c || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/steps/steps.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabs-container steps-container\">\n    <ul>\n        <li class=\"active\">Uscita 1</li>\n        <li>Uscita 2</li>\n        <li class=\"add-step\" (click)=\"addStep()\"><i class=\"fa fa-plus\"></i></li>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/steps/steps.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/steps/steps.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StepsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StepsComponent = /** @class */ (function () {
    function StepsComponent() {
        this.stepArray = [];
    }
    StepsComponent.prototype.ngOnInit = function () {
    };
    StepsComponent.prototype.addStep = function () {
    };
    StepsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-steps',
            template: __webpack_require__("../../../../../src/app/shared/steps/steps.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/steps/steps.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], StepsComponent);
    return StepsComponent;
}());

//# sourceMappingURL=steps.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid change-password-container\">\n  <div class=\"card\">\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-sm-6\">\n          <h4 class=\"card-title\">Change Password</h4>\n          <!-- <form [formGroup]=\"changePasswordForm\" (ngSubmit)=\"changePassword(changePasswordForm.value)\"> -->\n            <div class=\"alert-danger\" *ngIf=\"changePasswordError\">{{changePasswordErrorMsg}}</div>\n            <div class=\"alert-success\" *ngIf=\"changePasswordSuccess\">{{changePasswordSuccessMsg}}</div>            \n            <div class=\"md-form\">\n              <input type=\"password\" id=\"old-pass\" class=\"form-control\" [(ngModel)]=\"changePasswordData.oldPassword\" mdbActive>\n              <label for=\"old-pass\">Old Password</label>\n            </div>\n            <div class=\"md-form\">\n              <input type=\"password\" id=\"new-pass\" class=\"form-control\" [(ngModel)]=\"changePasswordData.newPassword\" mdbActive>\n              <label for=\"new-pass\">New Password</label>\n            </div>\n            <div class=\"md-form\">\n              <input type=\"password\" id=\"confirm-pass\" class=\"form-control\" [(ngModel)]=\"changePasswordData.confirmPassword\" mdbActive>\n              <label for=\"confirm-pass\">Confirm Password</label>\n            </div>\n            <!-- <small class=\"text-danger\" *ngIf=\"changePasswordForm.value.oldPassword==changePasswordForm.value.newPassword\">Old Password and New Password cannot be same.</small>             -->\n            <!-- <small class=\"text-danger\" *ngIf=\"changePasswordForm.value.newPassword!=changePasswordForm.value.confirmPassword\">New Password and Confirm Password must be same.</small> -->\n            <div class=\"text-center\">\n              <button type=\"submit\" class=\"btn btn-primary waves-light\" [disabled]=\"activeRequest\" mdbRippleRadius (click)=\"changePassword(changePasswordData)\">Submit</button>\n            </div>\n          <!-- </form> -->\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChangePassowrdComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_change_password_service__ = __webpack_require__("../../../../../src/app/shared/user-change-passowrd/user-change-password.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { FormGroup, FormControl, Validators } from '@angular/forms';

var UserChangePassowrdComponent = /** @class */ (function () {
    function UserChangePassowrdComponent(userChangePasswordService) {
        this.userChangePasswordService = userChangePasswordService;
        // changePasswordForm: FormGroup;
        this.changePasswordData = {};
        this.changePasswordErrorMsg = '';
        this.changePasswordError = false;
        this.activeRequest = false;
        this.changePasswordSuccessMsg = '';
        this.changePasswordSuccess = false;
    }
    UserChangePassowrdComponent.prototype.ngOnInit = function () {
        // this.createChangePasswordForm();
    };
    // private createChangePasswordForm() {
    //   this.changePasswordForm = new FormGroup({
    //     oldPassword: new FormControl('', Validators.required),
    //     newPassword: new FormControl('', Validators.required),
    //     confirmPassword: new FormControl('', Validators.required)
    //   });
    // }
    UserChangePassowrdComponent.prototype.changePassword = function (data) {
        var _this = this;
        // if (data.newPassword != data.confirmPassword) {
        // } else {
        // this.changePasswordData.password = data.password;
        console.log('this.changePasswordData', data);
        this.activeRequest = true;
        this.userChangePasswordService.changePassword(data).then(function (data) {
            console.log("After change Password", data);
            _this.activeRequest = false;
            _this.changePasswordSuccess = true;
            _this.changePasswordSuccessMsg = data.message;
            setTimeout(function () {
                _this.changePasswordSuccess = false;
                _this.changePasswordSuccessMsg = '';
            }, 4000);
            // this.createChangePasswordForm();
        }).catch(function (error) {
            console.log("change Passwor error", error);
            _this.changePasswordError = true;
            _this.changePasswordErrorMsg = error;
            setTimeout(function () {
                _this.changePasswordError = false;
                _this.changePasswordErrorMsg = '';
            }, 4000);
            _this.activeRequest = false;
        });
        // }
    };
    UserChangePassowrdComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-user-change-passowrd',
            template: __webpack_require__("../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/user-change-passowrd/user-change-passowrd.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_change_password_service__["a" /* UserChangePasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__user_change_password_service__["a" /* UserChangePasswordService */]) === "function" && _a || Object])
    ], UserChangePassowrdComponent);
    return UserChangePassowrdComponent;
    var _a;
}());

//# sourceMappingURL=user-change-passowrd.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/user-change-passowrd/user-change-password.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChangePasswordService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserChangePasswordService = /** @class */ (function () {
    function UserChangePasswordService(http) {
        this.http = http;
    }
    UserChangePasswordService.prototype.changePassword = function (data) {
        var url = '/api/user/change/password';
        return this.http.put(url, data).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    };
    UserChangePasswordService.prototype.extractData = function (res) {
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
    UserChangePasswordService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        if (error.status === 400 || error.status === 401) {
            return Promise.reject(body.message || error);
        }
        else {
            this.logout();
        }
    };
    UserChangePasswordService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    UserChangePasswordService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], UserChangePasswordService);
    return UserChangePasswordService;
    var _a;
}());

//# sourceMappingURL=user-change-password.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map