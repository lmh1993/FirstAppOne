import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostersComponent } from './posters/posters.component';
import { OwnPostersComponent } from './own-posters/own-posters.component';
import { CreatePosterComponent } from './create-poster/create-poster.component';
import { UpdatePosterComponent } from './update-poster/update-poster.component';
import { PosterDetailComponent } from './poster-detail/poster-detail.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: '/posters',
    pathMatch:'full'
  },
  {
    path: 'posters',
    component: PostersComponent
  },
  {
    path:'posters/:showcase',
    component: PostersComponent
  },
  {
    path:'ownposters',
    component: OwnPostersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'createposter',
    component: CreatePosterComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'readposter/:id',
    component: PosterDetailComponent
  },
  {
    path:'updateposter/:id',
    component: UpdatePosterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent

  },
  {
    path:'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
