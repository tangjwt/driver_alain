import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { httpOptions } from './http-option';

@Injectable()
export class EnvUrlManageService {

  constructor(private http:HttpClient) { }

  getEnvUrlListByProjectAndEnv(project:string,env:string):Observable<Result>{
    return this.http.get<Result>(`/url/list/${project}/${env}`);
  }

  getEnvUrlListByProject(project:string):Observable<Result>{
    return this.http.get<Result>(`/url/list/${project}`);
  }
  getEnvUrlList():Observable<Result>{
    return this.http.get<Result>('/url');
  }

  getEnvUrlById(id:string):Observable<Result>{
    return this.http.get<Result>(`/url/${id}`);
  }

  deleteById(id:string):Observable<Result>{
    return this.http.delete<Result>(`/url/${id}`);
  }


  addOrModify(envUrl:any):Observable<Result>{
    return this.http.post<Result>('/url',envUrl,httpOptions);
  }
}
