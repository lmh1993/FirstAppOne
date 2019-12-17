import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CreatePosterComponent = class CreatePosterComponent {
    constructor(_authService, _posterService, _router) {
        this._authService = _authService;
        this._posterService = _posterService;
        this._router = _router;
        this.submitted = false;
        this.poster = {
            title: "",
            description: "",
            token: ""
        };
    }
    ngOnInit() {
    }
    createPoster() {
        this.poster.token = this._authService.getToken();
        if (this.poster.title.length > 0 && this.poster.description.length > 0) {
            this._posterService.createPoster(this.poster)
                .subscribe(res => {
                console.log(res);
                this._router.navigate(['/ownposters']);
            }, err => console.log(err));
        }
    }
};
CreatePosterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-create-poster',
        templateUrl: './create-poster.component.html',
        styleUrls: ['./create-poster.component.css']
    })
], CreatePosterComponent);
export { CreatePosterComponent };
//# sourceMappingURL=create-poster.component.js.map