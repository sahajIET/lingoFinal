import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-home',
  templateUrl: './question-home.component.html',
  styleUrls: ['./question-home.component.scss']
})
export class QuestionHomeComponent {

  question!:any;
  filter_category:string="";
  filter_campus:string="";
  filter_round:string="";
  filter_companyName:string="";
  Cards=true;
  company_menu=this.dataservice.globalArray;
  social_user!:SocialUser;
  ngOnInit()
  {
    this.getQuestionsByFilter();
    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }

  }
  private getQuestionsByFilter(){
    this.questionService.getQuestionByFilter(this.filter_companyName,this.filter_category,this.filter_campus,this.filter_round).subscribe(data => {
      console.log(data);
      this.Cards=true;
      this.question=data;
    },
        error => this.Cards=false
        
     );
}
  search(){
    
    this.getQuestionsByFilter();
  }
  // likePost(postid:string,q:any) {
  //   this.questionService.likeBlog(postid)
  //     .subscribe(response => {
  //       // Handle the response if needed
        
  //       console.log('Post liked successfully!', response);
  //       q.likes=response.likes;
  //     });
      
    
  // }

  // dislikePost(postid:string,q:any) {
  //   this.questionService.dislikeBlog(postid)
  //     .subscribe(response => {
  //       // Handle the response if needed
        
  //       console.log('Post disliked successfully!', response);
  //       q.likes=response.likes;
  //     }); 
  // }
  toggleLike(postid:string,b:any) {
    console.log(postid);
    console.log(this.social_user.id);
    
    this.questionService.toggleLike(postid, this.social_user.id).subscribe(response => {
      b.likes = response.likes;
      console.log(response);
      
    });
  }
  view(postid:string,b:any)
{
  console.log(postid);
  
  this.questionService.view(postid).subscribe(response => {
    b.views=response.views;
  })
}
  Onload(){
    location.reload();
  }
  constructor(private dataservice:DataService ,private router: Router,private authService: AuthService,private questionService:QuestionService){
         this.social_user=authService.user;
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
