import { Component, OnInit } from '@angular/core';
import  {LoginComponent}  from '../login/login.component';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  
  ngOnInit()
  {
      if (!this.authService.user) {
        // User is not logged in, handle this 
        this.router.navigate(['/badRequest'])
      }

  }
  constructor(private router: Router,private authService: AuthService){
         
    }
    navigation()
    {
      this.router.navigate(['/badRequest']);
    }
    isAuthorized()
    {
      return this.authService.isAuthorized();
    } 
}
