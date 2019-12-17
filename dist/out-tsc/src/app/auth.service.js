import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor(http, _router) {
        this.http = http;
        this._router = _router;
        this._registerUrl = "http://localhost:8080/api/register";
        this._checkUserUrl = "http://localhost:8080/api/usercheck";
        this._loginUrl = "http://localhost:8080/api/login";
    }
    registerUser(user) {
        return this.http.post(this._registerUrl, user);
    }
    checkUser(user) {
        return this.http.post(this._checkUserUrl, user);
    }
    loginUser(user) {
        return this.http.post(this._loginUrl, user);
    }
    //only return true of false to indicate whether the token exists.
    loggedIn() {
        return !!localStorage.getItem('token');
    }
    logoutUser() {
        localStorage.removeItem('token');
        this._router.navigate(['/events']);
    }
    getToken() {
        return localStorage.getItem('token');
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map