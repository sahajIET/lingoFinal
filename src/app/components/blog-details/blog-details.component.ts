import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { LoginComponent } from '../login/login.component';
import { BlogService } from 'src/app/service/blog.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {


  id!:string;
  blog!:any;
  ngOnInit(): void {
    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.id=this.route.snapshot.params['id'];
    this.blog=new Blog();
    this.blogService.getBlogById(this.id).subscribe(data => {
      this.blog=data;
    })
  }

  // blog: Blog = {
    
  //     id:1,
      
  //     companyName:"Barclays",
  //     category:"internship",
  //     campus:"OnCampus",
  //     description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     date:(new Date()).toLocaleDateString('en-GB'),
  //     writer:"20bcs046@ietdavv.edu.in",
  //     linkedIn:"https://"
  // }



social_user!:SocialUser;

constructor(private router: Router,private authService: AuthService,private route : ActivatedRoute,private blogService: BlogService){
    
    this.social_user=this.authService.user;
}


isAuthorized()
    {
      return this.authService.isAuthorized();
    } 

    navigation()
  {
    this.router.navigate(['/badRequest']);
  }


}
