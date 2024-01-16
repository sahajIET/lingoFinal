import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent {


  myblogs!:any;
  ngOnInit()
  {
    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.blogService.getBlogByEmail(this.social_user.email).subscribe(data => {
      this.myblogs=data;
    })
  }
  


  deleteBlog(id : string){
    this.blogService.deleteBlog(id).subscribe(data => {
      console.log(data);
      location.reload();
      
    })
  }




  social_user!:SocialUser;
  
  constructor(private router: Router,private authService: AuthService,private blogService: BlogService){
      
      this.social_user=this.authService.user;
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
