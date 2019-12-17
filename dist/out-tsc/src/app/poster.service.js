import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let PosterService = class PosterService {
    constructor(http, _authService) {
        this.http = http;
        this._authService = _authService;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this._postersUrl = 'http://localhost:8080/api/posters';
        this._ownPostersUrl = 'http://localhost:8080/api/ownposters';
    }
    createPoster(poster) {
        return this.http.post(this._postersUrl, poster);
    }
    updatePoster(poster) {
        return this.http.put(this._postersUrl, poster);
    }
    getPosters() {
        return this.http.get(this._postersUrl);
    }
    getOwnPosters() {
        return this.http.post(this._ownPostersUrl, this._authService.getToken());
    }
};
PosterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PosterService);
export { PosterService };
//# sourceMappingURL=poster.service.js.map