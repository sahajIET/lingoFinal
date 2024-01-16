import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.scss']
})
export class QuestionUpdateComponent {
  question!:any;
  id!:string;
  sam_data!:string[];
  tempCN!:string;
  tempIP!:string;
  company_menu=this.dataservice.globalArray;
  // updateSamData(index: number, value: string) {
  //   this.sam_data[index] = value;
//}

  questionForm: FormGroup;
  
  
    get questionControls() {
      return (this.questionForm.get('questions') as FormArray).controls as FormControl[];
    }


  OnSubmit() {
    //this.question[0].question_arr=this.sam_data;
    if(this.tempCN!=="Others")
    this.question[0].companyName=this.tempCN;
    const questionValues = this.questionControls.map(control => control.value);
    console.log(questionValues);
    let a=false;
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
      this.question[0].question_arr=questionValues;
    
      this.questionService.updateQuestion(this.id,this.question[0]).subscribe(data => {
        this.router.navigate(['/user/question-home']);
        
      }, error => console.log(error));
    }
    
  }

  ngOnInit()
  {

    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.id=this.route.snapshot.params['id'];
    this.questionService.getQuestionById(this.id).subscribe(data => {
      this.question=data;
      console.log(data);
      this.sam_data=this.question[0].question_arr;
      console.log(this.sam_data);
      // for (let index = 0; index < this.sam_data.length; index++) {
        
      //   const questionArray = this.questionForm.get('questions') as FormArray;
      //   questionArray.push(this.fb.control(''));
      // }
      this.tempCN=this.question[0].companyName;
      console.log(this.tempCN);
      const questionControls = this.sam_data.map(question => this.fb.control(question));
      (this.questionForm.get('questions') as FormArray).controls.push(...questionControls);
  
    },error => console.log(error));
  }



  navigation()
  {
    this.router.navigate(['/badRequest']);
  }





social_user!:SocialUser;
   
    constructor(private dataservice:DataService ,private router: Router,private authService: AuthService,private questionService: QuestionService,private route: ActivatedRoute,private fb: FormBuilder){
        
        this.social_user=this.authService.user;
        this.questionForm = this.fb.group({
          questions: this.fb.array([]),
        });
    }


    


    isAuthorized()
    {
      return this.authService.isAuthorized();
    } 

}
