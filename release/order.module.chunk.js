webpackJsonp(["order.module"],{

/***/ "../../../../../src/app/hirundo/waiter/order/cart/cart.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"page-content-header\">\n    <div class=\"back-btn\">\n        <a *ngIf=\"!tableData.orderId.length || this.orderService.getOrderData().cartTotalItem\" routerLink=\"/waiter/order/:id/choose-item\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n        <a *ngIf=\"tableData.orderId.length && !this.orderService.getOrderData().cartTotalItem\" (click)=\"hideStep()\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n    </div>\n    <div *ngIf=\"!tableData.orderId.length\" class=\"header-title\">\n        Create Order\n    </div>\n    <div *ngIf=\"tableData.orderId.length\" class=\"header-title\">\n        Table {{tableData.name}}\n    </div>\n</header>\n<div class=\"page-content\">\n    <app-steps *ngIf=\"orderService.showElement\"></app-steps>\n    <div class=\"item-container cart-page-height\">\n        <div class=\"text-center\" *ngIf=\"!tableData.orderId.length && !(orderService.getOrderData().selectedItems)\">No Item Added</div>\n        <div *ngIf=\"tableData.orderId.length && !orderService.showElement\">\n            <div *ngFor=\"let order of tableData.orderId\">\n                <div *ngFor=\"let article of order.item\">\n                    <div class=\"item-list align-items-center\">\n                        <div class=\"item-list align-items-center\">\n                            <div class=\"item\" [ngStyle]=\"{'background-color': article.id.category.color}\">\n                                <img *ngIf=\"!article.id.logo.small && article.id.category.isIcon\" class=\"icon-img\" [src]=\"article.id.category.icon\" alt=\"\"\n                                />\n                                <img *ngIf=\"!article.id.logo.small && !article.id.category.isIcon && article.id.category.logo.small\" [src]=\"article.id.category.logo.small\"\n                                    alt=\"Category Logo\" />\n                                <img *ngIf=\"article.id.logo.small\" [src]=\"article.id.logo.small\" alt=\"Item Logo\" />\n                                <span class=\"item-quantity\" *ngIf=\"article.quantity>0\">{{article.quantity}}</span>\n                            </div>\n                            <div class=\"item-name\">\n                                <p class=\"name m-0\">{{article.id.name}}</p>\n                                <p class=\"name m-0\">&euro;{{article.price}}</p>\n                                <span *ngIf=\"article.variant && article.variant.length\">\n                                    <span *ngFor=\"let variant of article.variant\" class=\"d-flex added-variand-name\">\n                                        <span *ngIf=\"variant.status == 0\">- {{variant.name}} </span>\n                                        <span *ngIf=\"variant.status == 1\">+ {{variant.name}} &euro;{{variant.price}}</span>\n                                    </span>\n                                </span>\n                                <span *ngIf=\"article.notes\" class=\"d-flex added-variand-name\">{{article.notes}}</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"orderService.getOrderData().selectedItems && orderService.showElement\">\n            <div *ngFor=\"let article of orderService.getOrderData().selectedItems[globalService.getTabData().step]\">\n                <div class=\"item-list align-items-center\" *ngIf=\"article.step == globalService.getTabData().step\">\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\n                            alt=\"Category Logo\" />\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\n                        <span class=\"item-quantity\" *ngIf=\"article.quantity>0\">{{article.quantity}}</span>\n                    </div>\n                    <div class=\"item-name\">\n                        <p class=\"name m-0\">{{article.name}}</p>\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\n                        <span *ngIf=\"article.variant && article.variant.length\">\n                            <span *ngFor=\"let variant of article.variant\" class=\"d-flex added-variand-name\">\n                                <span *ngIf=\"variant.status == 0\">- {{variant.name}} </span>\n                                <span *ngIf=\"variant.status == 1\">+ {{variant.name}} &euro;{{variant.price}}</span>\n                            </span>\n                        </span>\n                        <span *ngIf=\"article.ordernote\" class=\"d-flex added-variand-name\">{{article.ordernote}}</span>\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient(article)\">\n                        <i class=\"fas fa-edit\"></i>\n                    </button>\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"deleteItemFromCart(article)\">\n                        <i class=\"fas fa-times\"></i>\n                    </button>\n                </div>\n            </div>\n        </div>\n        <div class=\"cart-bottom-fixed\">\n            <div class=\"total-amount\" *ngIf=\"orderService.showElement && orderService.getOrderData().selectedItems\">\n                Sub Total: &euro;{{orderService.getOrderData().cartTotalPrice}}\n            </div>\n            <div class=\"total-amount\" *ngIf=\"tableData.orderId.length && !orderService.showElement\">\n                Total: &euro;{{orderItemsTotalPrice}}\n            </div>\n            <div class=\"cart-menu-btn\">\n                <button type=\"button\" *ngIf=\"tableData.orderId.length\" class=\"btn btn-default\" (click)=\"gotToCategoryList()\">\n                    Menu\n                </button>\n            </div>\n            <button type=\"submit\" *ngIf=\"!tableData.orderId.length\" class=\"order-btn waves-light\" [disabled]=\"!orderService.getOrderData().selectedItems || loader\"\n                (click)=\"createOrder()\">\n                <span>Create Order</span>\n            </button>\n            <button  type=\"submit\" *ngIf=\"tableData.orderId.length && orderService.showElement && orderService.getOrderData().selectedItems\" class=\"order-btn waves-light\" (click)=\"createOrder()\">\n                <span>Update Order</span>\n            </button>\n        </div>\n    </div>\n</div>\n<div class=\"varient-container\" [class.show-varient]=\"showVarient\">\n    <div class=\"modal-header\">\n        <div class=\"back-btn\">\n            <a (click)=\"hideVarient()\">\n                <i class=\"fas fa-times\"></i>\n            </a>\n        </div>\n        <div class=\"header-title\">\n            Edit Item\n            <button (click)=\"saveVariantData()\">Save</button>\n        </div>\n    </div>\n    <div class=\"varient-content\">\n        <div class=\"input-quantity-container\">\n            <h1>Quantity</h1>\n            <div class=\"input-prepend-append d-flex\">\n                <button type=\"button\" id=\"decrease\" value=\"Decrease Value\" (click)=\"decreaseQty()\">\n                    <i class=\"fas fa-minus\"></i>\n                </button>\n                <div class=\"text-center input-value\">{{variantData.quantity}}</div>\n                <button type=\"button\" id=\"increase\" value=\"Increase Value\" (click)=\"increaseQty()\">\n                    <i class=\"fas fa-plus\"></i>\n                </button>\n            </div>\n            <div *ngIf=\"variantError\" class=\"color-red\">{{variantError}}</div>\n        </div>\n        <div [class.pointer-none]=\"nonVariantData\">\n            <h1>Variant and Notes</h1>\n            <div class=\"tabs-btn\">\n                <button type=\"button\" (click)=\"tabActive(1)\" [class.active]=\"activeTab[0]\">Variants</button>\n                <button type=\"button\" (click)=\"tabActive(2)\" [class.active]=\"activeTab[1]\">Notes</button>\n            </div>\n            <div *ngIf=\"activeTab[0]\" class=\"varient-list\">\n                <table class=\"table\">\n                    <tbody>\n                        <tr *ngFor=\"let varient of variantList\">\n                            <td *ngIf=\"!varient.category.length || (varient.category.length && varient.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                                <table class=\"table\">\n                                    <tbody>\n                                        <tr>\n                                            <td style=\"width:75%;\">{{varient.name}}</td>\n                                            <td>&euro;{{varient.price}}</td>\n                                            <td>\n                                                <button type=\"button\" class=\"add-varient-btn\" [class.variant-remove]=\"varient.status == 0\" id=\"decrease\" value=\"Decrease Value\"\n                                                    (click)=\"addRemoveVariant(varient,0)\">\n                                                    <i class=\"fas fa-minus\"></i>\n                                                </button>\n                                                <button type=\"button\" class=\"add-varient-btn\" [class.variant-added]=\"varient.status == 1\" id=\"increase\" value=\"Increase Value\"\n                                                    (click)=\"addRemoveVariant(varient,1)\">\n                                                    <i class=\"fas fa-plus\"></i>\n                                                </button>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div *ngIf=\"activeTab[1]\" class=\"varient-list\">\n                <table class=\"table\">\n                    <tbody>\n                        <tr *ngFor=\"let note of noteList; let i = index\">\n                            <td *ngIf=\"!note.category.length || (note.category.length && note.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                                <table class=\"table\">\n                                    <tbody>\n                                        <tr>\n                                            <td>{{note.notes}}</td>\n                                            <td>\n                                                <input type=\"checkbox\" (change)=\"addNote($event, note.notes, i)\" [checked]=\"notes.indexOf(note.notes)>-1\" />\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/cart/cart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cart-page-height {\n  height: calc(100vh - 220px);\n  overflow-y: auto; }\n", ""]);

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
        this.variantList = [];
        this.noteList = [];
        this.showVarient = false;
        this.loader = false;
        this.activeTab = [true, false];
        this.variantData = {
            quantity: 1,
            variant: [],
            notes: ''
        };
        this.notes = [];
        this.variantError = '';
        this.showElement = 0;
        this.nonVariantData = false;
        this.orderItemsTotalPrice = 0;
        this.orderItemsTotalItem = 0;
    }
    CartComponent.prototype.ngOnInit = function () {
        window.history.pushState({}, 'Waiter', '/waiter');
        this.tableData = JSON.parse(localStorage.getItem('tabledata'));
        if (this.tableData.orderId.length) {
            var cp = 0;
            var itemno = 0;
            var varicost = 0;
            this.orderItemsTotalPrice = 0;
            this.orderItemsTotalItem = 0;
            for (var k = 0; k < this.tableData.orderId.length; k++) {
                for (var i = 0; i < this.tableData.orderId[k].item.length; i++) {
                    varicost = 0;
                    itemno += this.tableData.orderId[k].item[i].quantity;
                    if (this.tableData.orderId[k].item[i].variant) {
                        for (var j = 0; j < this.tableData.orderId[k].item[i].variant.length; j++) {
                            if (this.tableData.orderId[k].item[i].variant[j].status == 1) {
                                varicost += this.tableData.orderId[k].item[i].variant[j].price;
                            }
                        }
                    }
                    cp += (this.tableData.orderId[k].item[i].price + varicost) * this.tableData.orderId[k].item[i].quantity;
                    this.orderItemsTotalPrice = cp + (this.tableData.orderId[this.tableData.orderId.length - 1].seatCost * this.tableData.orderId[0].noOfPeople);
                    this.orderItemsTotalItem = itemno;
                }
            }
        }
    };
    CartComponent.prototype.createOrder = function () {
        var _this = this;
        var data = this.orderService.getOrderData();
        var itemarray = [];
        var steps = [];
        if (this.globalService.getStepData()) {
            steps = this.globalService.getStepData();
        }
        else {
            steps = ['Uscita 1', 'Uscita 2'];
        }
        for (var a = 0; a < steps.length; a++) {
            for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                var vararray = [];
                if (data.selectedItems[steps[a]][i].variant) {
                    for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                        var catarray = [];
                        for (var k = 0; k < data.selectedItems[steps[a]][i].variant[j].category.length; k++) {
                            catarray.push(data.selectedItems[steps[a]][i].variant[j].category[k]._id);
                        }
                        var vari = {
                            name: data.selectedItems[steps[a]][i].variant[j].name,
                            category: catarray,
                            price: data.selectedItems[steps[a]][i].variant[j].price,
                            status: data.selectedItems[steps[a]][i].variant[j].status,
                            id: data.selectedItems[steps[a]][i].variant[j]._id
                        };
                        vararray.push(vari);
                    }
                }
                var item = {
                    id: data.selectedItems[steps[a]][i]._id,
                    category: data.selectedItems[steps[a]][i].category._id,
                    quantity: data.selectedItems[steps[a]][i].quantity,
                    price: data.selectedItems[steps[a]][i].price,
                    notes: data.selectedItems[steps[a]][i].ordernote ? data.selectedItems[steps[a]][i].ordernote : '',
                    variant: vararray,
                    step: data.selectedItems[steps[a]][i].step,
                    department: data.selectedItems[steps[a]][i].category.department,
                    preparationTime: data.selectedItems[steps[a]][i].preparationTime
                };
                itemarray.push(item);
            }
        }
        var createorder = {
            room: data.roomId,
            table: data.tableId,
            noOfPeople: data.noOfPeople,
            item: itemarray
        };
        this.loader = true;
        this.orderService.createOrder(createorder)
            .then(function (data) {
            _this.loader = false;
            var stepdata = {
                tab: 0,
                step: "Uscita 1"
            };
            _this.globalService.setTabData(stepdata);
            _this.router.navigate(['/waiter/list']);
            _this.orderService.showElement = false;
        })
            .catch(function (error) {
        });
    };
    CartComponent.prototype.deleteItemFromCart = function (article) {
        var data = this.orderService.getOrderData();
        var currentStep = this.globalService.getTabData().step;
        for (var i = 0; i < data.selectedItems[currentStep].length; i++) {
            if (data.selectedItems[currentStep][i]._id == article._id && !article.variant) {
                //non variant type data
                for (var m = 0; m < data.categoryItems[currentStep].length; m++) {
                    if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
                        data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
                    }
                }
                if (!data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
                    data.selectedItems[currentStep].splice(i, 1);
                }
            }
            else if (data.selectedItems[currentStep][i]._id == article._id && article.variant) {
                //variant type data
                for (var m = 0; m < data.categoryItems[currentStep].length; m++) {
                    if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
                        data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
                    }
                }
                if (data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
                    data.selectedItems[currentStep].splice(i, 1);
                }
            }
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
            steps = this.globalService.getStepData();
        }
        else {
            steps = ['Uscita 1', 'Uscita 2'];
        }
        var emptyArray = [];
        for (var a = 0; a < steps.length; a++) {
            if (data.selectedItems[steps[a]].length) {
                for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                    itemno += data.selectedItems[steps[a]][i].quantity;
                    if (data.selectedItems[steps[a]][i].variant) {
                        for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                            if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                varicost += data.selectedItems[steps[a]][i].variant[j].price;
                            }
                        }
                    }
                    cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                    data.cartTotalPrice = cp;
                    data.cartTotalItem = itemno;
                }
            }
            if (data.selectedItems[steps[a]].length == 0) {
                if (emptyArray.indexOf(steps[a]) < 0) {
                    emptyArray.push(steps[a]);
                }
            }
            if (emptyArray.length == steps.length) {
                data.cartTotalPrice = 0;
                data.cartTotalItem = 0;
            }
        }
        this.orderService.setOrderData(data);
    };
    CartComponent.prototype.gotToCategoryList = function () {
        this.router.navigate(['/waiter/order/:id/choose-category']);
        this.orderService.showElement = true;
    };
    CartComponent.prototype.viewVarient = function (article) {
        var _this = this;
        this.nonVariantData = false;
        this.orderService.getVariantAndNotes()
            .then(function (data) {
            _this.variantList = data.data.variants;
            _this.noteList = data.data.notes;
            _this.articleData = article;
            if (!article.variant) {
                _this.nonVariantData = true;
                _this.variantData.quantity = article.quantity;
            }
            else {
                _this.nonVariantData = false;
                _this.variantData.quantity = article.quantity;
                _this.variantData.variant = article.variant;
                _this.variantData.notes = article.ordernote ? article.ordernote : '';
                if (article.ordernote) {
                    var note = article.ordernote.split(',');
                    _this.notes = note;
                }
                for (var i = 0; i < _this.variantData.variant.length; i++) {
                    if (_this.variantList.length) {
                        for (var j = 0; j < _this.variantList.length; j++) {
                            if (_this.variantData.variant[i]._id == _this.variantList[j]._id) {
                                _this.variantList[j].status = _this.variantData.variant[i].status;
                            }
                        }
                    }
                }
            }
            if (_this.articleData) {
                _this.showVarient = true;
                _this.activeTab[0] = true;
                _this.activeTab[1] = false;
            }
        })
            .catch(function (error) {
        });
    };
    CartComponent.prototype.hideVarient = function () {
        this.showVarient = false;
        this.nonVariantData = false;
        this.variantData = {
            quantity: 0,
            variant: [],
            notes: ''
        };
        this.notes = [];
        this.articleData = {};
    };
    CartComponent.prototype.tabActive = function (tab) {
        if (tab == 1) {
            this.activeTab[0] = true;
            this.activeTab[1] = false;
        }
        else {
            this.activeTab[1] = true;
            this.activeTab[0] = false;
        }
    };
    CartComponent.prototype.decreaseQty = function () {
        var value = this.variantData.quantity;
        value = isNaN(value) ? 2 : value;
        value < 2 ? value = 2 : '';
        value--;
        this.variantData.quantity = value;
    };
    CartComponent.prototype.increaseQty = function () {
        var value = this.variantData.quantity;
        value = isNaN(value) ? 1 : value;
        value++;
        this.variantData.quantity = value;
    };
    CartComponent.prototype.addRemoveVariant = function (variant, status) {
        var varIds = [];
        if (this.variantData.variant.length) {
            for (var i = 0; i < this.variantData.variant.length; i++) {
                varIds.push(this.variantData.variant[i]._id);
                if (this.variantData.variant[i]._id == variant._id) {
                    if (this.variantData.variant[i].status == status) {
                        delete variant.status;
                        this.variantData.variant.splice(i, 1);
                    }
                    else {
                        variant.status = status;
                        this.variantData.variant[i].status = status;
                    }
                }
            }
            if (varIds.length == this.variantData.variant.length) {
                if (varIds.indexOf(variant._id) < 0) {
                    variant.status = status;
                    this.variantData.variant.push(variant);
                }
            }
        }
        else {
            variant.status = status;
            this.variantData.variant.push(variant);
        }
        // if (status == 0) {
        //   variant.status = 0;
        // }
        // else {
        //   variant.status = 1;
        // }
        // for (let i = 0; i < this.variantData.variant.length; i++) {
        //   if (this.variantData.variant[i]._id == variant._id) {
        //     this.variantData.variant.splice(i, 1);
        //   }
        // }
        // this.variantData.variant.push(variant);
    };
    CartComponent.prototype.addNote = function (event, note, i) {
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
    CartComponent.prototype.saveVariantData = function () {
        var _this = this;
        if (!this.articleData.variant) {
            if (this.variantData.quantity == 0) {
                this.variantError = 'Please enter quantity';
                setTimeout(function () {
                    _this.variantError = '';
                }, 4000);
            }
            else {
                this.articleData.quantity = this.variantData.quantity;
                var data = this.orderService.getOrderData();
                for (var i = 0; i < data.selectedItems[this.articleData.step].length; i++) {
                    if (data.selectedItems[this.articleData.step][i]._id == this.articleData._id && !data.selectedItems[this.articleData.step][i].variant) {
                        data.selectedItems[this.articleData.step][i].quantity = this.articleData.quantity;
                    }
                }
                for (var i = 0; i < data.categoryItems[this.articleData.step].length; i++) {
                    if (data.categoryItems[this.articleData.step][i]._id == this.articleData._id) {
                        data.categoryItems[this.articleData.step][i].itemTotal = data.categoryItems[this.articleData.step][i].itemTotal + this.articleData.quantity;
                    }
                }
                var cp = 0;
                var itemno = 0;
                var varicost = 0;
                var steps = [];
                if (this.globalService.getStepData()) {
                    steps = this.globalService.getStepData();
                }
                else {
                    steps = ['Uscita 1', 'Uscita 2'];
                }
                for (var a = 0; a < steps.length; a++) {
                    for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                        itemno += data.selectedItems[steps[a]][i].quantity;
                        if (data.selectedItems[steps[a]][i].variant) {
                            for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                                if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                    varicost += data.selectedItems[steps[a]][i].variant[j].price;
                                }
                            }
                        }
                        cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                        data.cartTotalPrice = cp;
                        data.cartTotalItem = itemno;
                    }
                }
                this.orderService.setOrderData(data);
                this.hideVarient();
            }
        }
        else {
            if (this.variantData.quantity == 0) {
                this.variantError = 'Please enter quantity';
                setTimeout(function () {
                    _this.variantError = '';
                }, 4000);
            }
            else if (this.variantData.quantity > 0 && this.variantData.variant.length == 0) {
                this.variantError = 'Please select variants/notes';
                setTimeout(function () {
                    _this.variantError = '';
                }, 4000);
            }
            else {
                this.articleData.quantity = this.variantData.quantity;
                this.articleData.variant = this.variantData.variant;
                if (this.variantData.notes != '') {
                    this.articleData.ordernote = this.variantData.notes;
                }
                else {
                    delete this.articleData.ordernote;
                }
                var data = this.orderService.getOrderData();
                for (var i = 0; i < data.selectedItems[this.articleData.step].length; i++) {
                    if (data.selectedItems[this.articleData.step][i]._id == this.articleData._id && data.selectedItems[this.articleData.step][i].variant && data.selectedItems[this.articleData.step][i].variantUniqueId == this.articleData.variantUniqueId) {
                        data.selectedItems[this.articleData.step][i].quantity = this.articleData.quantity;
                        data.selectedItems[this.articleData.step][i].variant = this.articleData.variant;
                        if (this.articleData.ordernote) {
                            data.selectedItems[this.articleData.step][i].ordernote = this.articleData.ordernote;
                        }
                        else {
                            delete data.selectedItems[this.articleData.step][i].ordernote;
                        }
                    }
                }
                for (var i = 0; i < data.categoryItems[this.articleData.step].length; i++) {
                    if (data.categoryItems[this.articleData.step][i]._id == this.articleData._id) {
                        data.categoryItems[this.articleData.step][i].itemTotal = data.categoryItems[this.articleData.step][i].itemTotal + this.articleData.quantity;
                    }
                }
                var cp = 0;
                var itemno = 0;
                var varicost = 0;
                var steps = [];
                if (this.globalService.getStepData()) {
                    steps = this.globalService.getStepData();
                }
                else {
                    steps = ['Uscita 1', 'Uscita 2'];
                }
                for (var a = 0; a < steps.length; a++) {
                    for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                        itemno += data.selectedItems[steps[a]][i].quantity;
                        if (data.selectedItems[steps[a]][i].variant) {
                            for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                                if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                    varicost += data.selectedItems[steps[a]][i].variant[j].price;
                                }
                            }
                        }
                        cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                        data.cartTotalPrice = cp;
                        data.cartTotalItem = itemno;
                    }
                }
                this.orderService.setOrderData(data);
                this.hideVarient();
            }
        }
    };
    CartComponent.prototype.hideStep = function () {
        this.orderService.showElement = false;
        this.router.navigate(['/waiter']);
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

module.exports = "<header class=\"page-content-header\">\n    <div class=\"back-btn\">\n        <a *ngIf=\"!orderId\" routerLink=\"/waiter/order/:id\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n        <a *ngIf=\"orderId\" (click)=\"hideStep()\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n    </div>\n    <div class=\"header-title\">\n        Choose Category\n    </div>\n</header>\n<div class=\"page-content\">\n    <app-steps></app-steps>\n    <div class=\"category-list\">\n        <div class=\"d-flex flex-wrap\">\n            <div class=\"search-category w-100\">\n                <div class=\"md-form search\">\n                    <i class=\"fas fa-search prefix\"></i>\n                    <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Category\" />\n                    <button type=\"button\" class=\"btn-cart\" (click)=\"viewCart()\">\n                        <i class=\"fas fa-shopping-cart\"></i> {{orderService.getOrderData().cartTotalItem}} | &euro;{{orderService.getOrderData().cartTotalPrice}}\n                    </button>\n                </div>\n            </div>\n            <div class=\"category c-p\" *ngFor=\"let category of categoryList | filter : searchText\" [ngStyle]=\"{'background-color': category.color}\"\n                (click)=\"showItems(category)\">\n                <img *ngIf=\"!category.isIcon\" [src]=\"category.logo.small\" alt=\"\" />\n                <img class=\"icon-img\" *ngIf=\"category.isIcon\" [src]=\"category.icon\" alt=\"\" />\n                <p class=\"name\">{{category.name}}</p>\n            </div>\n        </div>\n    </div>\n</div>\n"

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
        if (localStorage.getItem('orderId')) {
            this.orderId = JSON.parse(localStorage.getItem('orderId'));
        }
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
        });
    };
    ChooseCategoryComponent.prototype.showItems = function (category) {
        var _this = this;
        var orderdata = this.orderService.getOrderData();
        orderdata.selectedCategory = category;
        orderdata.categoryItems = {};
        this.orderService.getCategoryItem().then(function (data) {
            if (data.data.length) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].category._id == category._id) {
                        console.log(_this.globalService.getStepData());
                        var steps = [];
                        if (_this.globalService.getStepData()) {
                            steps = _this.globalService.getStepData();
                        }
                        else {
                            steps = ['Uscita 1', 'Uscita 2'];
                        }
                        for (var j = 0; j < steps.length; j++) {
                            orderdata.categoryItems[steps[j]] = data.data[i].items;
                            for (var k = 0; k < orderdata.categoryItems[steps[j]].length; k++) {
                                orderdata.categoryItems[steps[j]][k].quantity = 0;
                                orderdata.categoryItems[steps[j]][k].itemTotal = 0;
                            }
                        }
                    }
                }
            }
            _this.orderService.setOrderData(orderdata);
            _this.router.navigate(['/waiter/order/:id/choose-item']);
        })
            .catch(function (error) {
        });
    };
    ChooseCategoryComponent.prototype.viewCart = function () {
        this.router.navigate(['/waiter/order/:id/cart']);
    };
    ChooseCategoryComponent.prototype.hideStep = function () {
        this.orderService.showElement = false;
        this.router.navigate(['/waiter/order/:id/cart']);
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

module.exports = "<header class=\"page-content-header\">\n    <div class=\"back-btn\">\n        <a routerLink=\"/waiter\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n    </div>\n    <div class=\"header-title\">\n        Create an Order\n    </div>\n</header>\n<div class=\"page-content\">\n    <div class=\"stepper-form\">\n        <div>\n            <div class=\"d-flex justify-content-between label-container\">\n                <label class=\"label label-lg d-flex align-items-center\">\n                    <i class=\"fas fa-cube\"></i>\n                    <span class=\"label-primary\">{{roomData.name}}</span>\n                </label>\n                <label class=\"label label-lg d-flex align-items-center\">\n                    <img src=\"assets/images/table.png\" alt=\"\">\n                    <span class=\"label-yellow\">{{tableData.name}}</span>\n                </label>\n            </div>\n            <div class=\"md-form\">\n                <input class=\"form-control\" type=\"number\" min=\"0\" [(ngModel)]=\"noOfPeople\" placeholder=\"No. of Person\" />\n            </div>\n            <div class=\"alert-danger\" *ngIf=\"numberError\">{{numberErrorMsg}}</div>  \n            <div class=\"text-center\">\n                <button class=\"btn btn-success waves-light\" (click)=\"makeOrder()\" mdbRippleRadius>Make an Order</button>\n            </div>\n        </div>        \n    </div>\n</div>\n"

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
        localStorage.removeItem('tabData');
        localStorage.removeItem('stepData');
        if (this.orderService.getOrderData()) {
            this.noOfPeople = this.orderService.getOrderData().noOfPeople;
        }
        this.roomData = JSON.parse(localStorage.getItem('roomdata'));
        this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    };
    CreateOrderComponent.prototype.makeOrder = function () {
        var _this = this;
        if (this.noOfPeople) {
            var steps = [];
            var selectedItems = {};
            if (this.globalService.getStepData()) {
                steps = this.globalService.getStepData();
            }
            else {
                steps = ['Uscita 1', 'Uscita 2'];
            }
            for (var j = 0; j < steps.length; j++) {
                selectedItems[steps[j]] = [];
            }
            var data = {
                roomId: this.roomData["_id"],
                tableId: this.tableData["_id"],
                noOfPeople: this.noOfPeople,
                selectedItems: selectedItems,
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

module.exports = "<header class=\"page-content-header\" [ngStyle]=\"{'background-color' : orderService.getOrderData().selectedCategory.color}\">\n    <div class=\"back-btn\">\n        <a routerLink=\"/waiter/order/:id/choose-category\">\n            <i class=\"fas fa-angle-left\"></i>\n        </a>\n    </div>\n    <div class=\"header-title\" *ngIf=\"orderService.getOrderData().selectedCategory\">\n        {{orderService.getOrderData().selectedCategory.name}}\n        <span class=\"add-article-btn\" (click)=\"addArticle()\">\n            <img src=\"assets/images/icon_file.png\" alt=\"\" />\n        </span>\n    </div>\n</header>\n<div class=\"page-content\">\n    <div class=\"tabs-container subcategory-tabs\">\n        <ul [ngStyle]=\"{'background-color' : orderService.getOrderData().selectedCategory.color}\">\n            <li [class.subcategory-active]=\"selectedSubcategory[-1]\" (click)=\"filterBySubcategory()\">All</li>\n            <span *ngIf=\"data.selectedCategory.subCategory.length\">\n                <li *ngFor=\"let subCategory of data.selectedCategory.subCategory; let j = index\" [class.subcategory-active]=\"selectedSubcategory[j]\"\n                    (click)=\"filterBySubcategory(subCategory,j)\">\n                    {{subCategory}}\n                </li>\n            </span>\n        </ul>\n    </div>\n    <app-steps></app-steps>\n    <div class=\"item-container item-list-height\">\n        <div class=\"search-category w-100\">\n            <div class=\"md-form search\">\n                <i class=\"fas fa-search prefix\"></i>\n                <input class=\"form-control\" [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search Item\" />\n                <button type=\"button\" class=\"btn-cart\" (click)=\"viewCart()\">\n                    <i class=\"fas fa-shopping-cart\"></i> {{orderService.getOrderData().cartTotalItem}} | &euro;{{orderService.getOrderData().cartTotalPrice}}\n                </button>\n            </div>\n        </div>\n        <div class=\"alert-danger\" *ngIf=\"error\">{{errorMsg}}</div>\n        <!-- <div *ngIf=\"!articles.length\" class=\"text-center\">\n            No Item Found\n        </div> -->\n        <div *ngIf=\"orderService.getOrderData().categoryItems[globalService.getTabData().step].length == 0\" class=\"text-center\">\n            No Item Found\n        </div>\n        <div *ngIf=\"orderService.getOrderData().categoryItems[globalService.getTabData().step].length > 0\">\n            <!-- <div *ngFor=\"let article of articles | filter : searchText ; let i = index\"> -->\n            <div *ngFor=\"let article of orderService.getOrderData().categoryItems[globalService.getTabData().step] | filter : searchText ; let i = index\">\n                <div class=\"item-list align-items-center\" *ngIf=\"subcategory && (article.subCategory == subcategory)\">\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\n                            alt=\"Category Logo\" />\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\n                        <span class=\"item-quantity\" *ngIf=\"article.itemTotal>0\">{{article.itemTotal}}</span>\n                    </div>\n                    <div class=\"item-name\">\n                        <p class=\"name m-0\">{{article.name}}</p>\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\n                    </div>\n                    <div class=\"input-prepend-append\">\n                        <button type=\"button\" class=\"btn btn-prepend btn-danger\" id=\"decrease\" (click)=\"decreaseValue(article)\" value=\"Decrease Value\">\n                            <i class=\"fas fa-minus\"></i>\n                        </button>\n                        <button type=\"button\" class=\"btn btn-append btn-success\" id=\"increase\" (click)=\"increaseValue(article)\" value=\"Increase Value\">\n                            <i class=\"fas fa-plus\"></i>\n                        </button>\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient(article)\">\n                        <img src=\"assets/images/icon_edit.png\" alt=\"\" />\n                    </button>\n                </div>\n                <div class=\"item-list align-items-center\" *ngIf=\"!subcategory\">\n                    <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\n                        <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\n                        <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\n                            alt=\"Category Logo\" />\n                        <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\n                        <span class=\"item-quantity\" *ngIf=\"article.itemTotal>0\">{{article.itemTotal}}</span>\n                    </div>\n                    <div class=\"item-name\">\n                        <p class=\"name m-0\">{{article.name}}</p>\n                        <p class=\"name m-0\">&euro;{{article.price}}</p>\n                    </div>\n                    <div class=\"input-prepend-append\">\n                        <button type=\"button\" class=\"btn btn-prepend btn-danger\" id=\"decrease\" (click)=\"decreaseValue(article)\" value=\"Decrease Value\">\n                            <i class=\"fas fa-minus\"></i>\n                        </button>\n                        <button type=\"button\" class=\"btn btn-append btn-success\" id=\"increase\" (click)=\"increaseValue(article)\" value=\"Increase Value\">\n                            <i class=\"fas fa-plus\"></i>\n                        </button>\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient(article)\">\n                        <img src=\"assets/images/icon_edit.png\" alt=\"\" />\n                    </button>\n                </div>\n            </div>\n            <div *ngIf=\"orderService.getOrderData().selectedItems\">\n                <div *ngFor=\"let article of orderService.getOrderData().selectedItems[globalService.getTabData().step]\">\n                    <div class=\"item-list align-items-center {{article.step}} {{globalService.getTabData().step}}\" *ngIf=\"article.step == globalService.getTabData().step && article.isDeleted\">\n                        <div class=\"item\" [ngStyle]=\"{'background-color': article.category.color}\">\n                            <img *ngIf=\"!article.logo.small && article.category.isIcon\" class=\"icon-img\" [src]=\"article.category.icon\" alt=\"\" />\n                            <img *ngIf=\"!article.logo.small && !article.category.isIcon && article.category.logo.small\" [src]=\"article.category.logo.small\"\n                                alt=\"Category Logo\" />\n                            <img *ngIf=\"article.logo.small\" [src]=\"article.logo.small\" alt=\"Item Logo\" />\n                            <span class=\"item-quantity\" *ngIf=\"article.quantity>0\">{{article.quantity}}</span>\n                        </div>\n                        <div class=\"item-name\">\n                            <p class=\"name m-0\">{{article.name}}</p>\n                            <p class=\"name m-0\">&euro;{{article.price}}</p>\n                            <span *ngIf=\"article.variant && article.variant.length\">\n                                <span *ngFor=\"let variant of article.variant\" class=\"d-flex added-variand-name\">\n                                    <span *ngIf=\"variant.status == 0\">- {{variant.name}} </span>\n                                    <span *ngIf=\"variant.status == 1\">+ {{variant.name}} &euro;{{variant.price}}</span>\n                                </span>\n                            </span>\n                            <span *ngIf=\"article.ordernote\" class=\"d-flex added-variand-name\">{{article.ordernote}}</span>\n                        </div>\n                        <!-- <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"viewVarient(article)\">\n                            <i class=\"fas fa-edit\"></i>\n                        </button> -->\n                        <button type=\"submit\" class=\"btn btn-floating waves-light\" (click)=\"deleteItemFromCart(article)\">\n                            <i class=\"fas fa-times\"></i>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"varient-container\" [class.show-varient]=\"showVarient\">\n    <div class=\"modal-header\">\n        <div class=\"back-btn\">\n            <a (click)=\"hideVarient()\">\n                <i class=\"fas fa-times\"></i>\n            </a>\n        </div>\n        <div class=\"header-title\" *ngIf=\"orderService.getOrderData().selectedCategory\">\n            Choose Varient\n            <button (click)=\"saveVariantData()\">Save</button>\n        </div>\n    </div>\n    <app-steps></app-steps>\n    <div class=\"varient-content\">\n        <div class=\"input-quantity-container\">\n            <h1>Quantity</h1>\n            <div class=\"input-prepend-append d-flex\">\n                <button type=\"button\" id=\"decrease\" value=\"Decrease Value\" (click)=\"decreaseQty()\">\n                    <i class=\"fas fa-minus\"></i>\n                </button>\n                <div class=\"text-center input-value\">{{variantData.quantity}}</div>\n                <button type=\"button\" id=\"increase\" value=\"Increase Value\" (click)=\"increaseQty()\">\n                    <i class=\"fas fa-plus\"></i>\n                </button>\n            </div>\n            <div *ngIf=\"variantError\" class=\"color-red\">{{variantError}}</div>\n        </div>\n        <h1>Varient and Notes</h1>\n        <div class=\"tabs-btn\">\n            <button type=\"button\" (click)=\"tabActive(1)\" [class.active]=\"activeTab[0]\">Varients</button>\n            <button type=\"button\" (click)=\"tabActive(2)\" [class.active]=\"activeTab[1]\">Notes</button>\n        </div>\n        <div class=\"varient-list\" *ngIf=\"activeTab[0]\">\n            <table class=\"table\">\n                <tbody>\n                    <tr *ngFor=\"let varient of variantList\">\n                        <td *ngIf=\"!varient.category.length || (varient.category.length && varient.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                            <table class=\"table\">\n                                <tbody>\n                                    <tr>\n                                        <td style=\"width:75%;\">{{varient.name}}</td>\n                                        <td>&euro;{{varient.price}}</td>\n                                        <td>\n                                            <button type=\"button\" class=\"add-varient-btn\" [class.variant-remove]=\"varient.status == 0\" id=\"decrease\" value=\"Decrease Value\"\n                                                (click)=\"addRemoveVariant(varient,0)\">\n                                                <i class=\"fas fa-minus\"></i>\n                                            </button>\n                                            <button type=\"button\" class=\"add-varient-btn\" [class.variant-added]=\"varient.status == 1\" id=\"increase\" value=\"Increase Value\"\n                                                (click)=\"addRemoveVariant(varient,1)\">\n                                                <i class=\"fas fa-plus\"></i>\n                                            </button>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"varient-list\" *ngIf=\"activeTab[1]\">\n            <table class=\"table\">\n                <tbody>\n                    <tr *ngFor=\"let note of noteList; let i = index\">\n                        <td *ngIf=\"!note.category.length || (note.category.length && note.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                            <table class=\"table\">\n                                <tbody>\n                                    <tr>\n                                        <td>{{note.notes}}</td>\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"addNote($event, note.notes, i)\" />\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n<div class=\"add-article\" [class.showarticle]=\"articleAdd\">\n    <div class=\"modal-header\">\n        <div class=\"back-btn\">\n            <a (click)=\"hideArticle()\">\n                <i class=\"fas fa-times\"></i>\n            </a>\n        </div>\n        <div class=\"header-title\" *ngIf=\"orderService.getOrderData().selectedCategory\">\n            New Article\n            <button type=\"button\" (click)=\"saveAddArticleData()\">Add</button>\n        </div>\n    </div>\n    <app-steps></app-steps>\n    <div class=\"modal-body varient-content\">\n        <div *ngIf=\"addArticleError\" class=\"color-red\">{{addArticleError}}</div>\n        <div class=\"md-form\">\n            <label for=\"name\">Name</label>\n            <input type=\"text\" id=\"name\" [(ngModel)]=\"AddDataArticle.name\" class=\"form-control\">\n        </div>\n        <div class=\"md-group\">\n            <label for=\"vattax\">Vat Tax</label>\n            <select id=\"vattax\" [(ngModel)]=\"AddDataArticle.vat\">\n                <option *ngFor=\"let vat of vats\" ngValue=\"{{vat._id}}\">{{vat.name}}</option>\n            </select>\n        </div>\n        <div class=\"input-quantity-container md-form\">\n            <h1>Quantity</h1>\n            <div class=\"input-prepend-append  d-flex\">\n                <button type=\"button\" id=\"decrease\" value=\"Decrease Value\" (click)=\"decreaseArticleQty()\">\n                    <i class=\"fas fa-minus\"></i>\n                </button>\n                <div class=\"text-center input-value\">{{AddDataArticle.quantity}}</div>\n                <button type=\"button\" id=\"increase\" value=\"Increase Value\" (click)=\"increaseArticleQty()\">\n                    <i class=\"fas fa-plus\"></i>\n                </button>\n            </div>\n        </div>\n        <div class=\"md-form\">\n            <i class=\"fas fa-euro-sign prefix euro-symbol\"></i>\n            <label for=\"price\">Price</label>\n            <input type=\"number\" id=\"price\" step=\"0.01\" min=\"0\" (change)=\"inputChanged()\" [(ngModel)]=\"AddDataArticle.price\" class=\"form-control\">\n        </div>\n        <h1>Varient and Notes</h1>\n        <div class=\"tabs-btn\">\n            <button type=\"button\" (click)=\"tabActive(1)\" [class.active]=\"activeTab[0]\">Varients</button>\n            <button type=\"button\" (click)=\"tabActive(2)\" [class.active]=\"activeTab[1]\">Notes</button>\n            </div>\n            <div class=\"varient-list\" *ngIf=\"activeTab[0]\">\n                <table class=\"table\">\n                    <tbody>\n                        <tr *ngFor=\"let varient of variantList\">\n                            <td *ngIf=\"!varient.category.length || (varient.category.length && varient.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                                <table class=\"table\">\n                                    <tbody>\n                                        <tr>\n                                            <td style=\"width:75%;\">{{varient.name}}</td>\n                                            <td>&euro;{{varient.price}}</td>\n                                            <td>\n                                                <button type=\"button\" class=\"add-varient-btn\" [class.variant-remove]=\"varient.status == 0\" id=\"decrease\" value=\"Decrease Value\"\n                                                    (click)=\"addRemoveArticleVariant(varient,0)\">\n                                                    <i class=\"fas fa-minus\"></i>\n                                                </button>\n                                                <button type=\"button\" class=\"add-varient-btn\" [class.variant-added]=\"varient.status == 1\" id=\"increase\" value=\"Increase Value\"\n                                                    (click)=\"addRemoveArticleVariant(varient,1)\">\n                                                    <i class=\"fas fa-plus\"></i>\n                                                </button>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div class=\"varient-list\" *ngIf=\"activeTab[1]\">\n                <table class=\"table\">\n                    <tbody>\n                        <tr *ngFor=\"let note of noteList; let i = index\">\n                            <td *ngIf=\"!note.category.length || (note.category.length && note.category.indexOf(orderService.getOrderData().selectedCategory._id)>-1)\">\n                                <table class=\"table\">\n                                    <tbody>\n                                        <tr>\n                                            <td>{{note.notes}}</td>\n                                            <td>\n                                                <input type=\"checkbox\" (change)=\"addArticleNote($event, note.notes, i)\" />\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        <!-- <div class=\"md-form\">\n            <div class=\"d-flex-category\">\n                <div class=\"d-flex allergens-icon\">\n                    <div class=\"icon-preview\" *ngFor=\"let item of selectedIconImage;let i=index;\">\n                        <img [src]=\"item\" />\n                        <button type=\"button\" class=\"remove-icon\" (click)=\"removeAllergens(i, item)\">\n                            <i class=\"fas fa-times\"></i>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"category-icon-container\">\n                    <button type=\"button\" class=\"form-control btn btn-yellow\" (click)=\"allergenIcon()\">\n                        <span>Select Allergens</span>\n                    </button>\n                    <div class=\"icon-popup\" *ngIf=\"showAllergenIcon\">\n                        <div class=\"icon-container\" *ngFor=\"let allergen of allergens\">\n                            <div (click)=\"selectedIcon(allergen)\">\n                                <img [src]=\"allergen.image\" alt=\"\">\n                                <p>{{allergen.name}}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>            \n        </div> -->\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/order/item/item.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".item-list-height {\n  height: calc(100vh - 200px);\n  overflow-y: auto; }\n\n.euro-symbol {\n  font-size: 1.5rem;\n  top: 17px;\n  color: #4b473f; }\n", ""]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_steps_steps_component__ = __webpack_require__("../../../../../src/app/shared/steps/steps.component.ts");
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
    function ItemComponent(orderService, stepsComponent, completerService, globalService, router) {
        this.orderService = orderService;
        this.stepsComponent = stepsComponent;
        this.completerService = completerService;
        this.globalService = globalService;
        this.router = router;
        this.quantity = 0;
        this.articles = {};
        this.categoryList = [];
        this.categorySearchData = [];
        this.variantList = [];
        this.noteList = [];
        this.showVarient = false;
        this.activeTab = [true, false];
        this.articleAdd = false;
        this.selectedSubcategory = [false];
        this.showAllergenIcon = false;
        this.variantData = {
            quantity: 1,
            variant: [],
            notes: ''
        };
        this.notes = [];
        this.variantError = '';
        this.AddDataArticle = {
            name: '',
            price: '',
            category: '',
            subCategory: '',
            quantity: 1,
            vat: 'R1',
            variant: [],
            notes: '',
            isDeleted: true
        };
        this.vats = [
            {
                _id: "R1",
                name: "10%"
            },
            {
                _id: "R2",
                name: "4%"
            },
            {
                _id: "R3",
                name: "22%"
            }
        ];
        this.articleNotes = [];
        this.loader = false;
        this.addArticleError = '';
        this.allergens = [];
        this.selectedIconImage = [];
    }
    ItemComponent.prototype.ngOnInit = function () {
        this.data = this.orderService.getOrderData();
        if (this.data.categoryItems) {
            var steps = [];
            if (this.globalService.getStepData()) {
                steps = this.globalService.getStepData();
            }
            else {
                steps = ['Uscita 1', 'Uscita 2'];
            }
            for (var k = 0; k < steps.length; k++) {
                for (var i = 0; i < this.data.categoryItems[steps[k]].length; i++) {
                    if (this.data.selectedItems[steps[k]].length) {
                        var temp = 0;
                        for (var j = 0; j < this.data.selectedItems[steps[k]].length; j++) {
                            if (this.data.selectedItems[steps[k]][j]._id == this.data.categoryItems[steps[k]][i]._id) {
                                temp = temp + this.data.selectedItems[steps[k]][j].quantity;
                                this.data.categoryItems[steps[k]][i].itemTotal = temp;
                            }
                        }
                    }
                }
            }
            this.orderService.setOrderData(this.data);
            this.articles = this.orderService.getOrderData().categoryItems;
            this.selectedSubcategory[-1] = true;
        }
    };
    ItemComponent.prototype.increaseValue = function (article) {
        article.step = this.globalService.getTabData().step;
        var currentStep = this.globalService.getTabData().step;
        var data = this.orderService.getOrderData();
        if (data.selectedItems[currentStep].length) {
            var isExist = true;
            var isarr = [];
            for (var i = 0; i < data.selectedItems[currentStep].length; i++) {
                if (data.selectedItems[currentStep][i]._id == article._id) {
                    if (!data.selectedItems[currentStep][i].variant) {
                        data.selectedItems[currentStep][i].quantity += 1;
                        isarr.push(data.selectedItems[currentStep][i]._id);
                        for (var j = 0; j < data.categoryItems[currentStep].length; j++) {
                            if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
                                data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal + 1;
                            }
                        }
                    }
                    if (data.selectedItems[currentStep][i].variant) {
                        isExist = false;
                    }
                }
                if (data.selectedItems[currentStep][i]._id != article._id) {
                    isExist = false;
                }
            }
            if (!isExist && isarr.indexOf(article._id) < 0) {
                article.quantity = article.quantity + 1;
                for (var j = 0; j < data.categoryItems[currentStep].length; j++) {
                    if (data.categoryItems[currentStep][j]._id == article._id) {
                        data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal + article.quantity;
                    }
                }
                data.selectedItems[currentStep].push(article);
            }
        }
        else {
            article.quantity = article.quantity + 1;
            for (var j = 0; j < data.categoryItems[currentStep].length; j++) {
                if (data.categoryItems[currentStep][j]._id == article._id) {
                    data.categoryItems[currentStep][j].itemTotal = article.quantity;
                }
            }
            data.selectedItems[currentStep].push(article);
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
            steps = this.globalService.getStepData();
        }
        else {
            steps = ['Uscita 1', 'Uscita 2'];
        }
        for (var a = 0; a < steps.length; a++) {
            for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                itemno += data.selectedItems[steps[a]][i].quantity;
                if (data.selectedItems[steps[a]][i].variant) {
                    for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                        if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                            varicost += data.selectedItems[steps[a]][i].variant[j].price;
                        }
                    }
                }
                cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                data.cartTotalPrice = cp;
                data.cartTotalItem = itemno;
            }
        }
        this.orderService.setOrderData(data);
        this.articles = this.orderService.getOrderData().categoryItems;
    };
    ItemComponent.prototype.decreaseValue = function (article) {
        article.step = this.globalService.getTabData().step;
        var currentStep = this.globalService.getTabData().step;
        var data = this.orderService.getOrderData();
        for (var i = 0; i < data.selectedItems[currentStep].length; i++) {
            if (data.selectedItems[currentStep][i]._id == article._id && !data.selectedItems[currentStep][i].variant && data.selectedItems[currentStep][i].step == article.step) {
                if (data.selectedItems[currentStep][i].quantity > 1) {
                    data.selectedItems[currentStep][i].quantity = data.selectedItems[currentStep][i].quantity - 1;
                    for (var j = 0; j < data.categoryItems[currentStep].length; j++) {
                        if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
                            data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal - 1;
                        }
                    }
                }
                else {
                    article.quantity = 0;
                    for (var j = 0; j < data.categoryItems[currentStep].length; j++) {
                        if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
                            data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal - 1;
                        }
                    }
                    data.selectedItems[currentStep].splice(i, 1);
                }
            }
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
            steps = this.globalService.getStepData();
        }
        else {
            steps = ['Uscita 1', 'Uscita 2'];
        }
        var emptyArray = [];
        for (var a = 0; a < steps.length; a++) {
            if (data.selectedItems[steps[a]].length) {
                for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                    itemno += data.selectedItems[steps[a]][i].quantity;
                    if (data.selectedItems[steps[a]][i].variant) {
                        for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                            if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                varicost += data.selectedItems[steps[a]][i].variant[j].price;
                            }
                        }
                    }
                    cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                    data.cartTotalPrice = cp;
                    data.cartTotalItem = itemno;
                }
            }
            if (data.selectedItems[steps[a]].length == 0) {
                if (emptyArray.indexOf(steps[a]) < 0) {
                    emptyArray.push(steps[a]);
                }
            }
            if (emptyArray.length == steps.length) {
                data.cartTotalPrice = 0;
                data.cartTotalItem = 0;
            }
        }
        this.orderService.setOrderData(data);
        this.articles = this.orderService.getOrderData().categoryItems;
    };
    ItemComponent.prototype.viewCart = function () {
        this.router.navigate(['/waiter/order/:id/cart']);
    };
    ItemComponent.prototype.allergenIcon = function () {
        this.showAllergenIcon = !this.showAllergenIcon;
    };
    ItemComponent.prototype.viewVarient = function (article) {
        var _this = this;
        this.orderService.getVariantAndNotes()
            .then(function (data) {
            _this.variantList = data.data.variants;
            _this.noteList = data.data.notes;
        })
            .catch(function (error) {
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
            quantity: 1,
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
        var _this = this;
        this.stepsComponent.ngOnInit();
        this.orderService.getVariantAndNotes()
            .then(function (data) {
            _this.variantList = data.data.variants;
            _this.noteList = data.data.notes;
        })
            .catch(function (error) {
        });
        this.articleAdd = true;
        this.AddDataArticle = {
            name: '',
            price: '',
            category: '',
            subCategory: '',
            quantity: 1,
            variant: [],
            vat: 'R1',
            notes: '',
            isDeleted: true
        };
        this.vats = [
            {
                _id: 'R1',
                name: '10%'
            },
            {
                _id: 'R2',
                name: '4%'
            },
            {
                _id: 'R3',
                name: '22%'
            }
        ];
        this.articleNotes = [];
        this.activeTab[0] = true;
        this.activeTab[1] = false;
    };
    ItemComponent.prototype.hideArticle = function () {
        this.articleAdd = false;
        this.AddDataArticle = {
            name: '',
            price: '',
            category: '',
            subCategory: '',
            quantity: 1,
            vat: 'R1',
            variant: [],
            notes: '',
            isDeleted: true
        };
        this.articleNotes = [];
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
        value = isNaN(value) ? 2 : value;
        value < 2 ? value = 2 : '';
        value--;
        this.variantData.quantity = value;
    };
    ItemComponent.prototype.increaseQty = function () {
        var value = this.variantData.quantity;
        value = isNaN(value) ? 1 : value;
        value++;
        this.variantData.quantity = value;
    };
    ItemComponent.prototype.addRemoveVariant = function (variant, status) {
        var varIds = [];
        if (this.variantData.variant.length) {
            for (var i = 0; i < this.variantData.variant.length; i++) {
                varIds.push(this.variantData.variant[i]._id);
                if (this.variantData.variant[i]._id == variant._id) {
                    if (this.variantData.variant[i].status == status) {
                        delete variant.status;
                        this.variantData.variant.splice(i, 1);
                    }
                    else {
                        variant.status = status;
                        this.variantData.variant[i].status = status;
                    }
                }
            }
            if (varIds.length == this.variantData.variant.length) {
                if (varIds.indexOf(variant._id) < 0) {
                    variant.status = status;
                    this.variantData.variant.push(variant);
                }
            }
        }
        else {
            variant.status = status;
            this.variantData.variant.push(variant);
        }
        // if (status == 0) {
        //   variant.status = 0;
        // }
        // else {
        //   variant.status = 1;
        // }
        // for (let i = 0; i < this.variantData.variant.length; i++) {
        //   if (this.variantData.variant[i]._id == variant._id) {
        //     this.variantData.variant.splice(i, 1);
        //   }
        // }
        // this.variantData.variant.push(variant);
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
        var currentStep = this.globalService.getTabData().step;
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
            if (this.variantData.variant.length) {
                this.articleData.variant = this.variantData.variant;
            }
            if (this.variantData.notes != '') {
                this.articleData.ordernote = this.variantData.notes;
            }
            this.articleData.step = currentStep;
            this.articleData.variantUniqueId = Math.floor(Math.random() * 10000);
            var data = this.orderService.getOrderData();
            data.selectedItems[currentStep].push(this.articleData);
            for (var i = 0; i < data.categoryItems[currentStep].length; i++) {
                if (data.categoryItems[currentStep][i]._id == this.articleData._id) {
                    data.categoryItems[currentStep][i].itemTotal = data.categoryItems[currentStep][i].itemTotal + this.articleData.quantity;
                }
            }
            var cp = 0;
            var itemno = 0;
            var varicost = 0;
            var steps = [];
            if (this.globalService.getStepData()) {
                steps = this.globalService.getStepData();
            }
            else {
                steps = ['Uscita 1', 'Uscita 2'];
            }
            for (var a = 0; a < steps.length; a++) {
                for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                    itemno += data.selectedItems[steps[a]][i].quantity;
                    if (data.selectedItems[steps[a]][i].variant) {
                        for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                            if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                varicost += data.selectedItems[steps[a]][i].variant[j].price;
                            }
                        }
                    }
                    cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                    data.cartTotalPrice = cp;
                    data.cartTotalItem = itemno;
                }
            }
            this.orderService.setOrderData(data);
            this.hideVarient();
            this.articles = this.orderService.getOrderData().categoryItems;
        }
    };
    ItemComponent.prototype.saveAddArticleData = function () {
        var _this = this;
        var currentStep = this.globalService.getTabData().step;
        if (this.AddDataArticle.name === '') {
            this.addArticleError = 'Please enter name';
            setTimeout(function () {
                _this.addArticleError = '';
            }, 4000);
        }
        else if (this.AddDataArticle.quantity == 0) {
            this.addArticleError = 'Please enter quantity';
            setTimeout(function () {
                _this.addArticleError = '';
            }, 4000);
        }
        else if (this.AddDataArticle.price === '') {
            this.addArticleError = 'Please enter price';
            setTimeout(function () {
                _this.addArticleError = '';
            }, 4000);
        }
        else {
            var orderdata_1 = this.orderService.getOrderData();
            this.AddDataArticle.category = this.orderService.getOrderData().selectedCategory._id;
            if (this.selectedSubcategory[-1]) {
                this.AddDataArticle.subCategory = '';
            }
            if (!this.selectedSubcategory[-1]) {
                if (this.orderService.getOrderData().selectedCategory.subCategory.length) {
                    for (var i = 0; i < this.orderService.getOrderData().selectedCategory.subCategory.length; i++) {
                        if (this.selectedSubcategory[i]) {
                            this.AddDataArticle.subCategory = this.orderService.getOrderData().selectedCategory.subCategory[i];
                        }
                    }
                }
                else {
                    this.AddDataArticle.subCategory = '';
                }
            }
            var opts = {
                name: this.AddDataArticle.name,
                price: Number(this.AddDataArticle.price),
                category: this.AddDataArticle.category,
                vat: (this.AddDataArticle.vat) ? this.AddDataArticle.vat : 'R1',
                subCategory: this.AddDataArticle.subCategory,
                isDeleted: this.AddDataArticle.isDeleted
            };
            this.loader = true;
            this.orderService.addArticle(opts)
                .then(function (data) {
                var itemTemp = __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](data.data);
                itemTemp.step = currentStep;
                itemTemp.quantity = _this.AddDataArticle.quantity;
                if (_this.AddDataArticle.variant.length) {
                    itemTemp.variant = _this.AddDataArticle.variant;
                }
                if (_this.AddDataArticle.notes != '') {
                    itemTemp.ordernote = _this.AddDataArticle.notes;
                }
                var itemData = __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](itemTemp);
                _this.loader = false;
                orderdata_1.selectedItems[currentStep].push(itemData);
                var cp = 0;
                var itemno = 0;
                var varicost = 0;
                var steps = [];
                if (_this.globalService.getStepData()) {
                    steps = _this.globalService.getStepData();
                }
                else {
                    steps = ['Uscita 1', 'Uscita 2'];
                }
                for (var a = 0; a < steps.length; a++) {
                    for (var i = 0; i < orderdata_1.selectedItems[steps[a]].length; i++) {
                        itemno += orderdata_1.selectedItems[steps[a]][i].quantity;
                        if (orderdata_1.selectedItems[steps[a]][i].variant) {
                            for (var j = 0; j < orderdata_1.selectedItems[steps[a]][i].variant.length; j++) {
                                if (orderdata_1.selectedItems[steps[a]][i].variant[j].status == 1) {
                                    varicost += orderdata_1.selectedItems[steps[a]][i].variant[j].price;
                                }
                            }
                        }
                        cp += (orderdata_1.selectedItems[steps[a]][i].price + varicost) * orderdata_1.selectedItems[steps[a]][i].quantity;
                        orderdata_1.cartTotalPrice = cp;
                        orderdata_1.cartTotalItem = itemno;
                    }
                }
                _this.orderService.setOrderData(orderdata_1);
                _this.hideArticle();
                _this.stepsComponent.ngOnInit();
            })
                .catch(function (error) {
            });
        }
    };
    ItemComponent.prototype.inputChanged = function () {
        if ((Number(this.AddDataArticle.price) % 1) != 0) {
            this.AddDataArticle.price = parseFloat(this.AddDataArticle.price).toFixed(2);
        }
    };
    ItemComponent.prototype.selectedIcon = function (icon) {
        if (this.selectedIconImage.indexOf(icon.image) === -1) {
            this.selectedIconImage.push(icon.image);
        }
        this.showAllergenIcon = false;
    };
    ;
    ItemComponent.prototype.removeAllergens = function (indx, item) {
        if (this.selectedIconImage.indexOf(item) > -1) {
            this.selectedIconImage.splice(indx, 1);
        }
    };
    ;
    ItemComponent.prototype.decreaseArticleQty = function () {
        var value = this.AddDataArticle.quantity;
        value = isNaN(value) ? 2 : value;
        value < 2 ? value = 2 : '';
        value--;
        this.AddDataArticle.quantity = value;
    };
    ItemComponent.prototype.increaseArticleQty = function () {
        var value = this.AddDataArticle.quantity;
        value = isNaN(value) ? 1 : value;
        value++;
        this.AddDataArticle.quantity = value;
    };
    ItemComponent.prototype.addRemoveArticleVariant = function (variant, status) {
        var varIds = [];
        if (this.AddDataArticle.variant.length) {
            for (var i = 0; i < this.AddDataArticle.variant.length; i++) {
                varIds.push(this.AddDataArticle.variant[i]._id);
                if (this.AddDataArticle.variant[i]._id == variant._id) {
                    if (this.AddDataArticle.variant[i].status == status) {
                        delete variant.status;
                        this.AddDataArticle.variant.splice(i, 1);
                    }
                    else {
                        variant.status = status;
                        this.AddDataArticle.variant[i].status = status;
                    }
                }
            }
            if (varIds.length == this.AddDataArticle.variant.length) {
                if (varIds.indexOf(variant._id) < 0) {
                    variant.status = status;
                    this.AddDataArticle.variant.push(variant);
                }
            }
        }
        else {
            variant.status = status;
            this.AddDataArticle.variant.push(variant);
        }
        // if (status == 0) {
        //   variant.status = 0;
        // }
        // else {
        //   variant.status = 1;
        // }
        // for (let i = 0; i < this.AddDataArticle.variant.length; i++) {
        //   if (this.AddDataArticle.variant[i]._id == variant._id) {
        //     this.AddDataArticle.variant.splice(i, 1);
        //   }
        // }
        // this.AddDataArticle.variant.push(variant);
    };
    ItemComponent.prototype.addArticleNote = function (event, note, i) {
        if (event.target.checked) {
            this.articleNotes.push(note);
        }
        else {
            for (var i_2 = 0; i_2 < this.articleNotes.length; i_2++) {
                if (this.articleNotes[i_2] == note) {
                    this.articleNotes.splice(i_2, 1);
                }
            }
        }
        this.AddDataArticle.notes = this.articleNotes.toString();
    };
    ItemComponent.prototype.deleteItemFromCart = function (article) {
        var data = this.orderService.getOrderData();
        var currentStep = this.globalService.getTabData().step;
        for (var i = 0; i < data.selectedItems[currentStep].length; i++) {
            if (data.selectedItems[currentStep][i]._id == article._id && !article.variant) {
                //non variant type data
                for (var m = 0; m < data.categoryItems[currentStep].length; m++) {
                    if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
                        data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
                    }
                }
                if (!data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
                    data.selectedItems[currentStep].splice(i, 1);
                }
            }
            else if (data.selectedItems[currentStep][i]._id == article._id && article.variant) {
                //variant type data
                for (var m = 0; m < data.categoryItems[currentStep].length; m++) {
                    if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
                        data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
                    }
                }
                if (data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
                    data.selectedItems[currentStep].splice(i, 1);
                }
            }
        }
        var cp = 0;
        var itemno = 0;
        var varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
            steps = this.globalService.getStepData();
        }
        else {
            steps = ['Uscita 1', 'Uscita 2'];
        }
        var emptyArray = [];
        for (var a = 0; a < steps.length; a++) {
            if (data.selectedItems[steps[a]].length) {
                for (var i = 0; i < data.selectedItems[steps[a]].length; i++) {
                    itemno += data.selectedItems[steps[a]][i].quantity;
                    if (data.selectedItems[steps[a]][i].variant) {
                        for (var j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                            if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                                varicost += data.selectedItems[steps[a]][i].variant[j].price;
                            }
                        }
                    }
                    cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
                    data.cartTotalPrice = cp;
                    data.cartTotalItem = itemno;
                }
            }
            if (data.selectedItems[steps[a]].length == 0) {
                if (emptyArray.indexOf(steps[a]) < 0) {
                    emptyArray.push(steps[a]);
                }
            }
            if (emptyArray.length == steps.length) {
                data.cartTotalPrice = 0;
                data.cartTotalItem = 0;
            }
        }
        this.orderService.setOrderData(data);
    };
    ItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-item',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/order/item/item.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__shared_steps_steps_component__["a" /* StepsComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_steps_steps_component__["a" /* StepsComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_completer__["a" /* CompleterService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _e || Object])
    ], ItemComponent);
    return ItemComponent;
    var _a, _b, _c, _d, _e;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_steps_steps_component__ = __webpack_require__("../../../../../src/app/shared/steps/steps.component.ts");
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
            providers: [__WEBPACK_IMPORTED_MODULE_11__shared_steps_steps_component__["a" /* StepsComponent */]],
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