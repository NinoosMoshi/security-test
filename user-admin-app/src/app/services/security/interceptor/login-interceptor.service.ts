import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if(this.authenticationService.getEmail() && this.authenticationService.getToken()){
     req = req.clone({
      setHeaders:{
        Authorization:this.authenticationService.getToken()
      }
     })
   }

    return next.handle(req);
  }

}
