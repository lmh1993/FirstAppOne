import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
let TokenInterceptorService = class TokenInterceptorService {
    constructor(injector) {
        this.injector = injector;
    }
    intercept(req, next) {
        let authService = this.injector.get(AuthService);
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `bearer ${authService.getToken()}`
            }
        });
        return next.handle(tokenizedReq);
    }
};
TokenInterceptorService = tslib_1.__decorate([
    Injectable()
], TokenInterceptorService);
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map