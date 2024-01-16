import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent {
  myquestions!:any;
  navigation()
  {
    this.router.navigate(['/badRequest']);
  }
  isAuthorized()
  {
    return this.authService.isAuthorized();
  } 
  social_user!:SocialUser;
  constructor(private router: Router,private authService: AuthService,private questionService: QuestionService){
    this.social_user=this.authService.user;
}
ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.questionService.getQuestionByEmail(this.social_user.email).subscribe(data => {
      this.myquestions=data;
    })
  }
  deleteQuestion(id : string){
    this.questionService.deleteQuestion(id).subscribe(data => {
      console.log(data);
      location.reload();
      
    })
  }

}
