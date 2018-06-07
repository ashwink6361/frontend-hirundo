webpackJsonp(["profile.module"],{

/***/ "../../../../../src/app/hirundo/waiter/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid profile-container\">\n    <div class=\"alert-danger\" *ngIf=\"error\">{{errorMsg}}</div>\n    <div class=\"alert-success\" *ngIf=\"success\">{{successMsg}}</div>\n    <div class=\"card\" *ngIf=\"ProfileData\">\n        <div class=\"view hm-white-slight waves-light\" mdbRippleRadius>\n            <img *ngIf=\"!previewImage && !ProfileData.picture.original\" src=\"assets/images/profile-placeholder.jpg\" class=\"img-fluid\"\n                alt=\"\">\n            <img *ngIf=\"previewImage\" [src]=\"previewImage\" class=\"img-fluid\" alt=\"\">\n            <img *ngIf=\"!previewImage && ProfileData.picture.original\" [src]=\"ProfileData.picture.original\" class=\"img-fluid\" alt=\"\">\n            <a>\n                <div class=\"mask\"></div>\n            </a>\n        </div>\n        <div class=\"btn-container d-flex justify-content-between\">\n            <label class=\"cabinet btn\">\n                <i class=\"far fa-image\"></i>\n                <input type=\"file\" class=\"file\" #myInput name=\"myImage\" accept=\"image/*\" (change)=\"fileChangeEvent($event)\" placeholder=\"Upload file...\"\n                />\n            </label>\n            <button type=\"submit\" class=\"btn btn-default waves-light\" mdbRippleRadius (click)=\"uploadProfilePic()\" ng-disabled=\"uploadPicRequest\">\n                <i class=\"fas fa-upload\"></i>\n            </button>\n        </div>\n        <div class=\"card-body\">\n            <form [formGroup]=\"profileForm\" (ngSubmit)=\"updateProfile(profileForm.value)\">\n                <div class=\"md-form\">\n                    <i class=\"fa fa-user-o prefix grey-text\"></i>\n                    <input type=\"text\" id=\"firstName\" name=\"firstName\" formControlName=\"firstName\" class=\"form-control\" mdbActive>\n                    <label for=\"Name\">First Name</label>\n                </div>\n                <div class=\"md-form\">\n                    <i class=\"fa fa-user-o prefix grey-text\"></i>\n                    <input type=\"text\" id=\"lastName\" name=\"lastName\" formControlName=\"lastName\" class=\"form-control\" mdbActive>\n                    <label for=\"Name\">Last Name</label>\n                </div>\n                <div class=\"text-center\">\n                    <button type=\"submit\" class=\"btn btn-default waves-light\" mdbRippleRadius [disabled]=\"!profileForm.valid || activeRequest\">Update</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_service__ = __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.service.ts");
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




var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService, authGuard) {
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
    ProfileComponent.prototype.ngOnInit = function () {
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
    ProfileComponent.prototype.createProfileForm = function () {
        this.profileForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](this.ProfileData.firstName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
            lastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](this.ProfileData.lastName, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required),
        });
    };
    ProfileComponent.prototype.updateProfile = function (user) {
        var _this = this;
        this.activeRequest = true;
        this.User.firstName = user.firstName;
        this.User.lastName = user.lastName;
        this.profileService.updateProfile(this.User).then(function (data) {
            window.scrollTo(0, 0);
            _this.activeRequest = false;
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
    ProfileComponent.prototype.fileChangeEvent = function (fileInput) {
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
    ProfileComponent.prototype.uploadProfilePic = function () {
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], ProfileComponent.prototype, "myInputVariable", void 0);
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__profile_service__["a" /* ProfileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__profile_service__["a" /* ProfileService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_guard_auth_guard__["a" /* AuthGuard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_guard_auth_guard__["a" /* AuthGuard */]) === "function" && _b || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/profile/profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular_bootstrap_md__ = __webpack_require__("../../../../angular-bootstrap-md/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_routes__ = __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__profile_routes__["a" /* ProfileRouting */],
                __WEBPACK_IMPORTED_MODULE_4_angular_bootstrap_md__["a" /* MDBBootstrapModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* ReactiveFormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__profile_component__["a" /* ProfileComponent */]]
        })
    ], ProfileModule);
    return ProfileModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ "../../../../../src/app/hirundo/waiter/profile/profile.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_component__ = __webpack_require__("../../../../../src/app/hirundo/waiter/profile/profile.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__profile_component__["a" /* ProfileComponent */] }
];
var ProfileRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=profile.routes.js.map

/***/ })

});
//# sourceMappingURL=profile.module.chunk.js.map