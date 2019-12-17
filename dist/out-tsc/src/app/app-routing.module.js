import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostersComponent } from './posters/posters.component';
import { OwnPostersComponent } from './own-posters/own-posters.component';
import { CreatePosterComponent } from './create-poster/create-poster.component';
import { UpdatePosterComponent } from './update-poster/update-poster.component';
const routes = [
    {
        path: '',
        redirectTo: '/posters',
        pathMatch: 'full'
    },
    {
        path: 'posters',
        component: PostersComponent
    },
    {
        path: 'ownposters',
        component: OwnPostersComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'createposter',
        component: CreatePosterComponent
    },
    {
        path: 'updateposter',
        component: UpdatePosterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map