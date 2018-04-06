webpackJsonp(["choose-category.module"],{

/***/ "../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  choose-category works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseCategoryComponent; });
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

var ChooseCategoryComponent = /** @class */ (function () {
    function ChooseCategoryComponent() {
    }
    ChooseCategoryComponent.prototype.ngOnInit = function () {
    };
    ChooseCategoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-choose-category',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ChooseCategoryComponent);
    return ChooseCategoryComponent;
}());

//# sourceMappingURL=choose-category.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseCategoryModule", function() { return ChooseCategoryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_category_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__choose_category_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChooseCategoryModule = /** @class */ (function () {
    function ChooseCategoryModule() {
    }
    ChooseCategoryModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__choose_category_routes__["a" /* ChooseCategoryRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__choose_category_component__["a" /* ChooseCategoryComponent */]]
        })
    ], ChooseCategoryModule);
    return ChooseCategoryModule;
}());

//# sourceMappingURL=choose-category.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseCategoryRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__choose_category_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/create-order/choose-category/choose-category.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__choose_category_component__["a" /* ChooseCategoryComponent */] }
];
var ChooseCategoryRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=choose-category.routes.js.map

/***/ })

});
//# sourceMappingURL=choose-category.module.chunk.js.map