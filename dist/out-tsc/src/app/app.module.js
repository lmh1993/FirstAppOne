import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeAu from '@angular/common/locales/en-AU';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostersComponent } from './posters/posters.component';
import { OwnPostersComponent } from './own-posters/own-posters.component';
import { CreatePosterComponent } from './create-poster/create-poster.component';
import { UpdatePosterComponent } from './update-poster/update-poster.component';
import { PosterService } from './poster.service';
registerLocaleData(localeAu, 'en-AU');
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            RegisterComponent,
            LoginComponent,
            DashboardComponent,
            PostersComponent,
            OwnPostersComponent,
            CreatePosterComponent,
            UpdatePosterComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule
        ],
        providers: [{ provide: LOCALE_ID, useValue: 'en-AU' },
            { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
            AuthService,
            EventService,
            PosterService,
            AuthGuard],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map