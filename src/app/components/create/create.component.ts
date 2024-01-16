import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import  Filter from 'bad-words';

const filter = new Filter();
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  
  company_menu=this.dataservice.globalArray;
  blog:Blog=new Blog();
   tempCN!:string;
  tempIP!:string;
  OnSubmit() {
    if(this.tempCN==="Others")
    {
      this.dataservice.globalArray.push(this.tempIP);
      this.blog.companyName=this.tempIP;
    }
    else
    {
      this.blog.companyName=this.tempCN;
    }
   
    this.blog.writer=this.social_user.email;
    if(this.blog.description.split(" ").length<100)
        alert("Please write your experience atleast in 100 words.")
    else
    {
      
    if(filter.isProfane(this.blog.description))
        alert("You are not allowed to use any offensive words.");
    else
    {
      this.blogService.createBlog(this.blog).subscribe( data => {
      
        this.router.navigate(['/user/details']);
        
      },
        error => console.log(error)
        
      );
    }
    
  
  }
  }

  ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }

  }








social_user!:SocialUser;
    
    constructor(private dataservice:DataService ,private router: Router,private authService: AuthService,private blogService: BlogService){
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
