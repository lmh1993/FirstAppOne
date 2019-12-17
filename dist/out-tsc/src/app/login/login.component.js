import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
        this.loginUserData = {
            email: "",
            password: ""
        };
    }
    ngOnInit() {
    }
    loginUser() {
        this.loginFail = false;
        this._auth.loginUser(this.loginUserData)
            .subscribe(res => {
            localStorage.setItem('token', res.token);
            this._router.navigate(['/ownposters']);
        }, err => {
            this.loginFail = true;
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map