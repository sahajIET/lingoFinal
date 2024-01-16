import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { BadRequestComponent } from './components/bad-request/bad-request.component';
import { CreateComponent } from './components/create/create.component';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { UpdateComponent } from './components/update/update.component';
import { QuestionHomeComponent } from './components/question-home/question-home.component';
import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { QuestionViewComponent } from './components/question-view/question-view.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionUpdateComponent } from './components/question-update/question-update.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { BlogReportComponent } from './components/blog-report/blog-report.component';


const routes: Routes = [

  
  {path:'',component:LoginComponent},
  { path:'user',
      children:[
        { path:'',component:LandingPageComponent},
        { path:'landing',component:LandingPageComponent},
        {path:'details',component:UserComponent},
        {path:'create',component:CreateComponent},
        {path:'myblogs',component:UserBlogComponent},
        {path:'blog-details/:id',component:BlogDetailsComponent},
        {path:'update/:id',component:UpdateComponent},
        {path:'question-home',component:QuestionHomeComponent},
        {path:'question-home/share',component:QuestionCreateComponent},
        {path:'question-home/view',component:QuestionViewComponent},
        {path:'question-home/question-details/:id',component:QuestionDetailsComponent},
        {path:'question-home/question-edit/:id',component:QuestionUpdateComponent},
        {path:'report',component:BlogReportComponent}
      ]
},
  
  { path:'unauthorized', component:UnauthorizedComponent },
  { path:'badRequest',component:BadRequestComponent},
 
  {path:'**',component:NoContentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabledBlocking'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
