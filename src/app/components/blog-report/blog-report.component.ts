import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-report',
  templateUrl: './blog-report.component.html',
  styleUrls: ['./blog-report.component.scss']
})




export class BlogReportComponent {


  data:any;
  dataCname:any[]=[];
  dataLike:any[]=[];
  dataView:any[]=[];
  data2:any;
  dataCampus:any[]=["OnCampus","OffCampus"];
  dataCCampus:number[]=[];
  data3:any;
  dataCategory:any[]=["InternAndFTE","Full-time","Intern"];
  dataCCategory:number[]=[];

  ngOnInit(){
    if (!this.authService.user) {
      // User is not logged in, handle this 
      this.router.navigate(['/badRequest'])
    }
    this.blogService.getBlogsList().subscribe(res => {
      this.data=res;
      if(this.data!=null)
      {
         for(let i=0;i<this.data[0].length;i++)
         {
            this.dataCname.push(this.data[0][i].companyName);
            this.dataLike.push(this.data[0][i].likes);
            this.dataView.push(this.data[0][i].views);
         }
      }
      this.showData1(this.dataCname,this.dataLike);
      this.showData2(this.dataCname,this.dataView);
    });

    for(let a=0;a<2;a++)
    {
      this.blogService.getBlogByFilter("","",this.dataCampus[a],"").subscribe(data => {
        this.data2=data;
        
        this.dataCCampus.push(this.data2[0].length);
        
        
      });
     
      
      
    }
    
    for(let a=0;a<3;a++)
    {
      this.blogService.getBlogByFilter("",this.dataCategory[a],"","").subscribe(data => {
        this.data3=data;
        
        this.dataCCategory.push(this.data3[0].length);
        
        
      });
     
      
      
    }
    
  }
  constructor(private router: Router,private authService: AuthService,private blogService:BlogService){
         
  }
  showData1(dataCname:any,dataLike:any)
  {
    new Chart('myChart', {
      type: 'pie',
      data: {
        labels: dataCname,
        datasets: [{
          label: 'Most Liked',
          data: dataLike,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  showData2(dataCname:any,dataView:any)
  {
    new Chart('myChart2', {
      type: 'line',
      data: {
        labels: dataCname,
        datasets: [{
          label: 'Most Viewed',
          data: dataView,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.showData3(this.dataCCampus);
    this.showData4(this.dataCCategory);
    console.log(this.dataCCampus);
    console.log(this.dataCCategory);
    
    
  }
  showData3(dataCCampus:any)
  {
    new Chart('myChart3', {
      type: 'bar',
      data: {
        labels: this.dataCampus,
        datasets: [{
          label: 'Campus',
          data: dataCCampus,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
  }
  showData4(dataCCategory:any)
  {
    new Chart('myChart4', {
      type: 'bar',
      data: {
        labels: this.dataCategory,
        datasets: [{
          label: 'Category',
          data: dataCCategory,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
