import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.scss']
})
export class QuestionHeaderComponent {
  ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }

  }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  social_user!:SocialUser;
    
    constructor(private router: Router,private authService: AuthService,private socialAuthService: SocialAuthService){
        
        this.social_user=authService.user
    }

    logout(): void {
      
      this.authService.signOut();
      
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
