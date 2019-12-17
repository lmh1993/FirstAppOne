import * as tslib_1 from "tslib";
import { Component, LOCALE_ID, Inject } from '@angular/core';
let PostersComponent = class PostersComponent {
    constructor(locale, _posterService) {
        this.locale = locale;
        this._posterService = _posterService;
        this.posters = [];
    }
    ngOnInit() {
        this._posterService.getPosters()
            .subscribe(res => this.posters = res, err => console.log(err));
    }
};
PostersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-posters',
        templateUrl: './posters.component.html',
        styleUrls: ['./posters.component.css']
    }),
    tslib_1.__param(0, Inject(LOCALE_ID))
], PostersComponent);
export { PostersComponent };
//# sourceMappingURL=posters.component.js.map