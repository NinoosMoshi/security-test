import { PersonComponent } from './components/person/person.component';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginInterceptorService } from './services/security/interceptor/login-interceptor.service';
import { AdminComponent } from './components/admin/admin.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserComponent,
    ForbiddenComponent,
    AdminComponent,
    PersonComponent,
    AdminAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:LoginInterceptorService, multi:true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
