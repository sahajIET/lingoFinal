import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent {

  user!:SocialUser;
  back_var=false;
  year=(new Date()).getFullYear();

  @HostListener("document:scroll")
  scrollfunction()
  {
    if(document.body.scrollTop>0||document.documentElement.scrollTop>0)
    this.back_var=true;
    else
    this.back_var=false;
  }


  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor(private router:Router,private authService:AuthService){
    this.user=this.authService.user;
  }
  logout(): void {
      
    this.authService.signOut();
    
  }
  isAuthorized()
  {
    return this.authService.isAuthorized()
  }
  navigation()
  {
    this.router.navigate(['/badRequest'])
  }
  
}
