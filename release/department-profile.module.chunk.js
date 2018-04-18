webpackJsonp(["department-profile.module"],{

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid profile-container\">\r\n    <div class=\"alert-danger\" *ngIf=\"error\">{{errorMsg}}</div>\r\n    <div class=\"alert-success\" *ngIf=\"success\">{{successMsg}}</div>\r\n    <div class=\"card\" *ngIf=\"ProfileData\">\r\n\r\n        \r\n        <div class=\"view hm-white-slight waves-light\" mdbRippleRadius>\r\n            <img *ngIf=\"!previewImage && !ProfileData.picture.original\" src=\"assets/images/profile-placeholder.jpg\" class=\"img-fluid\"\r\n                alt=\"\">\r\n            <img *ngIf=\"previewImage\" [src]=\"previewImage\" class=\"img-fluid\" alt=\"\">\r\n            <img *ngIf=\"!previewImage && ProfileData.picture.original\" [src]=\"ProfileData.picture.original\" class=\"img-fluid\" alt=\"\">\r\n            <a>\r\n                <div class=\"mask\"></div>\r\n            </a>\r\n        </div>\r\n        <div class=\"btn-container d-flex justify-content-between\">\r\n            <label class=\"cabinet btn\">\r\n                <i class=\"far fa-image\"></i>\r\n                <input type=\"file\" #myInput name=\"myImage\" accept=\"image/*\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload file...\"\r\n                />\r\n            </label>            \r\n            <button type=\"submit\" class=\"btn btn-default waves-light\" mdbRippleRadius (click)=\"uploadProfilePic()\" ng-disabled=\"uploadPicRequest\">\r\n                <i class=\"fas fa-upload\"></i>\r\n            </button>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <form [formGroup]=\"profileForm\" (ngSubmit)=\"updateProfile(profileForm.value)\">\r\n                <div class=\"md-form\">\r\n                    <i class=\"fa fa-user-o prefix grey-text\"></i>\r\n                    <input type=\"text\" id=\"firstName\" name=\"firstName\" formControlName=\"firstName\" class=\"form-control\" mdbActive>\r\n                    <label for=\"Name\">Name</label>\r\n                </div>\r\n                <div class=\"text-center\">\r\n                    <button type=\"submit\" class=\"btn btn-default waves-light\" mdbRippleRadius [disabled]=\"!profileForm.valid || activeRequest\">Update</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__department_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_guard_auth_guard__ = __webpack_require__("../../../../../src/app/shared/guard/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DepartmentProfileComponent = /** @class */ (function () {
    function DepartmentProfileComponent(profileService, authGuard) {
        this.profileService = profileService;
        this.authGuard = authGuard;
        this.User = {};
        this.activeRequest = false;
        this.error = false;
        this.errorMsg = '';
        this.success = false;
        this.successMsg = '';
        this.uploadPicRequest = false;
        this.previewImage = '';
    }
    DepartmentProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getCurrentUser().then(function (data) {
            _this.ProfileData = data.data;
            if (_this.ProfileData) {
                _this.createProfileForm();
            }
        }).catch(function (error) {
            console.log("error", error);
        });
    };
    DepartmentProfileComponent.prototype.createProfileForm = function () {
        this.profileForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](this.ProfileData.firstName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
        });
    };
    DepartmentProfileComponent.prototype.updateProfile = function (user) {
        var _this = this;
        this.activeRequest = true;
        this.User.firstName = user.firstName;
        this.profileService.updateProfile(this.User).then(function (data) {
            _this.activeRequest = false;
            window.scrollTo(0, 0);
            _this.ProfileData = data.data;
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            if (_this.ProfileData) {
                _this.createProfileForm();
            }
            _this.success = true;
            _this.successMsg = data.message;
            setTimeout(function () {
                _this.success = false;
                _this.successMsg = '';
            }, 4000);
        }).catch(function (error) {
            window.scrollTo(0, 0);
            _this.activeRequest = false;
            _this.error = true;
            _this.errorMsg = error;
            setTimeout(function () {
                _this.error = false;
                _this.errorMsg = '';
            }, 4000);
        });
    };
    DepartmentProfileComponent.prototype.uploadProfilePic = function () {
        var _this = this;
        var opts = {
            picture: this.profilePic
        };
        this.uploadPicRequest = true;
        this.profileService.updateProfilePicture(opts).then(function (data) {
            window.scrollTo(0, 0);
            _this.uploadPicRequest = false;
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            _this.profilePic = '';
            _this.myInputVariable.nativeElement.value = "";
            _this.success = true;
            _this.successMsg = data.message;
            setTimeout(function () {
                _this.success = false;
                _this.successMsg = '';
            }, 4000);
        }).catch(function (error) {
            window.scrollTo(0, 0);
            _this.uploadPicRequest = false;
            _this.error = true;
            _this.errorMsg = error;
            setTimeout(function () {
                _this.error = false;
                _this.errorMsg = '';
            }, 4000);
        });
    };
    DepartmentProfileComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.previewImage = e.target.result;
                var datauri = e.target.result.split(',')[1];
                var binary = atob(datauri);
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                //Convert the binary format of image into image file object to upload
                _this.profilePic = new File([new Uint8Array(array)], 'profile_pic.jpg', {
                    type: 'image/jpg'
                });
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], DepartmentProfileComponent.prototype, "myInputVariable", void 0);
    DepartmentProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__department_profile_service__["a" /* DepartmentProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__department_profile_service__["a" /* DepartmentProfileService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object])
    ], DepartmentProfileComponent);
    return DepartmentProfileComponent;
    var _a, _b;
}());

//# sourceMappingURL=department-profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentProfileModule", function() { return DepartmentProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__department_profile_component__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__department_profile_routes__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__department_profile_service__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DepartmentProfileModule = /** @class */ (function () {
    function DepartmentProfileModule() {
    }
    DepartmentProfileModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__department_profile_routes__["a" /* DepartmentProfileRouting */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular_bootstrap_md__["a" /* MDBBootstrapModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__department_profile_component__["a" /* DepartmentProfileComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__department_profile_service__["a" /* DepartmentProfileService */]
            ]
        })
    ], DepartmentProfileModule);
    return DepartmentProfileModule;
}());

//# sourceMappingURL=department-profile.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/department/department-profile/department-profile.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentProfileRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__department_profile_component__ = __webpack_require__("../../../../../src/app/hirundo/department/department-profile/department-profile.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__department_profile_component__["a" /* DepartmentProfileComponent */] }
];
var DepartmentProfileRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=department-profile.routes.js.map

/***/ })

});
//# sourceMappingURL=department-profile.module.chunk.js.map