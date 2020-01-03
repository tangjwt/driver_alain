import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from './http-option';
import { Result } from '../common/result';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectManageService {

  constructor(private httpClient:HttpClient) { }

  getProjectList():Observable<Result>{
    return this.httpClient.get<Result>('/project');
  }

  getById(id:string) : Observable<Result> {
    return this.httpClient.get<Result>(`/project/${id}`);
  }
  deleteById(id:string) : Observable<Result> {
    return this.httpClient.delete<Result>(`/project/${id}`);
  }

  add(project:any) : Observable<Result> {
    return this.httpClient.post<Result>('/project',project,httpOptions);
  }
}
