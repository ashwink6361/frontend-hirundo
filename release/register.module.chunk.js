webpackJsonp(["register.module"],{

/***/ "../../../../../src/app/hirundo/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header bg-login\">\n  <h1>Register</h1>\n</div>\n\n<section class=\"section-padding\">\n  <div class=\"container\">\n    <div class=\"login-form card\">\n      <div class=\"card-body\">\n        <form>\n          <!-- <p class=\"h5 text-center mb-4\">Sign in</p> -->\n          <div class=\"md-form\">\n            <i class=\"fa fa-user prefix grey-text\"></i>\n            <input type=\"text\" id=\"orangeForm-name\" class=\"form-control\" mdbActive>\n            <label for=\"orangeForm-name\">Your name</label>\n          </div>\n          <div class=\"md-form\">\n            <i class=\"fa fa-envelope prefix grey-text\"></i>\n            <input type=\"text\" id=\"defaultForm-email\" class=\"form-control\" mdbActive>\n            <label for=\"defaultForm-email\">Your email</label>\n          </div>\n          <div class=\"md-form\">\n            <i class=\"fa fa-lock prefix grey-text\"></i>\n            <input type=\"password\" id=\"defaultForm-pass\" class=\"form-control\" mdbActive>\n            <label for=\"defaultForm-pass\">Your password</label>\n          </div>\n          <div class=\"text-center\">\n            <button class=\"btn btn-default waves-light\" mdbRippleRadius>Login</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
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

var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/hirundo/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RegisterComponent);
    return RegisterComponent;
}());

//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/register/register.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_routes__ = __webpack_require__("../../../../../src/app/hirundo/register/register.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_component__ = __webpack_require__("../../../../../src/app/hirundo/register/register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__register_routes__["a" /* RegisterRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__register_component__["a" /* RegisterComponent */]]
        })
    ], RegisterModule);
    return RegisterModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/register/register.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__register_component__ = __webpack_require__("../../../../../src/app/hirundo/register/register.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__register_component__["a" /* RegisterComponent */] }
];
var RegisterRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=register.routes.js.map

/***/ })

});
//# sourceMappingURL=register.module.chunk.js.map