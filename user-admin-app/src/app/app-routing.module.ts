import { RouteActiveService } from './services/security/canActive/route-active.service';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActiveService } from './services/security/canActive/login-active.service';
import { AdminComponent } from './components/admin/admin.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[LoginActiveService]},
  {path:'register', component:RegisterComponent, canActivate:[LoginActiveService]},
  {path:'person', component:PersonComponent, canActivate:[RouteActiveService]},
  {path:'user', component:UserComponent, canActivate:[RouteActiveService]},
  {path:'admin', component:AdminComponent, canActivate:[RouteActiveService]},
  {path:'forbidden', component:ForbiddenComponent, canActivate:[RouteActiveService]},
  {path:"",redirectTo:"/login",pathMatch:'full'},
  {path:'**', redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
