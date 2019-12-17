import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let EventService = class EventService {
    constructor(http, _authService) {
        this.http = http;
        this._authService = _authService;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this._eventsUrl = 'api/events';
        this._hostedEventsUrl = 'api/host';
    }
    createEvent(event) {
        return this.http.post(this._eventsUrl, event);
    }
    updateEvent(event) {
        return this.http.put(this._eventsUrl, event);
    }
    getEvents() {
        return this.http.get(this._eventsUrl);
    }
    getHostedEvents() {
        return this.http.post(this._hostedEventsUrl, this._authService.getToken());
    }
};
EventService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], EventService);
export { EventService };
//# sourceMappingURL=event.service.js.map