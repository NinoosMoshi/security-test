import { AuthenticationService } from './../../services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }


  isAuthenticated(){
     return this.authenticationService.isLogin();
  }

  isLogout(){
    this.router.navigateByUrl("/login")
    this.authenticationService.logout();
  }

  isPerson(){
    return this.authenticationService.getRole() == "ROLE_USER"
  }

  isAdmin(){
    return this.authenticationService.getRole() == "ROLE_ADMIN"
  }


}
