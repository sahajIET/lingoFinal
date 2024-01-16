import { SocialUser, SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent{
  
  static socialUser: SocialUser;
  
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {

    
  }
  ngOnInit() {
    
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.user = user;

      if((user!=null)&&((user.email[0]=='1')||
            (user.email[0]=='2')||(user.email[0]=='3')||
            (user.email[0]=='4')||(user.email[0]=='5')||
            (user.email[0]=='6')||(user.email[0]=='7')||
            (user.email[0]=='8')||(user.email[0]=='9'))
            &&(user.email.split('@')[1]==='ietdavv.edu.in')
      )
      {
        this.router.navigate(['/user/landing']); 
      } 
      else
      {
        
        // if(user.email.split('@')[1]!=='ietdavv.edu.in')
        //     alert("Not Valid Email Id");
        // else if((user!=null)&&!((user.email[0]=='1')||
        // (user.email[0]=='2')||(user.email[0]=='3')||
        // (user.email[0]=='4')||(user.email[0]=='5')||
        // (user.email[0]=='6')||(user.email[0]=='7')||
        // (user.email[0]=='8')||(user.email[0]=='9'))
        // )
        // alert("Not Valid Email Id");
        this.router.navigate(['/unauthorized']);
        
        
      }
          
    });
  }


  isAuthorized()
  {
    return this.authService.isAuthorized();
  } 

  navigation()
  {
    this.router.navigate(['/user/landing'])
  }

  
}
