import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseURL="http://localhost:8000/api/companies";
  constructor(private httpClient : HttpClient) { }

  getAllCompanies(): Observable<any[]> {
    return this.httpClient.get<Company[]>(this.baseURL);
  }

  addCompany(name: string): Observable<any> {
    return this.httpClient.post<Company>(this.baseURL, { name });
  }
}
