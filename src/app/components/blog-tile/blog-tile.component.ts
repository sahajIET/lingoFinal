import { SocialUser } from '@abacritt/angularx-social-login/entities/social-user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-blog-tile',
  templateUrl: './blog-tile.component.html',
  styleUrls: ['./blog-tile.component.scss']
})
export class BlogTileComponent {

  blog!: any;
  filter_category:string="";
  filter_campus:string="";
  filter_round:string="";
  filter_companyName:string="";
  Cards=true;
  isLiked=false;
  company_menu=this.dataservice.globalArray;
  isActive: boolean = false;
  social_user!:SocialUser;
  constructor(private dataservice:DataService,private blogService: BlogService,private authService:AuthService){
    this.social_user=authService.user
  }

  ngOnInit(): void{
    this.getBlogsByFilter();
    
  }

  private getBlogs(){
    this.blogService.getBlogsList().subscribe(data => {
      
      
      
      this.blog=data;
      
      
      
    })
  }

 
  // likePost(postid:string,b:any) {
    
  //   this.blogService.likeBlog(postid)
  //     .subscribe(response => {
  //       // Handle the response if needed
        
      
  //       console.log('Post liked successfully!', response);
  //       b.likes=response.likes;
  //     });
      
    
  // }

  // dislikePost(postid:string,b:any) {
  //   this.blogService.dislikeBlog(postid)
  //     .subscribe(response => {
  //       // Handle the response if needed
        
  //       console.log('Post disliked successfully!', response);
  //       b.likes=response.likes;
  //     }); 
  // }
  toggleLike(postid:string,b:any) {
    this.isActive = !this.isActive;
    console.log(postid);
    console.log(this.social_user.id);
    
    this.blogService.toggleLike(postid, this.social_user.id).subscribe(response => {
      b.likes = response.likes;
      console.log(response);
      console.log(b.likesArray);
      
    });
  }
view(postid:string,b:any)
{
  console.log(postid);
  
  this.blogService.view(postid).subscribe(response => {
    b.views=response.views;
  })
}
  private getBlogsByFilter(){
      this.blogService.getBlogByFilter(this.filter_companyName,this.filter_category,this.filter_campus,this.filter_round).subscribe(data => {
        console.log(data);
        this.Cards=true;
        this.blog=data;
        
      },
          error => this.Cards=false
          
       );
  }

  search(){
    
    this.getBlogsByFilter();
  }

  Onload(){
    location.reload();
  }
 

  
  // blog: Blog[] = [
  //   {
  //     id:1,
     
  //     companyName:"Barclays",
  //     category:"internship",
  //     campus:"OnCampus",
  //     description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     date:(new Date()).toLocaleDateString('en-GB'),
  //     writer:"20bcs046@ietdavv.edu.in",
  //     linkedIn:"https://"
  //   },
  //   {
  //     id:2,
     
  //     companyName:"Deutsche Bank",
  //     category:"full-time",
  //     campus:"OnCampus",
  //     description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     date:(new Date()).toLocaleDateString('en-GB'),
  //     writer:"20bcs053@ietdavv.edu.in",
  //     linkedIn:"https://"
  //   },
  //   {
  //     id:3,
     
  //     companyName:"ZScaler",
  //     category:"full-time",
  //     campus:"OffCampus",
  //     description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     date:(new Date()).toLocaleDateString('en-GB'),
  //     writer:"20bcs035@ietdavv.edu.in",
  //     linkedIn:"https://"
  //   },
  //   {
  //     id:4,
     
  //     companyName:"Credit-Suisse",
  //     category:"internship",
  //     campus:"OffCampus",
  //     description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     date:(new Date()).toLocaleDateString('en-GB'),
  //     writer:"20bcs143@ietdavv.edu.in",
  //     linkedIn:"https://"
  //   }

  // ];

  
  
  
}
