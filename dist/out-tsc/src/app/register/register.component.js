import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let RegisterComponent = class RegisterComponent {
    constructor(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
        this.confirmedPassword = "";
        this.emailExist = false;
        this.submitted = false;
        this.registerUserData = {
            email: "",
            password: ""
        };
    }
    ngOnInit() {
    }
    registerUser() {
        let regexpEmail = new RegExp('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)');
        let regexpPw = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$');
        this._auth.checkUser(this.registerUserData)
            .subscribe(res => {
            if (res.exist == true) {
                this.emailExist = true;
            }
            else {
                this.emailExist = false;
                if (regexpEmail.test(this.registerUserData.email) && regexpPw.test(this.registerUserData.password)
                    && this.confirmedPassword == this.registerUserData.password) {
                    this.finalizeRegistration();
                }
            }
        }, err => console.log(err));
    }
    finalizeRegistration() {
        this._auth.registerUser(this.registerUserData)
            .subscribe(res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this._router.navigate(['/host']);
        }, err => console.log(err));
    }
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map