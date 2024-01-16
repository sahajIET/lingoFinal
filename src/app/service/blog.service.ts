import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseURL="http://localhost:8000/blogs";
  private searchURL="http://localhost:8000/blog";
  private emailURL="http://localhost:8000/Email";
  private apiUrl = 'http://localhost:8000/api/likes';
  constructor(private httpClient: HttpClient) { }


  getBlogsList(): Observable<Blog[]>{    
    return this.httpClient.get<Blog[]>(`${this.baseURL}`);
  }

  createBlog(blog: Blog):Observable<Blog>{
    return this.httpClient.post<Blog>(`${this.baseURL}`,blog);
  }

  getBlogById(id: string):Observable<Blog>{
    return this.httpClient.get<Blog>(`${this.baseURL}/${id}`);
  }

  getBlogByEmail(email: string):Observable<Blog[]>{
    return this.httpClient.get<Blog[]>(`${this.emailURL}?writer=${email}`);
  }

  getBlogByFilter(companyName:string,category: string,campus: string,round: string):Observable<Blog[]>{
    if(companyName===undefined)
    companyName="";
    if(category===undefined)
      category="";
    if(campus===undefined)
      campus="";
    if(round===undefined)
      round="";

    return this.httpClient.get<Blog[]>(`${this.searchURL}?companyName=${companyName}&category=${category}&campus=${campus}&round=${round}`);
  }

  updateBlog(id:string, blog: Blog):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,blog);
  }

  likeBlog(id:string):Observable<Blog>{
    return this.httpClient.put<Blog>(`${this.baseURL}/${id}/like`,{});
  }
  dislikeBlog(id:string):Observable<Blog>{
    return this.httpClient.put<Blog>(`${this.baseURL}/${id}/dislike`,{});
  }
  toggleLike(itemId: string, userId: string): Observable<Blog> {
    console.log(itemId);
    
    return this.httpClient.put<Blog>(`${this.apiUrl}/toggle`, { itemId, userId });
  }
  view(itemId: string): Observable<Blog>{
    return this.httpClient.put<Blog>(`${this.apiUrl}/view`,{itemId});
  }
  deleteBlog(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
