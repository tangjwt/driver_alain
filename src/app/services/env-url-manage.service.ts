import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';

@Injectable()
export class EnvUrlManageService {

  constructor(private http:HttpClient) { }

  getEnvUrlListByProjectAndEnv(project:string,env:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/url/list/${project}/${env}`);
  }

  getEnvUrlListByProject(project:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/url/list/${project}`);
  }
  getEnvUrlList():Observable<BasicResult>{
    return this.http.get<BasicResult>('/url');
  }

  getEnvUrlById(id:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/url/${id}`);
  }

  deleteById(id:string):Observable<BasicResult>{
    return this.http.delete<BasicResult>(`/url/${id}`);
  }


  addOrModify(envUrl:any):Observable<BasicResult>{
    return this.http.post<BasicResult>('/url',envUrl,httpOptions);
  }
}
