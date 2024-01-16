import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { Question } from 'src/app/model/question';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent {
  id!:string;
  question!:any;
  ngOnInit(): void {
    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.id=this.route.snapshot.params['id'];
    this.question=new Question();
    this.questionService.getQuestionById(this.id).subscribe(data => {
      this.question=data;
    })
  }




social_user!:SocialUser;

constructor(private router: Router,private authService: AuthService,private route : ActivatedRoute,private questionService: QuestionService){
    
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
