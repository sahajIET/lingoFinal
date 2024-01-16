import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL="http://localhost:8000/q/questions";
  private searchURL="http://localhost:8000/q/question"
  private emailURL="http://localhost:8000/q/Email"
  private apiUrl = 'http://localhost:8000/q/api2/likes';

  constructor(private httpClient: HttpClient) { }


  getQuestionsList(): Observable<Question[]>{    
    return this.httpClient.get<Question[]>(`${this.baseURL}`);
  }

  createQuestion(question: Question):Observable<Question>{
    return this.httpClient.post<Question>(`${this.baseURL}`,question);
  }

  getQuestionById(id: string):Observable<Question>{
    return this.httpClient.get<Question>(`${this.baseURL}/${id}`);
  }

  getQuestionByEmail(email: string):Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.emailURL}?writer=${email}`);
  }

  getQuestionByFilter(companyName:string,category: string,campus: string,round: string):Observable<Question[]>{
    if(companyName===undefined)
      companyName="";
    if(category===undefined)
      category="";
    if(campus===undefined)
      campus="";
    if(round===undefined)
      round="";

    return this.httpClient.get<Question[]>(`${this.searchURL}?companyName=${companyName}&category=${category}&campus=${campus}&round=${round}`);
  }
  // likeBlog(id:string):Observable<Question>{
  //   return this.httpClient.put<Question>(`${this.baseURL}/${id}/like`,{});
  // }
  // dislikeBlog(id:string):Observable<Question>{
  //   return this.httpClient.put<Question>(`${this.baseURL}/${id}/dislike`,{});
  // }
  toggleLike(itemId: string, userId: string): Observable<Question> {
    console.log(itemId);
    
    return this.httpClient.put<Question>(`${this.apiUrl}/toggle`, { itemId, userId });
  }
  updateQuestion(id:string, blog: Question):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,blog);
  }
  view(itemId: string): Observable<Question>{
    return this.httpClient.put<Question>(`${this.apiUrl}/view`,{itemId});
  }
  deleteQuestion(id: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
