webpackJsonp(["login.module"],{

/***/ "../../../../../src/app/hirundo/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header bg-login\">\n  <h1>Login</h1>\n</div>\n\n<section class=\"section-padding\">\n  <div class=\"container\">\n    <div class=\"login-form card\">\n      <div class=\"card-body\">\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"login(loginForm.value)\">\n          <!-- <p class=\"h5 text-center mb-4\">Sign in</p> -->\n          <div class=\"md-form\">\n            <i class=\"fa fa-envelope prefix grey-text\"></i>\n            <input type=\"email\"  name=\"email\" placeholder=\"Your Email\" id=\"defaultForm-email\" formControlName=\"email\" class=\"form-control\" mdbActive>\n            <!-- <label for=\"defaultForm-email\">Your email</label> -->\n          </div>\n          <div class=\"md-form\">\n            <i class=\"fa fa-lock prefix grey-text\"></i>\n            <input type=\"password\" placeholder=\"Your Password\" id=\"defaultForm-pass\" formControlName=\"password\" class=\"form-control\" mdbActive>\n            <!-- <label for=\"defaultForm-pass\">Your password</label> -->\n          </div>\n          <div class=\"text-center\">\n            <button type=\"submit\" class=\"btn btn-default waves-light\" mdbRippleRadius [disabled]=\"!loginForm.valid || requestRunning\">Login</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_service__ = __webpack_require__("../../../../../src/app/hirundo/login/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_app_service__ = __webpack_require__("../../../../../src/app/service/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(appService, globalService, loginService) {
        this.appService = appService;
        this.globalService = globalService;
        this.loginService = loginService;
        this.User = {};
        this.loginError = false;
        this.loginErrorMsg = '';
        this.requestRunning = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.createLoginForm();
    };
    LoginComponent.prototype.createLoginForm = function () {
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
        });
    };
    LoginComponent.prototype.login = function (user) {
        var _this = this;
        this.requestRunning = true;
        this.User.userName = user.email;
        this.User.password = user.password;
        this.User.deviceType = 'web';
        this.loginService.login(this.User).then(function (data) {
            document.cookie = "token=" + data.token;
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            localStorage.setItem('token', data.token);
            if (data.data.userType === 3) {
                window.location.href = '/waiter';
            }
            else {
                window.location.href = '/department';
            }
        }).catch(function (error) {
            console.log("Error ", error);
            _this.requestRunning = false;
            _this.loginError = true;
            _this.loginErrorMsg = error;
            setTimeout(function () {
                _this.loginError = false;
                _this.loginErrorMsg = '';
            }, 4000);
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/hirundo/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__service_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__global_service__["a" /* GlobalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__login_service__["a" /* LoginService */]) === "function" && _c || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_routes__ = __webpack_require__("../../../../../src/app/hirundo/login/login.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__("../../../../../src/app/hirundo/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__login_routes__["a" /* LoginRouting */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* ReactiveFormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */]]
        })
    ], LoginModule);
    return LoginModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/login/login.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_component__ = __webpack_require__("../../../../../src/app/hirundo/login/login.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__login_component__["a" /* LoginComponent */] }
];
var LoginRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=login.routes.js.map

/***/ })

});
//# sourceMappingURL=login.module.chunk.js.map