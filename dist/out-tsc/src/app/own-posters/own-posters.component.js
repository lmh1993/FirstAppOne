import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
let OwnPostersComponent = class OwnPostersComponent {
    constructor(_posterService, _router) {
        this._posterService = _posterService;
        this._router = _router;
        this.ownPosters = [];
    }
    ngOnInit() {
        this._posterService.getOwnPosters()
            .subscribe(res => this.ownPosters = res, err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this._router.navigate(['/login']);
                }
            }
        });
    }
};
OwnPostersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-own-posters',
        templateUrl: './own-posters.component.html',
        styleUrls: ['./own-posters.component.css']
    })
], OwnPostersComponent);
export { OwnPostersComponent };
//# sourceMappingURL=own-posters.component.js.map