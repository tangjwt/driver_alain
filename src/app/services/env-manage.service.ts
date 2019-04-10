import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';

@Injectable()
export class EnvManageService {

  constructor(private http:HttpClient) { }

  getEnvList():Observable<BasicResult>{
    return this.http.get<BasicResult>("/env");
  }

  getEnvById(id:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/env/${id}`);
  }

  addOrModifyEnv(env:any):Observable<BasicResult>{
    return this.http.post<BasicResult>("/env",env,httpOptions)
  }

  getEnvListByProject(project:string):Observable<BasicResult>{
    return this.http.get<BasicResult>("/env/list/"+project);
  }

  getDataSourceList(project:string):Observable<BasicResult>{
    return this.http.get<BasicResult>("/datasource/"+project);
  }

  deleteById(id:string):Observable<BasicResult>{
    return this.http.delete<BasicResult>(`/env/${id}`);
  }
}
