webpackJsonp(["order-list.module"],{

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabs-container\">\r\n    <ul>\r\n        <li [class.active]=\"activetab == 1\" (click)=\"changeTab(1)\">\r\n            All\r\n        </li>\r\n        <li [class.active]=\"activetab == 2\" (click)=\"changeTab(2)\">\r\n            To Call\r\n        </li>\r\n        <li [class.active]=\"activetab == 3\" (click)=\"changeTab(3)\">\r\n            Delivered\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"text-center\" *ngIf=\"!(orders && orders.length)\">No Order Found.</div>\r\n<div *ngIf=\"orders && orders.length\" class=\"order-list-container container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"order-card\" *ngFor=\"let order of orders\">\r\n            <div class=\"card order-list\">\r\n                <div class=\"card-body\" [class.opacity]=\"order.status == 3\">\r\n                    <h4 class=\"card-title\" *ngIf=\"stepdata[order._id]\">\r\n                        <div>\r\n                            <img src=\"assets/images/table.png\" alt=\"\">\r\n                            <span>{{order.tableName}}/\r\n                                <span class=\"order-number\">N.{{order.orderId}}</span>\r\n                            </span>\r\n                        </div>\r\n                        <!-- <div class=\"status bg-red\" *ngIf=\"remainingTime[order._id] && stepdata[order._id] && remainingTime[order._id][stepdata[order._id].step] != '00:00' && step.preparationTime\">\r\n                            New Order X{{remainingTime[order._id][stepdata[order._id].step]}}\r\n                        </div> -->\r\n                        <div *ngFor=\"let step of order.step\">\r\n                            <div class=\"status bg-red\" *ngIf=\"remainingTime[order._id] && stepdata[order._id] && step.step == stepdata[order._id].step && remainingTime[order._id][stepdata[order._id].step] && remainingTime[order._id][stepdata[order._id].step] != '00:00'\">\r\n                                New Order\r\n                            </div>\r\n                            <!-- <span class=\"status bg-red\" *ngIf=\"stepdata[order._id] && step.step == stepdata[order._id].step\">New Order X{{step.preparationTime}}</span> -->\r\n                        </div>\r\n                    </h4>\r\n                    <div class=\"card-text\">\r\n                        <p>\r\n                            <i class=\"fas fa-cube\"></i> {{order.room.name}}</p>\r\n                        <p>\r\n                            <i class=\"far fa-clock\"></i> {{order.created_at | date:'hh:mm a'}}</p>\r\n                        <p>\r\n                            <i class=\"far fa-user\"></i> {{order.noOfPeople}}</p>\r\n                    </div>\r\n                    <div class=\"step-listing\">\r\n                        <ul *ngIf=\"stepdata[order._id]\">\r\n                            <li *ngFor=\"let step of order.step; let i = index;\" (click)=\"selectedTab(step.step,i,order._id)\" [class.active]=\"step.step == stepdata[order._id].step\"\r\n                                [class.completed]=\"itemStatusDelivered[order._id] && itemStatusDelivered[order._id][step.step]\">{{step.step}}</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"order-items-container\">\r\n                        <div *ngFor=\"let step of order.step; let i= index\">\r\n                            <div *ngFor=\"let item of step.itemId\">\r\n                                <div class=\"order-item\" *ngIf=\"stepdata[order._id] && item.step == stepdata[order._id].step\" [class.text-line]=\"item.status == 1\">\r\n                                    <!-- <label class=\"label item-status\">{{getOrderStatus(item.status)}}</label> -->\r\n                                    <div class=\"order-item-img\">\r\n                                        {{item.quantity}} X\r\n                                    </div>\r\n                                    <div class=\"order-item-detail\">\r\n                                        {{item.id.name}}\r\n                                        <ul>\r\n                                            <li *ngFor=\"let varient of item.variant\">\r\n                                                <i *ngIf=\"varient.status == 1\">+</i>\r\n                                                <i *ngIf=\"varient.status == 0\">-</i> {{varient.name}}\r\n                                            </li>\r\n                                        </ul>\r\n                                        <ul>\r\n                                            <li>\r\n                                                {{item.notes}}\r\n                                            </li>\r\n                                        </ul>\r\n                                    </div>\r\n                                    <div class=\"order-quantity d-flex w-45\">\r\n                                        <button type=\"button\" class=\"btn btn-floting update-order-btn\" *ngIf=\"(step.step == 'Uscita 1')\" (click)=\"updateItem(item, order._id, 2)\">\r\n                                            <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                                        </button>\r\n                                        <button type=\"button\" class=\"btn btn-floting update-order-btn\" *ngIf=\"(step.step != 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step] && stepdata[order._id] && (order.stepStatus == step.step)\"\r\n                                            (click)=\"updateItem(item, order._id, 2)\">\r\n                                            <img src=\"assets/images/order-deliver.png\" alt=\"\" />\r\n                                        </button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"order-call-btn\" *ngIf=\"order.step.length\">\r\n                    <div *ngFor=\"let step of order.step\">\r\n                        <div *ngIf=\"stepdata[order._id].step == step.step\">\r\n                            <div class=\"department-checkbtn-container\">\r\n                                <span *ngFor=\"let department of step.department\">\r\n                                    <span class=\"department-checkbtn\" *ngIf=\"(step.step == 'Uscita 1') && (authGuard.getCurrentUser()._id == department.id._id) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                        [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\" (click)=\"updateDepartmentStatus(department,order,step.step)\">\r\n                                        <i class=\"fas fa-check-circle\"></i>\r\n                                    </span>\r\n                                    <span class=\"department-checkbtn\" *ngIf=\"(step.step != 'Uscita 1') && stepdata[order._id] && (order.stepStatus == step.step) && (authGuard.getCurrentUserId() == department.id._id) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                        [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\" (click)=\"updateDepartmentStatus(department,order,step.step)\">\r\n                                        <i class=\"fas fa-check-circle\"></i>\r\n                                    </span>\r\n                                    <span class=\"department-name\" [class.bg-grey]=\"department.status == 0\" [class.bg-green]=\"department.status == 1\" *ngIf=\"authGuard.getCurrentUser()._id != department.id._id\">{{getFirstChar(department.id.firstName)}}</span>\r\n                                </span>\r\n                            </div>\r\n                            <button type=\"submit\" *ngIf=\"stepdata[order._id] && (step.step == 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                (click)=\"updateStepItem(step, order)\">Delivered</button>\r\n                            <button type=\"submit\" *ngIf=\"(step.step != 'Uscita 1') && stepdata[order._id] && (order.stepStatus == step.step) && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step]\"\r\n                                (click)=\"updateStepItem(step, order)\">Delivered</button>\r\n                            <button class=\"bg-yellow\" *ngIf=\"(step.step != 'Uscita 1') && itemStatusDelivered[order._id] && !itemStatusDelivered[order._id][step.step] && stepdata[order._id] && (order.stepStatus != step.step)\"\r\n                                type=\"submit\" [disabled]=\"true\">To Call</button>\r\n                        </div>\r\n\r\n                        <!-- Modal -->\r\n\r\n                        <div class=\"modal fade modal-sm\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n                            <div class=\"modal-dialog\" role=\"document\">\r\n                                <div class=\"modal-content\">\r\n                                    <div class=\"modal-header\">\r\n                                        <h4 class=\"modal-title\" id=\"exampleModalLabel\">Confirm Deliver</h4>\r\n                                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                                            <span aria-hidden=\"true\">&times;</span>\r\n                                        </button>\r\n                                    </div>\r\n                                    <div class=\"modal-body\">\r\n\r\n                                    </div>\r\n                                    <div class=\"modal-footer\">\r\n                                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n                                        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"updateStepItem(step, order)\">Confirm</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- *ngIf=\"websocketService.getCurrentUser() == '1'\" -->\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tabs-container {\n  position: fixed;\n  top: 50px;\n  width: 100%; }\n\n.order-list-container {\n  margin-top: 50px; }\n  .order-list-container .row {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important;\n    margin: 0; }\n\n.order-card {\n  max-width: 447px;\n  margin-right: 20px;\n  width: 100%;\n  min-width: 320px; }\n  .order-card .card-body {\n    padding-bottom: 0  !important; }\n    .order-card .card-body .step-listing {\n      background-color: #fff  !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrderListComponent = /** @class */ (function () {
    function OrderListComponent(websocketService, authGuard, differs) {
        this.websocketService = websocketService;
        this.authGuard = authGuard;
        this.differs = differs;
        this.orders = [];
        this.loadingOrders = true;
        this.stepdata = [];
        this.itemStatusDelivered = [];
        this.remainingTime = [];
        this.activetab = 1;
        this.changedTab = false;
        this.audioPlay = '';
        this.differ = differs.find([]).create(null);
        // if (this.websocketService.getAudio() == '1') {
        //     var x = (document.createElement('audio').canPlayType);
        //     var myAudio = document.createElement('audio');
        //     if (myAudio.canPlayType("audio/mpeg")) {
        //         myAudio.setAttribute("src", "../../../assets/audio/notication_sound.mp3");
        //     } else {
        //         myAudio.setAttribute("src", "../../../assets/audio/notication_sound.ogg");
        //     }
        //     myAudio.setAttribute("controls", "controls");
        //     myAudio.setAttribute("autoplay", "autoplay");
        //     document.body.appendChild(myAudio);
        // }
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activetab = 1;
        this.websocketService.getOrders(this.activetab).then(function (data) {
            // this.audioPlay = localStorage.getItem('autoplay');
            _this.orders = data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                _this.remainingTime = [];
                var _loop_1 = function (i) {
                    if (_this.orders[i]) {
                        var itemStatusDelivered = {};
                        var remTime_1 = {};
                        for (var k = 0; k < _this.orders[i].step.length; k++) {
                            var startTemp = [];
                            for (var l = 0; l < _this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(_this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[_this.orders[i].step[k].step] = startTemp.every(_this.isEqualToOne);
                        }
                        _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                var temparray = _this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: _this.orders[i].step[m].step,
                                };
                                _this.stepdata[_this.orders[i]._id] = temp;
                                break;
                            }
                        }
                        var _loop_2 = function (k) {
                            if (_this.orders[i].step[k].preparationTime) {
                                if ((_this.orders[i].step[k].step == 'Uscita 1') && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                    var seconds_1 = _this.orders[i].step[k].preparationTime * 60;
                                    var timeInterval = 1000;
                                    var m_1 = _this.orders[i].step[k].preparationTime - 1;
                                    var t_1 = 0;
                                    var s_1 = 60;
                                    id = setInterval(function () {
                                        t_1 = t_1 + 1;
                                        seconds_1 = seconds_1 > 0 ? seconds_1 - 1 : 0;
                                        s_1 = s_1 > 0 ? s_1 - 1 : 0;
                                        if (seconds_1 == 0) {
                                            clearInterval(id);
                                        }
                                        if (t_1 == 60) {
                                            t_1 = 0;
                                            if (m_1 == 0) {
                                                m_1 = 0;
                                                s_1 = 0;
                                            }
                                            else {
                                                m_1 = m_1 - 1;
                                                s_1 = 60;
                                            }
                                        }
                                        var minutes = m_1;
                                        if (_this.orders[i] && _this.orders[i].step[k]) {
                                            remTime_1[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_1 < 10 ? ('0' + s_1) : s_1);
                                        }
                                    }, timeInterval);
                                }
                                else if ((_this.orders[i].step[k].step != 'Uscita 1') && (_this.orders[i].stepStatus == _this.orders[i].step[k].step) && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                    var seconds_2 = _this.orders[i].step[k].preparationTime * 60;
                                    var timeInterval = 1000;
                                    var m_2 = _this.orders[i].step[k].preparationTime - 1;
                                    var t_2 = 0;
                                    var s_2 = 60;
                                    id = setInterval(function () {
                                        t_2 = t_2 + 1;
                                        seconds_2 = seconds_2 > 0 ? seconds_2 - 1 : 0;
                                        s_2 = s_2 > 0 ? s_2 - 1 : 0;
                                        if (seconds_2 == 0) {
                                            clearInterval(id);
                                        }
                                        if (t_2 == 60) {
                                            t_2 = 0;
                                            if (m_2 == 0) {
                                                m_2 = 0;
                                                s_2 = 0;
                                            }
                                            else {
                                                m_2 = m_2 - 1;
                                                s_2 = 60;
                                            }
                                        }
                                        var minutes = m_2;
                                        if (_this.orders[i] && _this.orders[i].step[k]) {
                                            remTime_1[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_2 < 10 ? ('0' + s_2) : s_2);
                                        }
                                    }, timeInterval);
                                }
                            }
                        };
                        for (var k = 0; k < _this.orders[i].step.length; k++) {
                            _loop_2(k);
                        }
                        _this.remainingTime[_this.orders[i]._id] = remTime_1;
                    }
                };
                var id, id;
                for (var i = 0; i < _this.orders.length; i++) {
                    _loop_1(i);
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
        });
        this.tick = setInterval(function () {
            _this.clock = Date.now();
        }, 1000);
    };
    OrderListComponent.prototype.isEqualToOne = function (currentValue) {
        return currentValue == 1;
    };
    ;
    OrderListComponent.prototype.getOrderStatus = function (status) {
        var str = 'In progress';
        switch (status) {
            case 0:
                str = 'New order';
                break;
            case 1:
                str = 'Delivered';
                break;
            case 2:
                str = 'Prepared';
                break;
            case 3:
                str = 'Cancelled';
                break;
            case 4:
                str = 'In progress';
                break;
            case 5:
                str = 'Completed';
                break;
            default:
                break;
        }
        return str;
    };
    ;
    OrderListComponent.prototype.updateItem = function (item, order) {
        var _this = this;
        item.status = 1;
        var ids = [];
        ids.push(item._id);
        var opts = {
            id: ids
        };
        this.websocketService.updateOrder(order, opts).then(function (data) {
            order = data.data;
            if (_this.orders.length) {
                var _loop_3 = function (i) {
                    if (_this.orders[i].id == order) {
                        var itemStatusDelivered = {};
                        var remTime_2 = {};
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            var startTemp = [];
                            for (var n = 0; n < _this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(_this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[_this.orders[i].step[m].step] = startTemp.every(_this.isEqualToOne);
                        }
                        _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                var temparray = _this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: _this.orders[i].step[m].step,
                                };
                                _this.stepdata[_this.orders[i]._id] = temp;
                                break;
                            }
                        }
                        var _loop_4 = function (k) {
                            if (_this.orders[i].step[k].preparationTime) {
                                if ((_this.orders[i].step[k].step == 'Uscita 1') && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                    var seconds_3 = _this.orders[i].step[k].preparationTime * 60;
                                    var timeInterval = 1000;
                                    var m_3 = _this.orders[i].step[k].preparationTime - 1;
                                    var t_3 = 0;
                                    var s_3 = 60;
                                    id = setInterval(function () {
                                        t_3 = t_3 + 1;
                                        seconds_3 = seconds_3 > 0 ? seconds_3 - 1 : 0;
                                        s_3 = s_3 > 0 ? s_3 - 1 : 0;
                                        if (seconds_3 == 0) {
                                            clearInterval(id);
                                        }
                                        if (t_3 == 60) {
                                            t_3 = 0;
                                            if (m_3 == 0) {
                                                m_3 = 0;
                                                s_3 = 0;
                                            }
                                            else {
                                                m_3 = m_3 - 1;
                                                s_3 = 60;
                                            }
                                        }
                                        var minutes = m_3;
                                        if (_this.orders[i] && _this.orders[i].step[k]) {
                                            remTime_2[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_3 < 10 ? ('0' + s_3) : s_3);
                                        }
                                    }, timeInterval);
                                }
                                else if ((_this.orders[i].step[k].step != 'Uscita 1') && (_this.orders[i].stepStatus == _this.orders[i].step[k].step) && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                    var seconds_4 = _this.orders[i].step[k].preparationTime * 60;
                                    var timeInterval = 1000;
                                    var m_4 = _this.orders[i].step[k].preparationTime - 1;
                                    var t_4 = 0;
                                    var s_4 = 60;
                                    id = setInterval(function () {
                                        t_4 = t_4 + 1;
                                        seconds_4 = seconds_4 > 0 ? seconds_4 - 1 : 0;
                                        s_4 = s_4 > 0 ? s_4 - 1 : 0;
                                        if (seconds_4 == 0) {
                                            clearInterval(id);
                                        }
                                        if (t_4 == 60) {
                                            t_4 = 0;
                                            if (m_4 == 0) {
                                                m_4 = 0;
                                                s_4 = 0;
                                            }
                                            else {
                                                m_4 = m_4 - 1;
                                                s_4 = 60;
                                            }
                                        }
                                        var minutes = m_4;
                                        if (_this.orders[i] && _this.orders[i].step[k]) {
                                            remTime_2[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_4 < 10 ? ('0' + s_4) : s_4);
                                        }
                                    }, timeInterval);
                                }
                            }
                        };
                        for (var k = 0; k < _this.orders[i].step.length; k++) {
                            _loop_4(k);
                        }
                        _this.remainingTime[_this.orders[i]._id] = remTime_2;
                    }
                };
                var id, id;
                for (var i = 0; i < _this.orders.length; i++) {
                    _loop_3(i);
                }
            }
        }).catch(function (error) {
        });
    };
    ;
    OrderListComponent.prototype.updateStepItem = function (step, order) {
        var _this = this;
        var result = confirm("Do you want to deliver?");
        if (result) {
            var ids = [];
            for (var i = 0; i < step.itemId.length; i++) {
                step.itemId[i].status = 1;
                if (ids.indexOf(step.itemId[i]._id) < 0) {
                    ids.push(step.itemId[i]._id);
                }
            }
            var opts = {
                id: ids,
                key: 'delivered'
            };
            this.websocketService.updateOrder(order._id, opts).then(function (data) {
                order = __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](data.data);
                _this.websocketService.getOrders(_this.activetab).then(function (data) {
                    _this.orders = data;
                    if (_this.orders.length) {
                        var _loop_5 = function (i) {
                            if (_this.orders[i]._id == order._id) {
                                var itemStatusDelivered = {};
                                var remTime_3 = {};
                                for (var k = 0; k < _this.orders[i].step.length; k++) {
                                    var startTemp = [];
                                    for (var l = 0; l < _this.orders[i].step[k].itemId.length; l++) {
                                        startTemp.push(_this.orders[i].step[k].itemId[l].status);
                                    }
                                    itemStatusDelivered[_this.orders[i].step[k].step] = startTemp.every(_this.isEqualToOne);
                                }
                                _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                                for (var m = 0; m < _this.orders[i].step.length; m++) {
                                    if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                        var temparray = _this.orders[i].step[m].step.split(' ');
                                        var num = Number(temparray[1]);
                                        var temp = {
                                            tab: num - 1,
                                            step: _this.orders[i].step[m].step,
                                        };
                                        _this.stepdata[_this.orders[i]._id] = temp;
                                        break;
                                    }
                                }
                                var stepIds = [];
                                var _loop_6 = function (k) {
                                    stepIds.push(_this.orders[i].step[k]._id);
                                    if (_this.orders[i].step[k].preparationTime) {
                                        if ((_this.orders[i].step[k].step == 'Uscita 1') && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                            var seconds_5 = _this.orders[i].step[k].preparationTime * 60;
                                            var timeInterval = 1000;
                                            var m_5 = _this.orders[i].step[k].preparationTime - 1;
                                            var t_5 = 0;
                                            var s_5 = 60;
                                            id = setInterval(function () {
                                                t_5 = t_5 + 1;
                                                seconds_5 = seconds_5 > 0 ? seconds_5 - 1 : 0;
                                                s_5 = s_5 > 0 ? s_5 - 1 : 0;
                                                if (seconds_5 == 0) {
                                                    clearInterval(id);
                                                }
                                                if (t_5 == 60) {
                                                    t_5 = 0;
                                                    if (m_5 == 0) {
                                                        m_5 = 0;
                                                        s_5 = 0;
                                                    }
                                                    else {
                                                        m_5 = m_5 - 1;
                                                        s_5 = 60;
                                                    }
                                                }
                                                var minutes = m_5;
                                                if (_this.orders[i] && _this.orders[i].step[k]) {
                                                    remTime_3[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_5 < 10 ? ('0' + s_5) : s_5);
                                                }
                                            }, timeInterval);
                                        }
                                        else if ((_this.orders[i].step[k].step != 'Uscita 1') && (_this.orders[i].stepStatus == _this.orders[i].step[k].step) && !_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[k].step]) {
                                            var seconds_6 = _this.orders[i].step[k].preparationTime * 60;
                                            var timeInterval = 1000;
                                            var m_6 = _this.orders[i].step[k].preparationTime - 1;
                                            var t_6 = 0;
                                            var s_6 = 60;
                                            id = setInterval(function () {
                                                t_6 = t_6 + 1;
                                                seconds_6 = seconds_6 > 0 ? seconds_6 - 1 : 0;
                                                s_6 = s_6 > 0 ? s_6 - 1 : 0;
                                                if (seconds_6 == 0) {
                                                    clearInterval(id);
                                                }
                                                if (t_6 == 60) {
                                                    t_6 = 0;
                                                    if (m_6 == 0) {
                                                        m_6 = 0;
                                                        s_6 = 0;
                                                    }
                                                    else {
                                                        m_6 = m_6 - 1;
                                                        s_6 = 60;
                                                    }
                                                }
                                                var minutes = m_6;
                                                if (_this.orders[i] && _this.orders[i].step[k]) {
                                                    remTime_3[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_6 < 10 ? ('0' + s_6) : s_6);
                                                }
                                            }, timeInterval);
                                        }
                                    }
                                };
                                for (var k = 0; k < _this.orders[i].step.length; k++) {
                                    _loop_6(k);
                                }
                                _this.remainingTime[_this.orders[i]._id] = __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](remTime_3);
                                return "break";
                            }
                        };
                        var id, id;
                        for (var i = 0; i < _this.orders.length; i++) {
                            var state_1 = _loop_5(i);
                            if (state_1 === "break")
                                break;
                        }
                    }
                    _this.loadingOrders = false;
                })
                    .catch(function (error) {
                });
            }).catch(function (error) {
            });
        }
    };
    ;
    OrderListComponent.prototype.isBelowThreshold = function (currentValue) {
        return currentValue == 1;
    };
    ;
    OrderListComponent.prototype.selectedTab = function (step, tab, orderId) {
        var temp = {
            tab: tab,
            step: step
        };
        this.stepdata[orderId] = temp;
    };
    OrderListComponent.prototype.getFirstChar = function (text) {
        return text.charAt();
    };
    OrderListComponent.prototype.updateDepartmentStatus = function (department, order, step) {
        var _this = this;
        if (department.status == 0) {
            department.status = 1;
            var opts = {
                step: step,
                status: 1
            };
        }
        else {
            department.status = 0;
            var opts = {
                step: step,
                status: 0
            };
        }
        this.websocketService.updateDepartmentStatus(order._id, opts).then(function (data) {
            order = data.data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    if (_this.orders[i]) {
                        var itemStatusDelivered = {};
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            var startTemp = [];
                            for (var n = 0; n < _this.orders[i].step[m].itemId.length; n++) {
                                startTemp.push(_this.orders[i].step[m].itemId[n].status);
                            }
                            itemStatusDelivered[_this.orders[i].step[m].step] = startTemp.every(_this.isEqualToOne);
                        }
                        _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                var temparray = _this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: _this.orders[i].step[m].step,
                                };
                                _this.stepdata[_this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        }).catch(function (error) {
        });
    };
    OrderListComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.websocketService.socketEvent) {
            if (this.orders && this.orders.length) {
                var change = this.differ.diff(this.orders);
                if (change != null) {
                    if (this.orders.length) {
                        // new code
                        for (var j = this.orders.length - 1; j >= 0; j--) {
                            var arr = [];
                            if (this.orders[j].stepStatus == null) {
                                this.orders[j].stepStatus = 'Uscita 1';
                            }
                            for (var k = 0; k < this.orders[j].item.length; k++) {
                                if (this.orders[j].stepStatus == this.orders[j].item[k].step) {
                                    arr.push(this.orders[j].item[k].status);
                                }
                            }
                            if (this.activetab == 2) {
                                if (!(__WEBPACK_IMPORTED_MODULE_3_lodash__["uniq"](arr).length === 1 && arr[0] === 1)) {
                                    this.orders.splice(this.orders[j], 1);
                                }
                            }
                            else if (this.activetab == 3) {
                                if (__WEBPACK_IMPORTED_MODULE_3_lodash__["uniq"](arr).length === 1 && arr[0] === 1) {
                                    this.orders.splice(this.orders[j], 1);
                                }
                            }
                        }
                        if (this.orders.length) {
                            var _loop_7 = function (i) {
                                if (this_1.orders[i]._id == this_1.websocketService.orderId) {
                                    var itemStatusDelivered = {};
                                    var remTime_4 = {};
                                    for (var m = 0; m < this_1.orders[i].step.length; m++) {
                                        var startTemp = [];
                                        for (var n = 0; n < this_1.orders[i].step[m].itemId.length; n++) {
                                            startTemp.push(this_1.orders[i].step[m].itemId[n].status);
                                        }
                                        itemStatusDelivered[this_1.orders[i].step[m].step] = startTemp.every(this_1.isEqualToOne);
                                    }
                                    this_1.itemStatusDelivered[this_1.orders[i]._id] = itemStatusDelivered;
                                    for (var m = 0; m < this_1.orders[i].step.length; m++) {
                                        if (!this_1.itemStatusDelivered[this_1.orders[i]._id][this_1.orders[i].step[m].step]) {
                                            var temparray = this_1.orders[i].step[m].step.split(' ');
                                            var num = Number(temparray[1]);
                                            var temp = {
                                                tab: num - 1,
                                                step: this_1.orders[i].step[m].step,
                                            };
                                            this_1.stepdata[this_1.orders[i]._id] = temp;
                                            break;
                                        }
                                    }
                                    var _loop_8 = function (k) {
                                        if (this_1.orders[i].step[k].preparationTime) {
                                            if ((this_1.orders[i].step[k].step == 'Uscita 1') && !this_1.itemStatusDelivered[this_1.orders[i]._id][this_1.orders[i].step[k].step]) {
                                                var seconds_7 = this_1.orders[i].step[k].preparationTime * 60;
                                                var timeInterval = 1000;
                                                var m_7 = this_1.orders[i].step[k].preparationTime - 1;
                                                var t_7 = 0;
                                                var s_7 = 60;
                                                id = setInterval(function () {
                                                    t_7 = t_7 + 1;
                                                    seconds_7 = seconds_7 > 0 ? seconds_7 - 1 : 0;
                                                    s_7 = s_7 > 0 ? s_7 - 1 : 0;
                                                    if (seconds_7 == 0) {
                                                        clearInterval(id);
                                                    }
                                                    if (t_7 == 60) {
                                                        t_7 = 0;
                                                        if (m_7 == 0) {
                                                            m_7 = 0;
                                                            s_7 = 0;
                                                        }
                                                        else {
                                                            m_7 = m_7 - 1;
                                                            s_7 = 60;
                                                        }
                                                    }
                                                    var minutes = m_7;
                                                    if (_this.orders[i] && _this.orders[i].step[k]) {
                                                        remTime_4[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_7 < 10 ? ('0' + s_7) : s_7);
                                                    }
                                                }, timeInterval);
                                            }
                                            else if ((this_1.orders[i].step[k].step != 'Uscita 1') && (this_1.orders[i].stepStatus == this_1.orders[i].step[k].step) && !this_1.itemStatusDelivered[this_1.orders[i]._id][this_1.orders[i].step[k].step]) {
                                                var seconds_8 = this_1.orders[i].step[k].preparationTime * 60;
                                                var timeInterval = 1000;
                                                var m_8 = this_1.orders[i].step[k].preparationTime - 1;
                                                var t_8 = 0;
                                                var s_8 = 60;
                                                id = setInterval(function () {
                                                    t_8 = t_8 + 1;
                                                    seconds_8 = seconds_8 > 0 ? seconds_8 - 1 : 0;
                                                    s_8 = s_8 > 0 ? s_8 - 1 : 0;
                                                    if (seconds_8 == 0) {
                                                        clearInterval(id);
                                                    }
                                                    if (t_8 == 60) {
                                                        t_8 = 0;
                                                        if (m_8 == 0) {
                                                            m_8 = 0;
                                                            s_8 = 0;
                                                        }
                                                        else {
                                                            m_8 = m_8 - 1;
                                                            s_8 = 60;
                                                        }
                                                    }
                                                    var minutes = m_8;
                                                    if (_this.orders[i] && _this.orders[i].step[k]) {
                                                        remTime_4[_this.orders[i].step[k].step] = (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (s_8 < 10 ? ('0' + s_8) : s_8);
                                                    }
                                                }, timeInterval);
                                            }
                                        }
                                    };
                                    for (var k = 0; k < this_1.orders[i].step.length; k++) {
                                        _loop_8(k);
                                    }
                                    this_1.remainingTime[this_1.orders[i]._id] = remTime_4;
                                    this_1.websocketService.orderId = '';
                                    return "break";
                                }
                            };
                            var this_1 = this, id, id;
                            for (var i = 0; i < this.orders.length; i++) {
                                var state_2 = _loop_7(i);
                                if (state_2 === "break")
                                    break;
                            }
                        }
                    }
                }
            }
            this.websocketService.socketEvent = false;
        }
    };
    OrderListComponent.prototype.changeTab = function (tab) {
        var _this = this;
        this.changedTab = true;
        this.activetab = tab;
        this.websocketService.getOrders(this.activetab).then(function (data) {
            _this.orders = data;
            if (_this.orders.length) {
                _this.itemStatusDelivered = [];
                for (var i = 0; i < _this.orders.length; i++) {
                    if (_this.orders[i]) {
                        var itemStatusDelivered = {};
                        for (var k = 0; k < _this.orders[i].step.length; k++) {
                            var startTemp = [];
                            for (var l = 0; l < _this.orders[i].step[k].itemId.length; l++) {
                                startTemp.push(_this.orders[i].step[k].itemId[l].status);
                            }
                            itemStatusDelivered[_this.orders[i].step[k].step] = startTemp.every(_this.isEqualToOne);
                        }
                        _this.itemStatusDelivered[_this.orders[i]._id] = itemStatusDelivered;
                        for (var m = 0; m < _this.orders[i].step.length; m++) {
                            if (!_this.itemStatusDelivered[_this.orders[i]._id][_this.orders[i].step[m].step]) {
                                var temparray = _this.orders[i].step[m].step.split(' ');
                                var num = Number(temparray[1]);
                                var temp = {
                                    tab: num - 1,
                                    step: _this.orders[i].step[m].step,
                                };
                                _this.stepdata[_this.orders[i]._id] = temp;
                                break;
                            }
                        }
                    }
                }
            }
            _this.loadingOrders = false;
        })
            .catch(function (error) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], OrderListComponent.prototype, "orders", void 0);
    OrderListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-order-list',
            template: __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_websocket_service__["a" /* WebsocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* IterableDiffers */]) === "function" && _c || Object])
    ], OrderListComponent);
    return OrderListComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=order-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderListModule", function() { return OrderListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_list_component__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_list_routes__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_list_service__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_websocket_service__ = __webpack_require__("../../../../../src/app/service/websocket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__orderby__ = __webpack_require__("../../../../../src/app/hirundo/orderby.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var OrderListModule = /** @class */ (function () {
    function OrderListModule() {
    }
    OrderListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__order_list_routes__["a" /* OrderListRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__order_list_component__["a" /* OrderListComponent */], __WEBPACK_IMPORTED_MODULE_6__orderby__["a" /* OrderByPipe */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NO_ERRORS_SCHEMA */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__service_websocket_service__["a" /* WebsocketService */],
                __WEBPACK_IMPORTED_MODULE_4__order_list_service__["a" /* OrderListService */]
            ],
        })
    ], OrderListModule);
    return OrderListModule;
}());

//# sourceMappingURL=order-list.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_list_component__ = __webpack_require__("../../../../../src/app/hirundo/department/order-list/order-list.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__order_list_component__["a" /* OrderListComponent */] }
];
var OrderListRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=order-list.routes.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/order-list/order-list.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderListService = /** @class */ (function () {
    function OrderListService(http) {
        var _this = this;
        this.http = http;
        this.orderList = [];
        var url = '/api/department/orders';
        this.http.get(url).toPromise()
            .then(function (data) {
            var res = data.json();
            _this.orderList = res.data;
        })
            .catch(function (error) {
            _this.orderList = [];
        });
    }
    OrderListService.prototype.setOrder = function (data) {
        this.orderList.push(data);
    };
    OrderListService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.statusCode == 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            document.cookie = "token=" + '';
            window.location.href = '/';
        }
        if (body.hasOwnProperty('error')) {
            if (body.error.message === 'Token is required') {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('token');
                document.cookie = "token=" + '';
                window.location.href = '/';
            }
            else {
                return Promise.resolve(body || {});
            }
        }
        else {
            return Promise.resolve(body || {});
        }
    };
    OrderListService.prototype.handleErrorPromise = function (error) {
        var body = error.json();
        if (error.status === 401) {
            this.logout();
        }
        else if (error.status === 400 || error.status === 403) {
            return Promise.reject(body.message || error);
        }
        else {
            return Promise.reject(body.message || error);
        }
    };
    OrderListService.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        document.cookie = "token=" + '';
        window.location.href = '/';
    };
    OrderListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], OrderListService);
    return OrderListService;
    var _a;
}());

//# sourceMappingURL=order-list.service.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/orderby.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//The pipe class implements the PipeTransform interface's transform method that accepts an input value and an optional array of parameters and returns the transformed value.

//We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library.
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        if (typeof args[0] === "undefined") {
            return array;
        }
        var direction = args[0][0];
        var column = args.replace('-', '');
        array.sort(function (a, b) {
            var left = Number(new Date(a[column]));
            var right = Number(new Date(b[column]));
            return (direction === "-") ? right - left : left - right;
        });
        return array;
    };
    OrderByPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({
            //The @Pipe decorator takes an object with a name property whose value is the pipe name that we'll use within a template expression. It must be a valid JavaScript identifier. Our pipe's name is orderby.
            name: "orderby"
        })
    ], OrderByPipe);
    return OrderByPipe;
}());

//# sourceMappingURL=orderby.js.map

/***/ })

});
//# sourceMappingURL=order-list.module.chunk.js.map