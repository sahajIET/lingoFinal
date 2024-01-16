import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {


  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  social_user!:SocialUser;
    
    constructor(private route:ActivatedRoute ,private router: Router,private authService: AuthService,private socialAuthService: SocialAuthService){
        
        this.social_user=authService.user
    }

    logout(): void {
      
      this.authService.signOut();
      console.log(this.route);
      
      
    }
}
