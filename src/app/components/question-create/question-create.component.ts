import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { Question } from 'src/app/model/question';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';
import { DataService } from 'src/app/service/data.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent {

  questionForm: FormGroup;
  company_menu=this.dataservice.globalArray;
   tempCN!:string;
  tempIP!:string;
  
  get questionControls() {
    return (this.questionForm.get('questions') as FormArray).controls as FormControl[];
  }

  addQuestion() {
    const questionArray = this.questionForm.get('questions') as FormArray;
    questionArray.push(this.fb.control(''));
  }


















    ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }

  }
  
  
  navigation()
  {
    this.router.navigate(['/badRequest']);
  }
  isAuthorized()
  {
    return this.authService.isAuthorized();
  } 

  question:Question=new Question();
  OnSubmit() {
    if(this.tempCN==="Others")
    {
      this.dataservice.globalArray.push(this.tempIP);
      this.question.companyName=this.tempIP;
    }
    else
    {
      this.question.companyName=this.tempCN;
    }
    let a=false;
    const questionValues = this.questionControls.map(control => control.value);
    if(questionValues.length==0)
      alert("Please Add Question");
      if(questionValues.length>0)
      {
        for (let index = 0; index < questionValues.length; index++) {
          if(questionValues[index].length<10)
          {
            alert("Please write the question atleast more than 10 characters");
            a=true;
          }
  
        }
      }
    if(a==false)
    {
      console.log(questionValues);
      this.question.question_arr=questionValues;
      this.question.writer=this.social_user.email;
      this.questionService.createQuestion(this.question).subscribe( data => {
        
        this.router.navigate(['/user/question-home']);
        
      },
        error => { alert("Kindly fill all required fields");console.log(error);
        }
        
      );
    }

}










social_user!:SocialUser;
    
    constructor(private dataservice:DataService ,private router: Router,private authService: AuthService,private questionService: QuestionService,private fb: FormBuilder){
        this.social_user=this.authService.user; 
        this.questionForm = this.fb.group({
          questions: this.fb.array([]),
        });
       }
}
