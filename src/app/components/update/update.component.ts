import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import  Filter from 'bad-words';

const filter = new Filter();
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  blog!:any;
  id!:string;
  tempCN!:string;
  tempIP!:string;
  company_menu=this.dataservice.globalArray;
  OnSubmit() {
   
    if(this.tempCN!=="Others")
    this.blog[0].companyName=this.tempCN;
    
    if(this.blog[0].description.split(" ").length<100)
      alert("Please write your experience atleast in 100 words.");
    else
    {
      if(filter.isProfane(this.blog[0].description))
        alert("You are not allowed to use any offensive words.");
      else
      {
        this.blogService.updateBlog(this.id,this.blog[0]).subscribe(data => {
          this.router.navigate(['/user/details']);
          
        }, error => console.log(error));
      }
    }

    
  }

  ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.id=this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe(data => {
      this.blog=data;
      console.log(data);
      this.tempCN=this.blog[0].companyName;
      console.log(this.tempCN);
      
    },error => console.log(error));

  }



  navigation()
  {
    this.router.navigate(['/badRequest']);
  }





social_user!:SocialUser;
   
    constructor(private dataservice: DataService, private router: Router,private authService: AuthService,private blogService: BlogService,private route: ActivatedRoute){
        
        this.social_user=this.authService.user;
    }


    


    isAuthorized()
    {
      return this.authService.isAuthorized();
    } 


}
