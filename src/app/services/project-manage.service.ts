import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from './http-option';
import { BasicResult } from '../common/basic-result';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectManageService {

  constructor(private httpClient:HttpClient) { }

  getProjectList():Observable<BasicResult>{
    return this.httpClient.get<BasicResult>('/project');
  }

  getById(id:string) : Observable<BasicResult> {
    return this.httpClient.get<BasicResult>(`/project/${id}`);
  }
  deleteById(id:string) : Observable<BasicResult> {
    return this.httpClient.delete<BasicResult>(`/project/${id}`);
  }

  add(project:any) : Observable<BasicResult> {
    return this.httpClient.post<BasicResult>('/project',project,httpOptions);
  }
}
