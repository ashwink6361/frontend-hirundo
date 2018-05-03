webpackJsonp(["order.module"],{

/***/ "../../../../../src/app/hirundo/waiter/order/cart/cart.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"page-content-header\">\r\n    <div class=\"back-btn\">\r\n        <a routerLink=\"/waiter/order/:id/choose-item\">\r\n            <i class=\"fas fa-angle-left\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"header-title\">\r\n        Create Order\r\n    </div>\r\n</header>\r\n<div class=\"page-content\">\r\n<app-steps></app-steps>    \r\n    <div class=\"item-container\">\r\n        <div class=\"text-center\" *ngIf=\"!(items && items.length)\">No Item Added</div>\r\n        <!-- <div class=\"text-center\" *ngIf=\"!orderId && !(items && items.length)\">No Item Added</div> -->\r\n        <!-- <div *ngIf=\"(orderId && orderItems && orderItems.length)\">\r\n            <div  *ngFor=\"let article of orderItems\">\r\n                <div class=\"item-list align-items-center\" *ngIf=\"article.step == globalService.getTabData().step\">\r\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.id.category.color}\">\r\n                        <img *ngIf=\"!article.id.logo.small && article.id.category.isIcon\" class=\"icon-img\" [src]=\"article.id.category.icon\" alt=\"\" />\r\n                        <img *ngIf=\"!article.id.logo.small && !article.id.category.isIcon && article.id.category.logo.small\" [src]=\"article.id.category.logo.small\"\r\n                            alt=\"Category Logo\" />\r\n                        <img *ngIf=\"article.id.logo.small\" [src]=\"article.id.logo.small\" alt=\"Item Logo\" />\r\n                        <span class=\"item-quantity\" *ngIf=\"article.quantity>0\">{{article.quantity}}</span>\r\n                    </div>\r\n                    <div class=\"item-name mw-160\">\r\n                        <p class=\"name m-0\">{{article.id.name}}</p>\r\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\r\n                        <span *ngIf=\"article.variant && article.variant.length\">\r\n                            <span *ngFor=\"let variant of article.variant\" class=\"d-flex added-variand-name\">\r\n                                <span *ngIf=\"variant.status == 0\">- {{variant.name}} </span>\r\n                                <span *ngIf=\"variant.status == 1\">+ {{variant.name}} &euro;{{variant.price}}</span>\r\n                            </span>\r\n                        </span>\r\n                        <span *ngIf=\"article.notes\" class=\"d-flex added-variand-name\">{{article.notes}}</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> -->\r\n        <div *ngIf=\"(items && items.length)\">\r\n            <div  *ngFor=\"let article of items\">\r\n                <div class=\"item-list align-items-center\" *ngIf=\"article.step == globalService.getTabData().step\">\r\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\r\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\r\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\r\n                            alt=\"Category Logo\" />\r\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\r\n                        <span class=\"item-quantity\" *ngIf=\"article.quantity>0\">{{article.quantity}}</span>\r\n                    </div>\r\n                    <div class=\"item-name mw-160\">\r\n                        <p class=\"name m-0\">{{article.name}}</p>\r\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\r\n                        <span *ngIf=\"article.variant && article.variant.length\">\r\n                            <span *ngFor=\"let variant of article.variant\" class=\"d-flex added-variand-name\">\r\n                                <span *ngIf=\"variant.status == 0\">- {{variant.name}} </span>\r\n                                <span *ngIf=\"variant.status == 1\">+ {{variant.name}} &euro;{{variant.price}}</span>\r\n                            </span>\r\n                        </span>\r\n                        <span *ngIf=\"article.ordernote\" class=\"d-flex added-variand-name\">{{article.ordernote}}</span>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"deleteItemFromCart(article)\">\r\n                        <i class=\"fas fa-times\"></i>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"total-amount\">\r\n            Sub Total: &euro;{{orderService.getOrderData().cartTotalPrice}}\r\n        </div>\r\n        <!-- <div *ngIf=\"orderId\">\r\n            <button type=\"button\" (click)=\"gotToCategoryList()\">\r\n                Menu\r\n            </button>\r\n        </div> -->\r\n        <button type=\"submit\" class=\"order-btn waves-light\" [disabled]=\"!orderService.getOrderData().selectedItems.length\" (click)=\"createOrder()\">\r\n            Create Order\r\n        </button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/cart/cart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/cart/cart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.service.ts");
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





var CartComponent = /** @class */ (function () {
    function CartComponent(orderService, router, globalService) {
        this.orderService = orderService;
        this.router = router;
        this.globalService = globalService;
        this.items = [];
        this.orderItems = [];
    }
    CartComponent.prototype.ngOnInit = function () {
        console.log('this.orderService.getOrderData()', this.orderService.getOrderData());
        console.log('globalService.getTabData().step', this.globalService.getTabData());
        if (localStorage.getItem('orderId')) {
            this.orderId = JSON.parse(localStorage.getItem('orderId'));
            this.orderItems = JSON.parse(localStorage.getItem('orderItems'));
            console.log('this.orderItems.orderItems()', this.orderItems);
            console.log('this.orderId.orderId()', this.orderId);
        }
        if (this.orderService.getOrderData() && this.orderService.getOrderData().selectedItems) {
            this.items = this.orderService.getOrderData().selectedItems;
        }
    };
    CartComponent.prototype.createOrder = function () {
        var _this = this;
        var data = this.orderService.getOrderData();
        var itemarray = [];
        for (var i = 0; i < data.selectedItems.length; i++) {
            var vararray = [];
            if (data.selectedItems[i].variant) {
                for (var j = 0; j < data.selectedItems[i].variant.length; j++) {
                    var catarray = [];
                    for (var k = 0; k < data.selectedItems[i].variant[j].category.length; k++) {
                        catarray.push(data.selectedItems[i].variant[j].category[k]._id);
                    }
                    var vari = {
                        name: data.selectedItems[i].variant[j].name,
                        category: catarray,
                        price: data.selectedItems[i].variant[j].price,
                        status: data.selectedItems[i].variant[j].status
                    };
                    vararray.push(vari);
                }
            }
            var item = {
                id: data.selectedItems[i]._id,
                category: data.selectedItems[i].category._id,
                quantity: data.selectedItems[i].quantity,
                price: data.selectedItems[i].price,
                notes: data.selectedItems[i].ordernote ? data.selectedItems[i].ordernote : '',
                variant: vararray,
                step: data.selectedItems[i].step,
                department: data.selectedItems[i].category.department
            };
            itemarray.push(item);
        }
        var createorder = {
            room: data.roomId,
            table: data.tableId,
            noOfPeople: data.noOfPeople,
            item: itemarray
        };
        this.orderService.createOrder(createorder)
            .then(function (data) {
            _this.router.navigate(['/waiter/list']);
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    CartComponent.prototype.deleteItemFromCart = function (article) {
        var data = this.orderService.getOrderData();
        for (var i = 0; i < data.selectedItems.length; i++) {
            if (data.selectedItems[i]._id == article._id && !article.variant) {
                //non variant type data
                for (var m = 0; m < data.categoryItems.length; m++) {
                    if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
                        data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
                    }
                }
                if (!data.selectedItems[i].variant) {
                    data.selectedItems.splice(i, 1);
                }
            }
            else if (data.selectedItems[i]._id == article._id && article.variant) {
                //variant type data
                for (var m = 0; m < data.categoryItems.length; m++) {
                    if (data.categoryItems[m]._id == data.selectedItems[i]._id) {
                        data.categoryItems[m].itemTotal = data.categoryItems[m].itemTotal - data.selectedItems[i].quantity;
                    }
                }
                if (data.selectedItems[i].variant) {
                    data.selectedItems.splice(i, 1);
                }
            }
            var cp = 0;
            var itemno = 0;
            var varicost = 0;
            if (data.selectedItems.length) {
                for (var i_1 = 0; i_1 < data.selectedItems.length; i_1++) {
                    itemno += data.selectedItems[i_1].quantity;
                    if (data.selectedItems[i_1].variant) {
                        for (var j = 0; j < data.selectedItems[i_1].variant.length; j++) {
                            if (data.selectedItems[i_1].variant[j].status == 1) {
                                varicost += data.selectedItems[i_1].variant[j].price;
                            }
                        }
                    }
                    cp += (data.selectedItems[i_1].price + varicost) * data.selectedItems[i_1].quantity;
                    data.cartTotalPrice = cp;
                    data.cartTotalItem = itemno;
                }
            }
            else {
                data.cartTotalPrice = 0;
                data.cartTotalItem = 0;
            }
            this.orderService.setOrderData(data);
            this.items = this.orderService.getOrderData().selectedItems;
        }
    };
    CartComponent.prototype.gotToCategoryList = function () {
        this.router.navigate(['/waiter/order/:id/choose-category']);
    };
    CartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-cart',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/order/cart/cart.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/cart/cart.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _c || Object])
    ], CartComponent);
    return CartComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=cart.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"page-content-header\">\r\n    <div class=\"back-btn\">\r\n        <a routerLink=\"/waiter/order/:id\">\r\n            <i class=\"fas fa-angle-left\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"header-title\">\r\n        Choose Category\r\n    </div>\r\n</header>\r\n<div class=\"page-content\">\r\n    <app-steps></app-steps>\r\n    <div class=\"category-list\">\r\n        <div class=\"d-flex flex-wrap\">\r\n            <div class=\"d-flex align-items-center justify-content-between search-category w-100\">\r\n                <div class=\"md-form search\">\r\n                    <i class=\"fas fa-search prefix\"></i>\r\n                    <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Category\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"category\" *ngFor=\"let category of categoryList | filter : searchText\" [ngStyle]=\"{'background-color': category.color}\"\r\n                (click)=\"showItems(category)\">\r\n                <img *ngIf=\"!category.isIcon\" [src]=\"category.logo.small\" alt=\"\" />\r\n                <img class=\"icon-img\" *ngIf=\"category.isIcon\" [src]=\"category.icon\" alt=\"\" />\r\n                <p class=\"name\">{{category.name}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseCategoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_completer__ = __webpack_require__("../../../../ng2-completer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
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
    function ChooseCategoryComponent(orderService, completerService, globalService, router) {
        this.orderService = orderService;
        this.completerService = completerService;
        this.globalService = globalService;
        this.router = router;
        this.categoryList = [];
        this.categorySearchData = [];
        this.selectedCategory = {};
        this.categoryItems = [];
        this.showItem = false;
    }
    ChooseCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderService.getCategory()
            .then(function (data) {
            _this.categoryList = data.data;
            if (_this.categoryList.length) {
                for (var i = 0; i < _this.categoryList.length; i++) {
                    _this.categorySearchData.push({
                        _id: _this.categoryList[i]._id,
                        name: _this.categoryList[i].name,
                    });
                }
                _this.dataService = _this.completerService.local(_this.categorySearchData, 'name', 'name');
            }
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    ChooseCategoryComponent.prototype.showItems = function (category) {
        var _this = this;
        var orderdata = this.orderService.getOrderData();
        orderdata.selectedCategory = category;
        orderdata.categoryItems = [];
        this.orderService.getCategoryItem().then(function (data) {
            if (data.data.length) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].category._id == category._id) {
                        // for (let j = 0; j < data.data[i].subcategory.length; j++) {
                        //   for (let k = 0; k < data.data[i].subcategory[j].items.length; k++) {
                        //     orderdata.categoryItems.push(data.data[i].subcategory[j].items[k]);
                        //     this.orderService.setOrderData(orderdata);
                        //   }
                        // }
                        orderdata.categoryItems = data.data[i].items;
                        for (var j = 0; j < orderdata.categoryItems.length; j++) {
                            orderdata.categoryItems[j].quantity = 0;
                            orderdata.categoryItems[j].itemTotal = 0;
                        }
                    }
                }
            }
            _this.orderService.setOrderData(orderdata);
            _this.router.navigate(['/waiter/order/:id/choose-item']);
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    ChooseCategoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-choose-category',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _d || Object])
    ], ChooseCategoryComponent);
    return ChooseCategoryComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=choose-category.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"page-content-header\">\r\n    <div class=\"back-btn\">\r\n        <a routerLink=\"/waiter\">\r\n            <i class=\"fas fa-angle-left\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"header-title\">\r\n        Create an Order\r\n    </div>\r\n</header>\r\n<div class=\"page-content\">\r\n    <div class=\"stepper-form\">\r\n        <div>\r\n            <div class=\"d-flex justify-content-between label-container\">\r\n                <label class=\"label label-lg d-flex align-items-center\">\r\n                    <i class=\"fas fa-cube\"></i>\r\n                    <span class=\"label-primary\">{{roomData.name}}</span>\r\n                </label>\r\n                <label class=\"label label-lg d-flex align-items-center\">\r\n                    <img src=\"assets/images/table.png\" alt=\"\">\r\n                    <span class=\"label-yellow\">{{tableData.name}}</span>\r\n                </label>\r\n            </div>\r\n            <div class=\"md-form\">\r\n                <input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"noOfPeople\" placeholder=\"No. of Person\" />\r\n            </div>\r\n            <div class=\"alert-danger\" *ngIf=\"numberError\">{{numberErrorMsg}}</div>  \r\n            <div class=\"text-center\">\r\n                <button class=\"btn btn-success waves-light\" (click)=\"makeOrder()\" mdbRippleRadius>Make an Order</button>\r\n            </div>\r\n        </div>        \r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateOrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_completer__ = __webpack_require__("../../../../ng2-completer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CreateOrderComponent = /** @class */ (function () {
    function CreateOrderComponent(orderService, completerService, globalService, router) {
        this.orderService = orderService;
        this.completerService = completerService;
        this.globalService = globalService;
        this.router = router;
        this.orderForm = {};
        this.roomData = {};
        this.categoryList = [];
        this.stepperForm = false;
        this.showItem = false;
        this.room = {};
        this.tableData = {};
        this.quantity = 0;
        this.categorySearchData = [];
        this.selectedCategory = {};
        this.categoryItems = [];
        this.numberError = false;
        this.numberErrorMsg = '';
    }
    CreateOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.removeItem('tabData');
        localStorage.removeItem('stepData');
        if (this.orderService.getOrderData()) {
            this.noOfPeople = this.orderService.getOrderData().noOfPeople;
        }
        this.roomData = JSON.parse(localStorage.getItem('roomdata'));
        this.tableData = JSON.parse(localStorage.getItem('tabledata'));
        this.orderService.getCategory()
            .then(function (data) {
            _this.categoryList = data.data;
            if (_this.categoryList.length) {
                for (var i = 0; i < _this.categoryList.length; i++) {
                    _this.categorySearchData.push({
                        _id: _this.categoryList[i]._id,
                        name: _this.categoryList[i].name,
                    });
                }
                _this.dataService = _this.completerService.local(_this.categorySearchData, 'name', 'name');
            }
        })
            .catch(function (error) {
            console.log('error', error);
        });
    };
    CreateOrderComponent.prototype.makeOrder = function () {
        var _this = this;
        if (this.noOfPeople) {
            var data = {
                roomId: this.roomData["_id"],
                tableId: this.tableData["_id"],
                noOfPeople: this.noOfPeople,
                selectedItems: [],
                cartTotalPrice: 0,
                cartTotalItem: 0
            };
            this.orderService.setOrderData(data);
            this.router.navigate(['/waiter/order/:id/choose-category']);
        }
        else {
            this.numberError = true;
            this.numberErrorMsg = 'Please choose number of person';
            setTimeout(function () {
                _this.numberError = false;
                _this.numberErrorMsg = '';
            }, 4000);
        }
    };
    CreateOrderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-create-order',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_completer__["a" /* CompleterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_completer__["a" /* CompleterService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _d || Object])
    ], CreateOrderComponent);
    return CreateOrderComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=create-order.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/item/item.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"page-content-header\" [ngStyle]=\"{'background-color' : orderService.getOrderData().selectedCategory.color}\">\r\n    <div class=\"back-btn\">\r\n        <a routerLink=\"/waiter/order/:id/choose-category\">\r\n            <i class=\"fas fa-angle-left\"></i>\r\n        </a>\r\n    </div>\r\n    <div class=\"header-title\" *ngIf=\"orderService.getOrderData().selectedCategory\">\r\n        {{orderService.getOrderData().selectedCategory.name}}\r\n        <span class=\"add-article-btn\" (click)=\"addArticle()\">\r\n            <i class=\"fas fa-pencil-alt\"></i>\r\n        </span>\r\n    </div>\r\n</header>\r\n<div class=\"page-content\">\r\n    <div class=\"tabs-container subcategory-tabs\">\r\n        <ul [ngStyle]=\"{'background-color' : orderService.getOrderData().selectedCategory.color}\">\r\n            <li [class.subcategory-active]=\"selectedSubcategory[-1]\" (click)=\"filterBySubcategory()\">All</li>\r\n            <span *ngIf=\"data.selectedCategory.subCategory.length\">\r\n                <li *ngFor=\"let subCategory of data.selectedCategory.subCategory; let j = index\" [class.subcategory-active]=\"selectedSubcategory[j]\"\r\n                    (click)=\"filterBySubcategory(subCategory,j)\">\r\n                    {{subCategory}}\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n    <app-steps></app-steps>\r\n    <div class=\"item-container\">\r\n        <div class=\"search-category w-100\">\r\n            <div class=\"md-form search\">\r\n                <i class=\"fas fa-search prefix\"></i>\r\n                <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Item\" />\r\n                <button type=\"button\" class=\"btn-cart\" (click)=\"viewCart()\">\r\n                    <i class=\"fas fa-shopping-cart\"></i> {{orderService.getOrderData().cartTotalItem}} | &euro;{{orderService.getOrderData().cartTotalPrice}}\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"alert-danger\" *ngIf=\"error\">{{errorMsg}}</div>\r\n        <div *ngIf=\"!articles.length\" class=\"text-center\">\r\n            No Item Found\r\n        </div>\r\n        <div *ngIf=\"articles.length\">\r\n            <div *ngFor=\"let article of articles | filter : searchText ; let i = index\">\r\n                <div class=\"item-list align-items-center\" *ngIf=\"subcategory && (article.subCategory == subcategory)\">\r\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\r\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\r\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\r\n                            alt=\"Category Logo\" />\r\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\r\n                        <span class=\"item-quantity\" *ngIf=\"article.itemTotal>0\">{{article.itemTotal}}</span>\r\n                    </div>\r\n                    <div class=\"item-name\">\r\n                        <p class=\"name m-0\">{{article.name}}</p>\r\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\r\n                    </div>\r\n                    <div class=\"input-prepend-append\">\r\n                        <button type=\"button\" class=\"btn btn-prepend btn-danger\" id=\"decrease\" (click)=\"decreaseValue(article)\" value=\"Decrease Value\">\r\n                            <i class=\"fas fa-minus\"></i>\r\n                        </button>\r\n                        <button type=\"button\" class=\"btn btn-append btn-success\" id=\"increase\" (click)=\"increaseValue(article)\" value=\"Increase Value\">\r\n                            <i class=\"fas fa-plus\"></i>\r\n                        </button>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient()\">\r\n                        <img src=\"assets/images/icon_edit.png\" alt=\"\" />\r\n                    </button>\r\n                </div>\r\n                <div class=\"item-list align-items-center\" *ngIf=\"!subcategory\">\r\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\r\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\r\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\r\n                            alt=\"Category Logo\" />\r\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\r\n                        <span class=\"item-quantity\" *ngIf=\"article.itemTotal>0\">{{article.itemTotal}}</span>\r\n                    </div>\r\n                    <div class=\"item-name\">\r\n                        <p class=\"name m-0\">{{article.name}}</p>\r\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\r\n                    </div>\r\n                    <div class=\"input-prepend-append\">\r\n                        <button type=\"button\" class=\"btn btn-prepend btn-danger\" id=\"decrease\" (click)=\"decreaseValue(article)\" value=\"Decrease Value\">\r\n                            <i class=\"fas fa-minus\"></i>\r\n                        </button>\r\n                        <button type=\"button\" class=\"btn btn-append btn-success\" id=\"increase\" (click)=\"increaseValue(article)\" value=\"Increase Value\">\r\n                            <i class=\"fas fa-plus\"></i>\r\n                        </button>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient(article)\">\r\n                        <img src=\"assets/images/icon_edit.png\" alt=\"\" />\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"varient-container\" [class.show-varient]=\"showVarient\">\r\n    <div class=\"modal-header\">\r\n        <div class=\"back-btn\">\r\n            <a (click)=\"hideVarient()\">\r\n                <i class=\"fas fa-times\"></i>\r\n            </a>\r\n        </div>\r\n        <div class=\"header-title\" *ngIf=\"orderService.getOrderData().selectedCategory\">\r\n            Choose Varient\r\n            <button (click)=\"saveVariantData()\">Save</button>\r\n        </div>\r\n    </div>\r\n    <app-steps></app-steps>    \r\n    <div class=\"varient-content\">        \r\n        <div class=\"input-quantity-container\">\r\n            <h1>Quantity</h1>\r\n            <div class=\"input-prepend-append d-flex\">\r\n                <button type=\"button\" id=\"decrease\" value=\"Decrease Value\" (click)=\"decreaseQty()\">\r\n                    <i class=\"fas fa-minus\"></i>\r\n                </button>\r\n                <div class=\"text-center input-value\">{{variantData.quantity}}</div>\r\n                <button type=\"button\" id=\"increase\" value=\"Increase Value\" (click)=\"increaseQty()\">\r\n                    <i class=\"fas fa-plus\"></i>\r\n                </button>\r\n            </div>\r\n            <div *ngIf=\"variantError\" class=\"color-red\">{{variantError}}</div>\r\n        </div>\r\n        <h1>Varient and Notes</h1>\r\n        <div class=\"tabs-btn\">\r\n            <button type=\"button\" (click)=\"tabActive(1)\" [class.active]=\"activeTab[0]\">Varients</button>\r\n            <button type=\"button\" (click)=\"tabActive(2)\" [class.active]=\"activeTab[1]\">Notes</button>\r\n        </div>\r\n        <div class=\"varient-list\" *ngIf=\"activeTab[0]\">\r\n            <table class=\"table\">\r\n                <tbody>\r\n                    <tr *ngFor=\"let varient of variantList\">\r\n                        <td>{{varient.name}}</td>\r\n                        <td>&euro;{{varient.price}}</td>\r\n                        <td>\r\n                            <button type=\"button\" class=\"add-varient-btn\" [class.variant-remove]=\"varient.status == 0\" id=\"decrease\" value=\"Decrease Value\" (click)=\"addRemoveVariant(varient,0)\">\r\n                                <i class=\"fas fa-minus\"></i>\r\n                            </button>\r\n                            <button type=\"button\" class=\"add-varient-btn\" [class.variant-added]=\"varient.status == 1\"  id=\"increase\" value=\"Increase Value\" (click)=\"addRemoveVariant(varient,1)\">\r\n                                <i class=\"fas fa-plus\"></i>\r\n                            </button>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"varient-list\" *ngIf=\"activeTab[1]\">\r\n            <table class=\"table\">\r\n                <tbody>\r\n                    <tr *ngFor=\"let note of noteList; let i = index\">\r\n                        <td>{{note.notes}}</td>\r\n                        <td>\r\n                            <input type=\"checkbox\" (change)=\"addNote($event, note.notes, i)\" />\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"add-article\" [class.showarticle]=\"articleAdd\">\r\n    <div class=\"modal-header\">\r\n        <div class=\"back-btn\">\r\n            <a (click)=\"hideArticle()\">\r\n                <i class=\"fas fa-times\"></i>\r\n            </a>\r\n        </div>\r\n        <div class=\"header-title\">\r\n            New Article\r\n            <button>Save</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body varient-content\">\r\n        <div class=\"md-form\">\r\n            <label for=\"exampleForm2\">Default input</label>\r\n            <input type=\"text\" id=\"exampleForm2\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"input-quantity-container\">\r\n            <h1>Quantity</h1>\r\n            <div class=\"input-prepend-append d-flex\">\r\n                <button type=\"button\" id=\"decrease\" value=\"Decrease Value\">\r\n                    <i class=\"fas fa-minus\"></i>\r\n                </button>\r\n                <div class=\"text-center input-value\"></div>\r\n                <button type=\"button\" id=\"increase\" value=\"Increase Value\">\r\n                    <i class=\"fas fa-plus\"></i>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"md-form\">\r\n            <i class=\"fa fa-envelope prefix\"></i>\r\n            <input type=\"text\" id=\"inputIconEx1\" class=\"form-control\">\r\n            <label for=\"inputIconEx1\">E-mail address</label>\r\n        </div>\r\n        <div >\r\n            <h1>Varient and Notes</h1>\r\n            <div class=\"tabs-btn\">\r\n                <button type=\"button\" (click)=\"tabActive()\" [class.active]=\"!activeTab\">Varients</button>\r\n                <button type=\"button\" (click)=\"tabActive()\" [class.active]=\"activeTab\">Notes</button>\r\n            </div>\r\n            <div class=\"varient-list\" *ngIf=\"!activeTab\">\r\n                <table class=\"table\">\r\n                    <tbody>\r\n                        <tr *ngFor=\"let varient of variantList\">\r\n                            <td>{{varient.name}}</td>\r\n                            <td>&euro;{{varient.price}}</td>\r\n                            <td>\r\n                                <input type=\"checkbox\" />\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"varient-list\" *ngIf=\"activeTab\">\r\n                <table class=\"table\">\r\n                    <tbody>\r\n                        <tr *ngFor=\"let note of noteList\">\r\n                            <td>{{note.notes}}</td>\r\n                            <td>\r\n                                <input type=\"checkbox\" />\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/item/item.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/item/item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_completer__ = __webpack_require__("../../../../ng2-completer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_service__ = __webpack_require__("../../../../../src/app/hirundo/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ItemComponent = /** @class */ (function () {
    function ItemComponent(orderService, completerService, globalService, router) {
        this.orderService = orderService;
        this.completerService = completerService;
        this.globalService = globalService;
        this.router = router;
        this.quantity = 0;
        this.articles = [];
        this.categoryList = [];
        this.categorySearchData = [];
        this.variantList = [];
        this.noteList = [];
        this.showVarient = false;
        this.activeTab = [true, false];
        this.articleAdd = false;
        this.selectedSubcategory = [false];
        this.variantData = {
            quantity: 0,
            variant: [],
            notes: ''
        };
        this.notes = [];
        this.variantError = '';
    }
    ItemComponent.prototype.ngOnInit = function () {
        this.data = this.orderService.getOrderData();
        console.log('this.data', this.data);
        if (this.data.categoryItems) {
            for (var i = 0; i < this.data.categoryItems.length; i++) {
                this.data.categoryItems[i].itemTotal = 0;
                if (this.data.selectedItems.length) {
                    for (var j = 0; j < this.data.selectedItems.length; j++) {
                        if (this.data.selectedItems[j]._id == this.data.categoryItems[i]._id) {
                            this.data.categoryItems[i].quantity = this.data.selectedItems[j].quantity;
                            this.data.categoryItems[i].itemTotal = this.data.categoryItems[i].itemTotal + this.data.selectedItems[j].quantity;
                        }
                    }
                }
            }
            this.orderService.setOrderData(this.data);
            this.articles = this.orderService.getOrderData().categoryItems;
            this.selectedSubcategory[-1] = true;
        }
    };
    // increaseValue(article) {
    //   let value = article.quantity;
    //   value = isNaN(value) ? 0 : value;
    //   value++;
    //   article.quantity = value;
    //   let data = this.orderService.getOrderData();
    //   for (let i = 0; i < data.selectedItems.length; i++) {
    //     if (data.selectedItems[i]._id == article._id) {
    //       data.selectedItems.splice(i, 1);
    //     }
    //   }
    //   data.selectedItems.push(article);
    //   let cp = 0;
    //   let itemno = 0;                                    
    //   for (let i = 0; i < data.selectedItems.length; i++) {
    //     itemno += data.selectedItems[i].quantity;                                        
    //     cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
    //     data.cartTotalPrice = cp;
    //     data.cartTotalItem = itemno;                                                        
    //   }
    //   this.orderService.setOrderData(data);
    // }
    // decreaseValue(article) {
    //   let value = article.quantity;
    //   value = isNaN(value) ? 0 : value;
    //   value < 1 ? value = 1 : '';
    //   value--;
    //   article.quantity = value;
    //   let data = this.orderService.getOrderData();
    //   for (let i = 0; i < data.selectedItems.length; i++) {
    //     if (data.selectedItems[i]._id == article._id) {
    //       data.selectedItems.splice(i, 1);
    //     }
    //   }
    //   this.orderService.setOrderData(data);
    // }
    ItemComponent.prototype.increaseValue = function (article) {
        article.step = this.globalService.getTabData().step;
        var data = this.orderService.getOrderData();
        if (data.selectedItems.length) {
            var isExist = true;
            var isarr = [];
            for (var i = 0; i < data.selectedItems.length; i++) {
                if (data.selectedItems[i]._id == article._id) {
                    if (!data.selectedItems[i].variant) {
                        data.selectedItems[i].quantity += 1;
                        isarr.push(data.selectedItems[i]._id);
                        for (var j = 0; j < data.categoryItems.length; j++) {
                            if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                                data.categoryItems[j].itemTotal = data.selectedItems[i].quantity;
                            }
                        }
                    }
                    else {
                        for (var j = 0; j < data.categoryItems.length; j++) {
                            if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                                data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal + data.selectedItems[i].quantity;
                            }
                        }
                    }
                }
                if (data.selectedItems[i]._id != article._id) {
                    isExist = false;
                }
            }
            if (!isExist && isarr.indexOf(article._id) < 0) {
                article.quantity = article.quantity + 1;
                for (var j = 0; j < data.categoryItems.length; j++) {
                    if (data.categoryItems[j]._id == article._id) {
                        data.categoryItems[j].itemTotal = article.quantity;
                    }
                }
                data.selectedItems.push(article);
            }
        }
        else {
            article.quantity = article.quantity + 1;
            for (var j = 0; j < data.categoryItems.length; j++) {
                if (data.categoryItems[j]._id == article._id) {
                    data.categoryItems[j].itemTotal = article.quantity;
                }
            }
            data.selectedItems.push(article);
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        for (var i = 0; i < data.selectedItems.length; i++) {
            itemno += data.selectedItems[i].quantity;
            if (data.selectedItems[i].variant) {
                for (var j = 0; j < data.selectedItems[i].variant.length; j++) {
                    if (data.selectedItems[i].variant[j].status == 1) {
                        varicost += data.selectedItems[i].variant[j].price;
                    }
                }
            }
            cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
            data.cartTotalPrice = cp;
            data.cartTotalItem = itemno;
        }
        this.orderService.setOrderData(data);
        console.log('inc this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
        this.articles = this.orderService.getOrderData().categoryItems;
    };
    ItemComponent.prototype.decreaseValue = function (article) {
        console.log('article dec', article);
        article.step = this.globalService.getTabData().step;
        var data = this.orderService.getOrderData();
        for (var i = 0; i < data.selectedItems.length; i++) {
            if (data.selectedItems[i]._id == article._id && !data.selectedItems[i].variant) {
                if (data.selectedItems[i].quantity > 1) {
                    data.selectedItems[i].quantity = data.selectedItems[i].quantity - 1;
                    for (var j = 0; j < data.categoryItems.length; j++) {
                        if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                            data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
                        }
                    }
                }
                else {
                    article.quantity = 0;
                    for (var j = 0; j < data.categoryItems.length; j++) {
                        if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                            data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
                        }
                    }
                    data.selectedItems.splice(i, 1);
                }
            }
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        if (data.selectedItems.length) {
            for (var i = 0; i < data.selectedItems.length; i++) {
                itemno += data.selectedItems[i].quantity;
                if (data.selectedItems[i].variant) {
                    for (var j = 0; j < data.selectedItems[i].variant.length; j++) {
                        if (data.selectedItems[i].variant[j].status == 1) {
                            varicost += data.selectedItems[i].variant[j].price;
                        }
                    }
                }
                cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
                data.cartTotalPrice = cp;
                data.cartTotalItem = itemno;
            }
        }
        else {
            data.cartTotalPrice = 0;
            data.cartTotalItem = 0;
        }
        this.orderService.setOrderData(data);
        console.log('dec this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
        this.articles = this.orderService.getOrderData().categoryItems;
    };
    ItemComponent.prototype.viewCart = function () {
        this.router.navigate(['/waiter/order/:id/cart']);
    };
    ItemComponent.prototype.viewVarient = function (article) {
        var _this = this;
        this.orderService.getVariantAndNotes()
            .then(function (data) {
            _this.variantList = data.data.variants;
            _this.noteList = data.data.notes;
        })
            .catch(function (error) {
            console.log('error', error);
        });
        this.showVarient = true;
        this.articleData = article;
        this.notes = [];
        this.activeTab[0] = true;
        this.activeTab[1] = false;
    };
    ItemComponent.prototype.hideVarient = function () {
        this.showVarient = false;
        this.variantData = {
            quantity: 0,
            variant: [],
            notes: ''
        };
        this.notes = [];
        this.articleData = {};
    };
    ItemComponent.prototype.tabActive = function (tab) {
        if (tab == 1) {
            this.activeTab[0] = true;
            this.activeTab[1] = false;
        }
        else {
            this.activeTab[1] = true;
            this.activeTab[0] = false;
        }
    };
    ItemComponent.prototype.addArticle = function () {
        this.articleAdd = true;
    };
    ItemComponent.prototype.hideArticle = function () {
        this.articleAdd = false;
    };
    ItemComponent.prototype.filterBySubcategory = function (subcategory, index) {
        this.subcategory = subcategory;
        if (typeof index !== 'undefined') {
            this.selectedSubcategory[index] = true;
            this.selectedSubcategory[-1] = false;
            for (var i = 0; i < this.selectedSubcategory.length; i++) {
                if (index != i) {
                    this.selectedSubcategory[i] = false;
                }
            }
        }
        else {
            this.selectedSubcategory[-1] = true;
            for (var i = 0; i < this.selectedSubcategory.length; i++) {
                this.selectedSubcategory[i] = false;
            }
        }
    };
    ItemComponent.prototype.decreaseQty = function () {
        var value = this.variantData.quantity;
        value = isNaN(value) ? 0 : value;
        value < 1 ? value = 1 : '';
        value--;
        this.variantData.quantity = value;
    };
    ItemComponent.prototype.increaseQty = function () {
        var value = this.variantData.quantity;
        value = isNaN(value) ? 0 : value;
        value++;
        this.variantData.quantity = value;
    };
    ItemComponent.prototype.addRemoveVariant = function (variant, status) {
        if (status == 0) {
            variant.status = 0;
        }
        else {
            variant.status = 1;
        }
        for (var i = 0; i < this.variantData.variant.length; i++) {
            if (this.variantData.variant[i]._id == variant._id) {
                this.variantData.variant.splice(i, 1);
            }
        }
        this.variantData.variant.push(variant);
        console.log('this.variantData', this.variantData);
    };
    ItemComponent.prototype.addNote = function (event, note, i) {
        if (event.target.checked) {
            this.notes.push(note);
        }
        else {
            for (var i_1 = 0; i_1 < this.notes.length; i_1++) {
                if (this.notes[i_1] == note) {
                    this.notes.splice(i_1, 1);
                }
            }
        }
        this.variantData.notes = this.notes.toString();
    };
    ItemComponent.prototype.saveVariantData = function () {
        var _this = this;
        if (this.variantData.quantity == 0) {
            this.variantError = 'Please enter quantity';
            setTimeout(function () {
                _this.variantError = '';
            }, 4000);
        }
        else if (this.variantData.quantity > 0 && !this.variantData.variant.length && !this.variantData.notes) {
            this.variantError = 'Please select variants/notes';
            setTimeout(function () {
                _this.variantError = '';
            }, 4000);
        }
        else {
            this.articleData.quantity = this.variantData.quantity;
            this.articleData.variant = this.variantData.variant;
            this.articleData.ordernote = this.variantData.notes;
            this.articleData.step = this.globalService.getTabData().step;
            var data = this.orderService.getOrderData();
            data.selectedItems.push(this.articleData);
            for (var i = 0; i < data.categoryItems.length; i++) {
                if (data.categoryItems[i]._id == this.articleData._id) {
                    data.categoryItems[i].itemTotal = data.categoryItems[i].itemTotal + this.articleData.quantity;
                }
            }
            var cp = 0;
            var itemno = 0;
            var varicost = 0;
            for (var i = 0; i < data.selectedItems.length; i++) {
                itemno += data.selectedItems[i].quantity;
                if (data.selectedItems[i].variant) {
                    for (var j = 0; j < data.selectedItems[i].variant.length; j++) {
                        if (data.selectedItems[i].variant[j].status == 1) {
                            varicost += data.selectedItems[i].variant[j].price;
                        }
                    }
                }
                cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
                data.cartTotalPrice = cp;
                data.cartTotalItem = itemno;
            }
            this.orderService.setOrderData(data);
            this.hideVarient();
            console.log('variant this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
            this.articles = this.orderService.getOrderData().categoryItems;
        }
    };
    ItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-item',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _d || Object])
    ], ItemComponent);
    return ItemComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=item.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/order.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderComponent; });
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

var OrderComponent = /** @class */ (function () {
    function OrderComponent() {
    }
    OrderComponent.prototype.ngOnInit = function () {
    };
    OrderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-order',
            template: "<router-outlet></router-outlet>",
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/order.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], OrderComponent);
    return OrderComponent;
}());

//# sourceMappingURL=order.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/order.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderModule", function() { return OrderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_completer__ = __webpack_require__("../../../../ng2-completer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__item_item_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__create_order_create_order_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__choose_category_choose_category_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cart_cart_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/cart/cart.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var OrderModule = /** @class */ (function () {
    function OrderModule() {
    }
    OrderModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__order_routes__["a" /* OrderRouting */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_completer__["b" /* Ng2CompleterModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__order_component__["a" /* OrderComponent */], __WEBPACK_IMPORTED_MODULE_6__item_item_component__["a" /* ItemComponent */], __WEBPACK_IMPORTED_MODULE_7__create_order_create_order_component__["a" /* CreateOrderComponent */], __WEBPACK_IMPORTED_MODULE_8__choose_category_choose_category_component__["a" /* ChooseCategoryComponent */], __WEBPACK_IMPORTED_MODULE_10__cart_cart_component__["a" /* CartComponent */]],
        })
    ], OrderModule);
    return OrderModule;
}());

//# sourceMappingURL=order.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/order.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_item_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__choose_category_choose_category_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/choose-category/choose-category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_order_create_order_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/create-order/create-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/order/cart/cart.component.ts");






var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__order_component__["a" /* OrderComponent */],
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_4__create_order_create_order_component__["a" /* CreateOrderComponent */] },
            { path: 'choose-category', component: __WEBPACK_IMPORTED_MODULE_3__choose_category_choose_category_component__["a" /* ChooseCategoryComponent */] },
            { path: 'choose-item', component: __WEBPACK_IMPORTED_MODULE_2__item_item_component__["a" /* ItemComponent */] },
            { path: 'cart', component: __WEBPACK_IMPORTED_MODULE_5__cart_cart_component__["a" /* CartComponent */] },
        ],
        canActivate: []
    },
];
var OrderRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=order.routes.js.map

/***/ }),

/***/ "../../../../ng2-completer/components/completer-cmp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleterCmp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_completer_service__ = __webpack_require__("../../../../ng2-completer/services/completer-service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__globals__ = __webpack_require__("../../../../ng2-completer/globals.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);







var noop = function () { };
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_25" /* forwardRef */])(function () { return CompleterCmp; }),
    multi: true
};
var CompleterCmp = (function () {
    function CompleterCmp(completerService, cdr) {
        this.completerService = completerService;
        this.cdr = cdr;
        this.inputName = "";
        this.inputId = "";
        this.pause = __WEBPACK_IMPORTED_MODULE_4__globals__["d" /* PAUSE */];
        this.minSearchLength = __WEBPACK_IMPORTED_MODULE_4__globals__["c" /* MIN_SEARCH_LENGTH */];
        this.maxChars = __WEBPACK_IMPORTED_MODULE_4__globals__["b" /* MAX_CHARS */];
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.fillHighlighted = true;
        this.placeholder = "";
        this.autoMatch = false;
        this.disableInput = false;
        this.autofocus = false;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.autoHighlight = false;
        this.selected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.highlighted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.blurEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.click = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.focusEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.opened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.keyup = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.keydown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.control = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("");
        this.displaySearching = true;
        this.displayNoResults = true;
        this._textNoResults = __WEBPACK_IMPORTED_MODULE_4__globals__["e" /* TEXT_NO_RESULTS */];
        this._textSearching = __WEBPACK_IMPORTED_MODULE_4__globals__["f" /* TEXT_SEARCHING */];
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._focus = false;
        this._open = false;
        this._searchStr = "";
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: function () { return this.searchStr; },
        set: function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            // Propagate the change in any case
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CompleterCmp.prototype, "searchStr", {
        get: function () {
            return this._searchStr;
        },
        set: function (value) {
            if (typeof value === "string" || Object(__WEBPACK_IMPORTED_MODULE_4__globals__["g" /* isNil */])(value)) {
                this._searchStr = value;
            }
            else {
                this._searchStr = JSON.stringify(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CompleterCmp.prototype.ngAfterViewInit = function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this._focus) {
            setTimeout(function () {
                _this.ctrInput.nativeElement.focus();
                _this._focus = false;
            }, 0);
        }
    };
    CompleterCmp.prototype.onTouched = function () {
        this._onTouchedCallback();
    };
    CompleterCmp.prototype.writeValue = function (value) {
        this.searchStr = value;
    };
    CompleterCmp.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    CompleterCmp.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    CompleterCmp.prototype.setDisabledState = function (isDisabled) {
        this.disableInput = isDisabled;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = source;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: function (text) {
            if (this._textNoResults != text) {
                this._textNoResults = text;
                this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: function (text) {
            if (this._textSearching != text) {
                this._textSearching = text;
                this.displaySearching = !!this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    CompleterCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    CompleterCmp.prototype.onBlur = function () {
        this.blurEvent.emit();
        this.onTouched();
        this.cdr.detectChanges();
    };
    CompleterCmp.prototype.onFocus = function () {
        this.focusEvent.emit();
        this.onTouched();
    };
    CompleterCmp.prototype.onClick = function (event) {
        this.click.emit(event);
        this.onTouched();
    };
    CompleterCmp.prototype.onKeyup = function (event) {
        this.keyup.emit(event);
        event.stopPropagation();
    };
    CompleterCmp.prototype.onKeydown = function (event) {
        this.keydown.emit(event);
        event.stopPropagation();
    };
    CompleterCmp.prototype.onChange = function (value) {
        this.value = value;
    };
    CompleterCmp.prototype.open = function () {
        this.completer.open();
    };
    CompleterCmp.prototype.close = function () {
        this.completer.clear();
    };
    CompleterCmp.prototype.focus = function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    CompleterCmp.prototype.blur = function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.blur();
        }
        else {
            this._focus = false;
        }
    };
    CompleterCmp.prototype.isOpen = function () {
        return this._open;
    };
    CompleterCmp.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */], args: [{
                    selector: "ng2-completer",
                    template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\" class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\" [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\" \n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\" [selectOnFocus]=\"selectOnFocus\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{_textSearching}}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\" class=\"completer-no-results\">{{_textNoResults}}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\" [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\" class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: ["\n    .completer-dropdown {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n    "],
                    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CompleterCmp.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_3__services_completer_service__["a" /* CompleterService */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ChangeDetectorRef */], },
    ]; };
    CompleterCmp.propDecorators = {
        'dataService': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'inputName': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'inputId': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'pause': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'minSearchLength': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'maxChars': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'overrideSuggested': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'clearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'clearUnselected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'fillHighlighted': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'placeholder': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'matchClass': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'fieldTabindex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'autoMatch': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'disableInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'inputClass': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'autofocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'openOnFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'openOnClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'selectOnClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'selectOnFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'initialValue': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'autoHighlight': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'selected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'highlighted': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'blurEvent': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */], args: ["blur",] },],
        'click': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'focusEvent': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */], args: ["focus",] },],
        'opened': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'keyup': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'keydown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'completer': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */], args: [__WEBPACK_IMPORTED_MODULE_2__directives_ctr_completer__["a" /* CtrCompleter */],] },],
        'ctrInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */], args: ["ctrInput",] },],
        'datasource': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'textNoResults': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'textSearching': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
    };
    return CompleterCmp;
}());

//# sourceMappingURL=completer-cmp.js.map

/***/ }),

/***/ "../../../../ng2-completer/components/completer-list-item-cmp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleterListItemCmp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");


var CompleterListItemCmp = (function () {
    function CompleterListItemCmp() {
        this.parts = [];
    }
    CompleterListItemCmp.prototype.ngOnInit = function () {
        if (!this.searchStr) {
            this.parts.push({ isMatch: false, text: this.text });
            return;
        }
        var matchStr = this.text.toLowerCase();
        var matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        var startIndex = 0;
        while (matchPos >= 0) {
            var matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            }
            else if (matchPos > 0) {
                var matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
            this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    };
    CompleterListItemCmp.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */], args: [{
                    selector: "completer-list-item",
                    template: "<span class=\"completer-list-item-holder\" [ngClass]=\"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n        <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]=\"part.isMatch ? matchClass : null\">{{part.text}}</span>\n    </span>"
                },] },
    ];
    /** @nocollapse */
    CompleterListItemCmp.ctorParameters = function () { return []; };
    CompleterListItemCmp.propDecorators = {
        'text': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'searchStr': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'matchClass': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'type': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
    };
    return CompleterListItemCmp;
}());

//# sourceMappingURL=completer-list-item-cmp.js.map

/***/ }),

/***/ "../../../../ng2-completer/directives/ctr-completer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtrCompleter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");

var CtrCompleter = (function () {
    function CtrCompleter() {
        this.selected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.highlighted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.opened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.dataSourceChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this._hasHighlighted = false;
        this._hasSelected = false;
        this._cancelBlur = false;
        this._isOpen = false;
    }
    CtrCompleter.prototype.registerList = function (list) {
        this.list = list;
    };
    CtrCompleter.prototype.registerDropdown = function (dropdown) {
        this.dropdown = dropdown;
    };
    CtrCompleter.prototype.onHighlighted = function (item) {
        this.highlighted.emit(item);
        this._hasHighlighted = !!item;
    };
    CtrCompleter.prototype.onSelected = function (item, clearList) {
        if (clearList === void 0) { clearList = true; }
        this.selected.emit(item);
        if (item) {
            this._hasSelected = true;
        }
        if (clearList) {
            this.clear();
        }
    };
    CtrCompleter.prototype.onDataSourceChange = function () {
        if (this.hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        this.dataSourceChange.emit();
    };
    CtrCompleter.prototype.search = function (term) {
        if (this._hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        if (this.list) {
            this.list.search(term);
        }
    };
    CtrCompleter.prototype.clear = function () {
        this._hasHighlighted = false;
        this.isOpen = false;
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    };
    CtrCompleter.prototype.selectCurrent = function () {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    };
    CtrCompleter.prototype.nextRow = function () {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    };
    CtrCompleter.prototype.prevRow = function () {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    };
    CtrCompleter.prototype.hasHighlighted = function () {
        return this._hasHighlighted;
    };
    CtrCompleter.prototype.cancelBlur = function (cancel) {
        this._cancelBlur = cancel;
    };
    CtrCompleter.prototype.isCancelBlur = function () {
        return this._cancelBlur;
    };
    CtrCompleter.prototype.open = function () {
        if (!this._isOpen) {
            this.isOpen = true;
            this.list.open();
        }
    };
    Object.defineProperty(CtrCompleter.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (open) {
            this._isOpen = open;
            this.opened.emit(this._isOpen);
            if (this.list) {
                this.list.isOpen(open);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "autoHighlightIndex", {
        get: function () {
            return this._autoHighlightIndex;
        },
        set: function (index) {
            this._autoHighlightIndex = index;
            if (this.dropdown) {
                this.dropdown.highlightRow(this._autoHighlightIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "hasSelected", {
        get: function () {
            return this._hasSelected;
        },
        enumerable: true,
        configurable: true
    });
    CtrCompleter.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */], args: [{
                    selector: "[ctrCompleter]",
                },] },
    ];
    /** @nocollapse */
    CtrCompleter.ctorParameters = function () { return []; };
    CtrCompleter.propDecorators = {
        'selected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'highlighted': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'opened': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'dataSourceChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
    };
    return CtrCompleter;
}());

//# sourceMappingURL=ctr-completer.js.map

/***/ }),

/***/ "../../../../ng2-completer/directives/ctr-dropdown.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CtrRowItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtrDropdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__("../../../../ng2-completer/globals.js");



var CtrRowItem = (function () {
    function CtrRowItem(row, index) {
        this.row = row;
        this.index = index;
    }
    return CtrRowItem;
}());

var CtrDropdown = (function () {
    function CtrDropdown(completer, el) {
        this.completer = completer;
        this.el = el;
        this.rows = [];
        this._rowMouseDown = false;
        this.completer.registerDropdown(this);
    }
    CtrDropdown.prototype.ngOnDestroy = function () {
        this.completer.registerDropdown(null);
    };
    CtrDropdown.prototype.ngAfterViewInit = function () {
        var _this = this;
        var css = getComputedStyle(this.el.nativeElement);
        var autoHighlightIndex = this.completer.autoHighlightIndex;
        this.isScrollOn = !!css.maxHeight && css.overflowY === "auto";
        if (autoHighlightIndex) {
            setTimeout(function () {
                _this.highlightRow(autoHighlightIndex);
            }, 0);
        }
    };
    CtrDropdown.prototype.onMouseDown = function (event) {
        var _this = this;
        // Support for canceling blur on IE (issue #158)
        if (!this._rowMouseDown) {
            this.completer.cancelBlur(true);
            setTimeout(function () {
                _this.completer.cancelBlur(false);
            }, 0);
        }
        else {
            this._rowMouseDown = false;
        }
    };
    CtrDropdown.prototype.registerRow = function (row) {
        var arrIndex = this.rows.findIndex(function (_row) { return _row.index === row.index; });
        if (arrIndex >= 0) {
            this.rows[arrIndex] = row;
        }
        else {
            this.rows.push(row);
        }
    };
    CtrDropdown.prototype.unregisterRow = function (rowIndex) {
        var arrIndex = this.rows.findIndex(function (_row) { return _row.index === rowIndex; });
        this.rows.splice(arrIndex, 1);
        if (this.currHighlighted && rowIndex === this.currHighlighted.index) {
            this.highlightRow(null);
        }
    };
    CtrDropdown.prototype.highlightRow = function (index) {
        var highlighted = this.rows.find(function (row) { return row.index === index; });
        if (Object(__WEBPACK_IMPORTED_MODULE_2__globals__["g" /* isNil */])(index) || index < 0) {
            if (this.currHighlighted) {
                this.currHighlighted.row.setHighlighted(false);
            }
            this.currHighlighted = undefined;
            this.completer.onHighlighted(null);
            return;
        }
        if (!highlighted) {
            return;
        }
        if (this.currHighlighted) {
            this.currHighlighted.row.setHighlighted(false);
        }
        this.currHighlighted = highlighted;
        this.currHighlighted.row.setHighlighted(true);
        this.completer.onHighlighted(this.currHighlighted.row.getDataItem());
        if (this.isScrollOn && this.currHighlighted) {
            var rowTop = this.dropdownRowTop();
            if (!rowTop) {
                return;
            }
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
            else {
                var row = this.currHighlighted.row.getNativeElement();
                if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                    this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
                    if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row) < row.getBoundingClientRect().top) {
                        this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top + parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10)));
                    }
                }
            }
        }
    };
    CtrDropdown.prototype.clear = function () {
        this.rows = [];
    };
    CtrDropdown.prototype.onSelected = function (item) {
        this.completer.onSelected(item);
    };
    CtrDropdown.prototype.rowMouseDown = function () {
        this._rowMouseDown = true;
    };
    CtrDropdown.prototype.selectCurrent = function () {
        if (this.currHighlighted) {
            this.onSelected(this.currHighlighted.row.getDataItem());
        }
        else if (this.rows.length > 0) {
            this.onSelected(this.rows[0].row.getDataItem());
        }
    };
    CtrDropdown.prototype.nextRow = function () {
        var nextRowIndex = 0;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index + 1;
        }
        this.highlightRow(nextRowIndex);
    };
    CtrDropdown.prototype.prevRow = function () {
        var nextRowIndex = -1;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index - 1;
        }
        this.highlightRow(nextRowIndex);
    };
    CtrDropdown.prototype.dropdownScrollTopTo = function (offset) {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
    };
    CtrDropdown.prototype.dropdownRowTop = function () {
        if (!this.currHighlighted) {
            return;
        }
        return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
            (this.el.nativeElement.getBoundingClientRect().top +
                parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10));
    };
    CtrDropdown.prototype.dropdownHeight = function () {
        return this.el.nativeElement.getBoundingClientRect().top +
            parseInt(getComputedStyle(this.el.nativeElement).maxHeight, 10);
    };
    CtrDropdown.prototype.dropdownRowOffsetHeight = function (row) {
        var css = getComputedStyle(row.parentElement);
        return row.parentElement.offsetHeight +
            parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
    };
    CtrDropdown.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */], args: [{
                    selector: "[ctrDropdown]",
                },] },
    ];
    /** @nocollapse */
    CtrDropdown.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__ctr_completer__["a" /* CtrCompleter */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Host */] },] },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */], },
    ]; };
    CtrDropdown.propDecorators = {
        'onMouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["mousedown", ["$event"],] },],
    };
    return CtrDropdown;
}());

//# sourceMappingURL=ctr-dropdown.js.map

/***/ }),

/***/ "../../../../ng2-completer/directives/ctr-input.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtrInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__globals__ = __webpack_require__("../../../../ng2-completer/globals.js");





// keyboard events
var KEY_DW = 40;
var KEY_RT = 39;
var KEY_UP = 38;
var KEY_LF = 37;
var KEY_ES = 27;
var KEY_EN = 13;
var KEY_TAB = 9;
var KEY_BK = 8;
var KEY_SH = 16;
var KEY_CL = 20;
var KEY_F1 = 112;
var KEY_F12 = 123;
var CtrInput = (function () {
    function CtrInput(completer, ngModel, el) {
        var _this = this;
        this.completer = completer;
        this.ngModel = ngModel;
        this.el = el;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.overrideSuggested = false;
        this.fillHighlighted = true;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.ngModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this._searchStr = "";
        this._displayStr = "";
        this.blurTimer = null;
        this.completer.selected.subscribe(function (item) {
            if (!item) {
                return;
            }
            if (_this.clearSelected) {
                _this.searchStr = "";
            }
            else {
                _this.searchStr = item.title;
            }
            _this.ngModelChange.emit(_this.searchStr);
        });
        this.completer.highlighted.subscribe(function (item) {
            if (_this.fillHighlighted) {
                if (item) {
                    _this._displayStr = item.title;
                    _this.ngModelChange.emit(item.title);
                }
                else {
                    _this._displayStr = _this.searchStr;
                    _this.ngModelChange.emit(_this.searchStr);
                }
            }
        });
        this.completer.dataSourceChange.subscribe(function () {
            _this.searchStr = "";
            _this.ngModelChange.emit(_this.searchStr);
        });
        if (this.ngModel.valueChanges) {
            this.ngModel.valueChanges.subscribe(function (value) {
                if (!Object(__WEBPACK_IMPORTED_MODULE_4__globals__["g" /* isNil */])(value) && _this._displayStr !== value) {
                    if (_this.searchStr !== value) {
                        _this.completer.search(value);
                    }
                    _this.searchStr = value;
                }
            });
        }
    }
    CtrInput.prototype.keyupHandler = function (event) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }
        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.search(this.searchStr);
        }
        else if (event.keyCode === KEY_ES) {
            if (this.completer.isOpen) {
                this.restoreSearchValue();
                this.completer.clear();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    CtrInput.prototype.pasteHandler = function (event) {
        this.completer.open();
    };
    CtrInput.prototype.keydownHandler = function (event) {
        var keyCode = event.keyCode || event.which;
        if (keyCode === KEY_EN) {
            if (this.completer.hasHighlighted()) {
                event.preventDefault();
            }
            this.handleSelection();
        }
        else if (keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.open();
            this.completer.nextRow();
        }
        else if (keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        }
        else if (keyCode === KEY_TAB) {
            this.handleSelection();
        }
        else if (keyCode === KEY_BK) {
            this.completer.open();
        }
        else if (keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
            if (this.completer.isOpen) {
                event.stopPropagation();
            }
        }
        else {
            if (keyCode !== 0 && keyCode !== KEY_SH && keyCode !== KEY_CL &&
                (keyCode <= KEY_F1 || keyCode >= KEY_F12) &&
                !event.ctrlKey && !event.metaKey && !event.altKey) {
                this.completer.open();
            }
        }
    };
    CtrInput.prototype.onBlur = function (event) {
        var _this = this;
        // Check if we need to cancel Blur for IE
        if (this.completer.isCancelBlur()) {
            setTimeout(function () {
                // get the focus back
                _this.el.nativeElement.focus();
            }, 0);
            return;
        }
        if (this.completer.isOpen) {
            this.blurTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].timer(200).subscribe(function () { return _this.doBlur(); });
        }
    };
    CtrInput.prototype.onfocus = function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.selectOnFocus) {
            this.el.nativeElement.select();
        }
        if (this.openOnFocus) {
            this.completer.open();
        }
    };
    CtrInput.prototype.onClick = function (event) {
        if (this.selectOnClick) {
            this.el.nativeElement.select();
        }
        if (this.openOnClick) {
            if (this.completer.isOpen) {
                this.completer.clear();
            }
            else {
                this.completer.open();
            }
        }
    };
    Object.defineProperty(CtrInput.prototype, "searchStr", {
        get: function () {
            return this._searchStr;
        },
        set: function (term) {
            this._searchStr = term;
            this._displayStr = term;
        },
        enumerable: true,
        configurable: true
    });
    CtrInput.prototype.handleSelection = function () {
        if (this.completer.hasHighlighted()) {
            this._searchStr = "";
            this.completer.selectCurrent();
        }
        else if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            this.completer.clear();
        }
    };
    CtrInput.prototype.restoreSearchValue = function () {
        if (this.fillHighlighted) {
            if (this._displayStr != this.searchStr) {
                this._displayStr = this.searchStr;
                this.ngModelChange.emit(this.searchStr);
            }
        }
    };
    CtrInput.prototype.doBlur = function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            else {
                this.restoreSearchValue();
            }
        }
        this.completer.clear();
    };
    CtrInput.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */], args: [{
                    selector: "[ctrInput]",
                },] },
    ];
    /** @nocollapse */
    CtrInput.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_3__ctr_completer__["a" /* CtrCompleter */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Host */] },] },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* NgModel */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */], },
    ]; };
    CtrInput.propDecorators = {
        'clearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["clearSelected",] },],
        'clearUnselected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["clearUnselected",] },],
        'overrideSuggested': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["overrideSuggested",] },],
        'fillHighlighted': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["fillHighlighted",] },],
        'openOnFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["openOnFocus",] },],
        'openOnClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["openOnClick",] },],
        'selectOnClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["selectOnClick",] },],
        'selectOnFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */], args: ["selectOnFocus",] },],
        'ngModelChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */] },],
        'keyupHandler': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["keyup", ["$event"],] },],
        'pasteHandler': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["paste", ["$event"],] },],
        'keydownHandler': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["keydown", ["$event"],] },],
        'onBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["blur", ["$event"],] },],
        'onfocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["focus", [],] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["click", ["$event"],] },],
    };
    return CtrInput;
}());

//# sourceMappingURL=ctr-input.js.map

/***/ }),

/***/ "../../../../ng2-completer/directives/ctr-list.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CtrListContext */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtrList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_timer__ = __webpack_require__("../../../../rxjs/add/observable/timer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retryWhen__ = __webpack_require__("../../../../rxjs/add/operator/retryWhen.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retryWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_retryWhen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__("../../../../rxjs/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__globals__ = __webpack_require__("../../../../ng2-completer/globals.js");







var CtrListContext = (function () {
    function CtrListContext(results, searching, searchInitialized, isOpen) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
        this.isOpen = isOpen;
    }
    return CtrListContext;
}());

var CtrList = (function () {
    function CtrList(completer, templateRef, viewContainer, cd) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.ctrListMinSearchLength = __WEBPACK_IMPORTED_MODULE_6__globals__["c" /* MIN_SEARCH_LENGTH */];
        this.ctrListPause = __WEBPACK_IMPORTED_MODULE_6__globals__["d" /* PAUSE */];
        this.ctrListAutoMatch = false;
        this.ctrListAutoHighlight = false;
        this.ctrListDisplaySearching = true;
        // private results: CompleterItem[] = [];
        this.term = null;
        // private searching = false;
        this.searchTimer = null;
        this.clearTimer = null;
        this.ctx = new CtrListContext([], false, false, false);
        this._initialValue = null;
        this.viewRef = null;
    }
    CtrList.prototype.ngOnInit = function () {
        this.completer.registerList(this);
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: function (newService) {
            this._dataService = newService;
            this.dataServiceSubscribe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrList.prototype, "initialValue", {
        set: function (value) {
            var _this = this;
            if (this._dataService && typeof this._dataService.convertToItem === "function") {
                setTimeout(function () {
                    var initialItem = _this._dataService.convertToItem(value);
                    if (initialItem) {
                        _this.completer.onSelected(initialItem, false);
                    }
                });
            }
            else if (!this._dataService) {
                this._initialValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CtrList.prototype.search = function (term) {
        var _this = this;
        if (!Object(__WEBPACK_IMPORTED_MODULE_6__globals__["g" /* isNil */])(term) && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (!this.ctx.searching) {
                if (this.ctrListDisplaySearching) {
                    this.ctx.results = [];
                }
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            if (this.clearTimer) {
                this.clearTimer.unsubscribe();
            }
            this.searchTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].timer(this.ctrListPause).subscribe(function () {
                _this.searchTimerComplete(term);
            });
        }
        else if (!Object(__WEBPACK_IMPORTED_MODULE_6__globals__["g" /* isNil */])(term) && term.length < this.ctrListMinSearchLength) {
            this.clear();
            this.term = "";
        }
    };
    CtrList.prototype.clear = function () {
        var _this = this;
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
        }
        this.clearTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].timer(__WEBPACK_IMPORTED_MODULE_6__globals__["a" /* CLEAR_TIMEOUT */]).subscribe(function () {
            _this._clear();
        });
    };
    CtrList.prototype.open = function () {
        if (!this.ctx.searchInitialized) {
            this.search("");
        }
        this.refreshTemplate();
    };
    CtrList.prototype.isOpen = function (open) {
        this.ctx.isOpen = open;
    };
    CtrList.prototype._clear = function () {
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
            this.searchTimer = null;
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.viewContainer.clear();
        this.viewRef = null;
    };
    CtrList.prototype.searchTimerComplete = function (term) {
        // Begin the search
        if (Object(__WEBPACK_IMPORTED_MODULE_6__globals__["g" /* isNil */])(term) || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    CtrList.prototype.refreshTemplate = function () {
        // create the template if it doesn't exist
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
        }
        else if (!this.viewRef.destroyed) {
            // refresh the template
            this.viewRef.context.isOpen = this.ctx.isOpen;
            this.viewRef.context.results = this.ctx.results;
            this.viewRef.context.searching = this.ctx.searching;
            this.viewRef.context.searchInitialized = this.ctx.searchInitialized;
            this.viewRef.detectChanges();
        }
        this.cd.markForCheck();
    };
    CtrList.prototype.getBestMatchIndex = function () {
        var _this = this;
        if (!this.ctx.results || !this.term) {
            return null;
        }
        // First try to find the exact term
        var bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === _this.term.toLocaleLowerCase(); });
        // If not try to find the first item that starts with the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().startsWith(_this.term.toLocaleLowerCase()); });
        }
        // If not try to find the first item that includes the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().includes(_this.term.toLocaleLowerCase()); });
        }
        return bestMatch < 0 ? null : bestMatch;
    };
    CtrList.prototype.dataServiceSubscribe = function () {
        var _this = this;
        if (this._dataService) {
            this._dataService
                .catch(function (err) {
                console.error(err);
                console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                return [];
            })
                .subscribe(function (results) {
                _this.ctx.searchInitialized = true;
                _this.ctx.searching = false;
                _this.ctx.results = results;
                if (_this.ctrListAutoMatch && results && results.length === 1 && results[0].title && !Object(__WEBPACK_IMPORTED_MODULE_6__globals__["g" /* isNil */])(_this.term) &&
                    results[0].title.toLocaleLowerCase() === _this.term.toLocaleLowerCase()) {
                    // Do automatch
                    _this.completer.onSelected(results[0]);
                    return;
                }
                if (_this._initialValue) {
                    _this.initialValue = _this._initialValue;
                    _this._initialValue = null;
                }
                _this.refreshTemplate();
                if (_this.ctrListAutoHighlight) {
                    _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                }
            });
            if (this._dataService.dataSourceChange) {
                this._dataService.dataSourceChange.subscribe(function () {
                    _this.term = null;
                    _this.ctx.searchInitialized = false;
                    _this.ctx.searching = false;
                    _this.ctx.results = [];
                    _this.refreshTemplate();
                    _this.completer.onDataSourceChange();
                });
            }
        }
    };
    CtrList.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* Directive */], args: [{
                    selector: "[ctrList]",
                },] },
    ];
    /** @nocollapse */
    CtrList.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_5__ctr_completer__["a" /* CtrCompleter */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["y" /* Host */] },] },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_13" /* TemplateRef */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_19" /* ViewContainerRef */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["l" /* ChangeDetectorRef */], },
    ]; };
    CtrList.propDecorators = {
        'ctrListMinSearchLength': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */] },],
        'ctrListPause': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */] },],
        'ctrListAutoMatch': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */] },],
        'ctrListAutoHighlight': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */] },],
        'ctrListDisplaySearching': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */] },],
        'dataService': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */], args: ["ctrList",] },],
        'initialValue': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */], args: ["ctrListInitialValue",] },],
    };
    return CtrList;
}());

//# sourceMappingURL=ctr-list.js.map

/***/ }),

/***/ "../../../../ng2-completer/directives/ctr-row.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtrRow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ctr_dropdown__ = __webpack_require__("../../../../ng2-completer/directives/ctr-dropdown.js");


var CtrRow = (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    CtrRow.prototype.ngOnDestroy = function () {
        if (this._rowIndex) {
            this.dropdown.unregisterRow(this._rowIndex);
        }
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: function (index) {
            this._rowIndex = index;
            this.dropdown.registerRow(new __WEBPACK_IMPORTED_MODULE_1__ctr_dropdown__["b" /* CtrRowItem */](this, this._rowIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    CtrRow.prototype.onClick = function (event) {
        this.dropdown.onSelected(this._item);
    };
    CtrRow.prototype.onMouseEnter = function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    CtrRow.prototype.onMouseDown = function (event) {
        this.dropdown.rowMouseDown();
    };
    CtrRow.prototype.setHighlighted = function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    CtrRow.prototype.getNativeElement = function () {
        return this.el.nativeElement;
    };
    CtrRow.prototype.getDataItem = function () {
        return this._item;
    };
    CtrRow.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */], args: [{
                    selector: "[ctrRow]",
                },] },
    ];
    /** @nocollapse */
    CtrRow.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Renderer */], },
        { type: __WEBPACK_IMPORTED_MODULE_1__ctr_dropdown__["a" /* CtrDropdown */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Host */] },] },
    ]; };
    CtrRow.propDecorators = {
        'ctrRow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'dataItem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["click", ["$event"],] },],
        'onMouseEnter': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["mouseenter", ["$event"],] },],
        'onMouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */], args: ["mousedown", ["$event"],] },],
    };
    return CtrRow;
}());

//# sourceMappingURL=ctr-row.js.map

/***/ }),

/***/ "../../../../ng2-completer/globals.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MAX_CHARS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MIN_SEARCH_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PAUSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TEXT_SEARCHING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TEXT_NO_RESULTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR_TIMEOUT; });
/* harmony export (immutable) */ __webpack_exports__["g"] = isNil;
var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
var MIN_SEARCH_LENGTH = 3;
var PAUSE = 10;
var TEXT_SEARCHING = "Searching...";
var TEXT_NO_RESULTS = "No results found";
var CLEAR_TIMEOUT = 50;
function isNil(value) {
    return typeof value === "undefined" || value === null;
}
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ "../../../../ng2-completer/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ng2_completer_module__ = __webpack_require__("../../../../ng2-completer/ng2-completer.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__ng2_completer_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_completer_cmp__ = __webpack_require__("../../../../ng2-completer/components/completer-cmp.js");
/* unused harmony reexport CompleterCmp */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_completer_list_item_cmp__ = __webpack_require__("../../../../ng2-completer/components/completer-list-item-cmp.js");
/* unused harmony reexport CompleterListItemCmp */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_completer_service__ = __webpack_require__("../../../../ng2-completer/services/completer-service.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__services_completer_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_completer_data_factory__ = __webpack_require__("../../../../ng2-completer/services/completer-data-factory.js");
/* unused harmony reexport localDataFactory */
/* unused harmony reexport LocalDataFactoryProvider */
/* unused harmony reexport remoteDataFactory */
/* unused harmony reexport RemoteDataFactoryProvider */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_local_data__ = __webpack_require__("../../../../ng2-completer/services/local-data.js");
/* unused harmony reexport LocalData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_remote_data__ = __webpack_require__("../../../../ng2-completer/services/remote-data.js");
/* unused harmony reexport RemoteData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_completer_base_data__ = __webpack_require__("../../../../ng2-completer/services/completer-base-data.js");
/* unused harmony reexport CompleterBaseData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* unused harmony reexport CtrCompleter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_ctr_dropdown__ = __webpack_require__("../../../../ng2-completer/directives/ctr-dropdown.js");
/* unused harmony reexport CtrDropdown */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_ctr_input__ = __webpack_require__("../../../../ng2-completer/directives/ctr-input.js");
/* unused harmony reexport CtrInput */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_ctr_list__ = __webpack_require__("../../../../ng2-completer/directives/ctr-list.js");
/* unused harmony reexport CtrList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_ctr_row__ = __webpack_require__("../../../../ng2-completer/directives/ctr-row.js");
/* unused harmony reexport CtrRow */













//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../ng2-completer/ng2-completer.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng2CompleterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_completer_cmp__ = __webpack_require__("../../../../ng2-completer/components/completer-cmp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_completer_list_item_cmp__ = __webpack_require__("../../../../ng2-completer/components/completer-list-item-cmp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_completer_service__ = __webpack_require__("../../../../ng2-completer/services/completer-service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_completer_data_factory__ = __webpack_require__("../../../../ng2-completer/services/completer-data-factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_ctr_completer__ = __webpack_require__("../../../../ng2-completer/directives/ctr-completer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_ctr_dropdown__ = __webpack_require__("../../../../ng2-completer/directives/ctr-dropdown.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_ctr_input__ = __webpack_require__("../../../../ng2-completer/directives/ctr-input.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_ctr_list__ = __webpack_require__("../../../../ng2-completer/directives/ctr-list.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_ctr_row__ = __webpack_require__("../../../../ng2-completer/directives/ctr-row.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");













var Ng2CompleterModule = (function () {
    function Ng2CompleterModule() {
    }
    Ng2CompleterModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_12__angular_common__["b" /* CommonModule */],
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormsModule */],
                        __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_4__components_completer_list_item_cmp__["a" /* CompleterListItemCmp */],
                        __WEBPACK_IMPORTED_MODULE_7__directives_ctr_completer__["a" /* CtrCompleter */],
                        __WEBPACK_IMPORTED_MODULE_8__directives_ctr_dropdown__["a" /* CtrDropdown */],
                        __WEBPACK_IMPORTED_MODULE_9__directives_ctr_input__["a" /* CtrInput */],
                        __WEBPACK_IMPORTED_MODULE_10__directives_ctr_list__["a" /* CtrList */],
                        __WEBPACK_IMPORTED_MODULE_11__directives_ctr_row__["a" /* CtrRow */],
                        __WEBPACK_IMPORTED_MODULE_3__components_completer_cmp__["a" /* CompleterCmp */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_3__components_completer_cmp__["a" /* CompleterCmp */],
                        __WEBPACK_IMPORTED_MODULE_4__components_completer_list_item_cmp__["a" /* CompleterListItemCmp */],
                        __WEBPACK_IMPORTED_MODULE_7__directives_ctr_completer__["a" /* CtrCompleter */],
                        __WEBPACK_IMPORTED_MODULE_8__directives_ctr_dropdown__["a" /* CtrDropdown */],
                        __WEBPACK_IMPORTED_MODULE_9__directives_ctr_input__["a" /* CtrInput */],
                        __WEBPACK_IMPORTED_MODULE_10__directives_ctr_list__["a" /* CtrList */],
                        __WEBPACK_IMPORTED_MODULE_11__directives_ctr_row__["a" /* CtrRow */]
                    ],
                    providers: [
                        __WEBPACK_IMPORTED_MODULE_5__services_completer_service__["a" /* CompleterService */],
                        __WEBPACK_IMPORTED_MODULE_6__services_completer_data_factory__["a" /* LocalDataFactoryProvider */],
                        __WEBPACK_IMPORTED_MODULE_6__services_completer_data_factory__["b" /* RemoteDataFactoryProvider */]
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2CompleterModule.ctorParameters = function () { return []; };
    return Ng2CompleterModule;
}());

//# sourceMappingURL=ng2-completer.module.js.map

/***/ }),

/***/ "../../../../ng2-completer/services/completer-base-data.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleterBaseData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals__ = __webpack_require__("../../../../ng2-completer/globals.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CompleterBaseData = (function (_super) {
    __extends(CompleterBaseData, _super);
    function CompleterBaseData() {
        return _super.call(this) || this;
    }
    CompleterBaseData.prototype.cancel = function () { };
    CompleterBaseData.prototype.searchFields = function (searchFields) {
        this._searchFields = searchFields;
        return this;
    };
    CompleterBaseData.prototype.titleField = function (titleField) {
        this._titleField = titleField;
        return this;
    };
    CompleterBaseData.prototype.descriptionField = function (descriptionField) {
        this._descriptionField = descriptionField;
        return this;
    };
    CompleterBaseData.prototype.imageField = function (imageField) {
        this._imageField = imageField;
        return this;
    };
    CompleterBaseData.prototype.convertToItem = function (data) {
        var image = null;
        var formattedText;
        var formattedDesc = null;
        if (this._titleField) {
            formattedText = this.extractTitle(data);
        }
        else {
            formattedText = data;
        }
        if (typeof formattedText !== "string") {
            formattedText = JSON.stringify(formattedText);
        }
        if (this._descriptionField) {
            formattedDesc = this.extractValue(data, this._descriptionField);
        }
        if (this._imageField) {
            image = this.extractValue(data, this._imageField);
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_1__globals__["g" /* isNil */])(formattedText)) {
            return null;
        }
        return {
            title: formattedText,
            description: formattedDesc,
            image: image,
            originalObject: data
        };
    };
    CompleterBaseData.prototype.extractMatches = function (data, term) {
        var _this = this;
        var matches = [];
        var searchFields = this._searchFields ? this._searchFields.split(",") : null;
        if (this._searchFields !== null && this._searchFields !== undefined && term != "") {
            matches = data.filter(function (item) {
                var values = searchFields ? searchFields.map(function (searchField) { return _this.extractValue(item, searchField); }).filter(function (value) { return !!value; }) : [item];
                return values.some(function (value) { return value.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0; });
            });
        }
        else {
            matches = data;
        }
        return matches;
    };
    CompleterBaseData.prototype.extractTitle = function (item) {
        var _this = this;
        // split title fields and run extractValue for each and join with ' '
        return this._titleField.split(",")
            .map(function (field) {
            return _this.extractValue(item, field);
        })
            .reduce(function (acc, titlePart) { return acc ? acc + " " + titlePart : titlePart; });
    };
    CompleterBaseData.prototype.extractValue = function (obj, key) {
        var keys;
        var result;
        if (key) {
            keys = key.split(".");
            result = obj;
            for (var i = 0; i < keys.length; i++) {
                if (result) {
                    result = result[keys[i]];
                }
            }
        }
        else {
            result = obj;
        }
        return result;
    };
    CompleterBaseData.prototype.processResults = function (matches) {
        var i;
        var results = [];
        if (matches && matches.length > 0) {
            for (i = 0; i < matches.length; i++) {
                var item = this.convertToItem(matches[i]);
                if (item) {
                    results.push(item);
                }
            }
        }
        return results;
    };
    return CompleterBaseData;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]));

//# sourceMappingURL=completer-base-data.js.map

/***/ }),

/***/ "../../../../ng2-completer/services/completer-data-factory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export localDataFactory */
/* unused harmony export remoteDataFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalDataFactoryProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RemoteDataFactoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_data__ = __webpack_require__("../../../../ng2-completer/services/local-data.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__remote_data__ = __webpack_require__("../../../../ng2-completer/services/remote-data.js");



function localDataFactory() {
    return function () {
        return new __WEBPACK_IMPORTED_MODULE_1__local_data__["a" /* LocalData */]();
    };
}
function remoteDataFactory(http) {
    return function () {
        return new __WEBPACK_IMPORTED_MODULE_2__remote_data__["a" /* RemoteData */](http);
    };
}
var LocalDataFactoryProvider = { provide: __WEBPACK_IMPORTED_MODULE_1__local_data__["a" /* LocalData */], useFactory: localDataFactory };
var RemoteDataFactoryProvider = { provide: __WEBPACK_IMPORTED_MODULE_2__remote_data__["a" /* RemoteData */], useFactory: remoteDataFactory, deps: [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]] };
//# sourceMappingURL=completer-data-factory.js.map

/***/ }),

/***/ "../../../../ng2-completer/services/completer-service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__local_data__ = __webpack_require__("../../../../ng2-completer/services/local-data.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__remote_data__ = __webpack_require__("../../../../ng2-completer/services/remote-data.js");



var CompleterService = (function () {
    function CompleterService(localDataFactory, // Using any instead of () => LocalData because on AoT errors
        remoteDataFactory // Using any instead of () => LocalData because on AoT errors
    ) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory; // Using any instead of () => LocalData because on AoT errors
    }
    CompleterService.prototype.local = function (data, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var localData = this.localDataFactory();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.prototype.remote = function (url, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var remoteData = this.remoteDataFactory();
        return remoteData
            .remoteUrl(url)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
    ];
    /** @nocollapse */
    CompleterService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_1__local_data__["a" /* LocalData */],] },] },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_2__remote_data__["a" /* RemoteData */],] },] },
    ]; };
    return CompleterService;
}());

//# sourceMappingURL=completer-service.js.map

/***/ }),

/***/ "../../../../ng2-completer/services/local-data.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__completer_base_data__ = __webpack_require__("../../../../ng2-completer/services/completer-base-data.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var LocalData = (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        var _this = _super.call(this) || this;
        _this.dataSourceChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        return _this;
    }
    LocalData.prototype.data = function (data) {
        var _this = this;
        if (data instanceof __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]) {
            var data$ = data;
            data$
                .catch(function () { return []; })
                .subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
                _this.dataSourceChange.emit();
            });
        }
        else {
            this._data = data;
        }
        this.dataSourceChange.emit();
        return this;
    };
    LocalData.prototype.search = function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    };
    LocalData.prototype.convertToItem = function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    LocalData.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
    ];
    /** @nocollapse */
    LocalData.ctorParameters = function () { return []; };
    return LocalData;
}(__WEBPACK_IMPORTED_MODULE_3__completer_base_data__["a" /* CompleterBaseData */]));

//# sourceMappingURL=local-data.js.map

/***/ }),

/***/ "../../../../ng2-completer/services/remote-data.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoteData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__completer_base_data__ = __webpack_require__("../../../../ng2-completer/services/completer-base-data.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var RemoteData = (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.dataSourceChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        _this._urlFormater = null;
        _this._dataField = null;
        return _this;
    }
    RemoteData.prototype.remoteUrl = function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        this.dataSourceChange.emit();
        return this;
    };
    RemoteData.prototype.urlFormater = function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    RemoteData.prototype.dataField = function (dataField) {
        this._dataField = dataField;
    };
    /**
     * @deprecated Please use the requestOptions to pass headers with the search request
     */
    RemoteData.prototype.headers = function (headers) {
        this._headers = headers;
    };
    RemoteData.prototype.requestOptions = function (requestOptions) {
        this._requestOptions = requestOptions;
    };
    RemoteData.prototype.search = function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        /*
         * If requestOptions are provided, they will override anything set in headers.
         *
         * If no requestOptions are provided, a new RequestOptions object will be instantiated,
         * and either the provided headers or a new Headers() object will be sent.
         */
        if (!this._requestOptions) {
            this._requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
            this._requestOptions.headers = this._headers || new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        }
        this.remoteSearch = this.http.get(url, this._requestOptions.merge())
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var matches = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matches, term);
        })
            .catch(function () { return []; })
            .subscribe(function (matches) {
            var results = _this.processResults(matches);
            _this.next(results);
        });
    };
    RemoteData.prototype.cancel = function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    RemoteData.prototype.convertToItem = function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return RemoteData;
}(__WEBPACK_IMPORTED_MODULE_4__completer_base_data__["a" /* CompleterBaseData */]));

//# sourceMappingURL=remote-data.js.map

/***/ })

});
//# sourceMappingURL=order.module.chunk.js.map