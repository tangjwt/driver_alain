import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { httpOptions } from './http-option';

@Injectable()
export class EnvManageService {

  constructor(private http:HttpClient) { }

  getEnvList():Observable<Result>{
    return this.http.get<Result>("/env");
  }

  getEnvById(id:string):Observable<Result>{
    return this.http.get<Result>(`/env/${id}`);
  }

  addOrModifyEnv(env:any):Observable<Result>{
    return this.http.post<Result>("/env",env,httpOptions)
  }

  getEnvListByProject(project:string):Observable<Result>{
    return this.http.get<Result>("/env/list/"+project);
  }

  getDataSourceList(project:string):Observable<Result>{
    return this.http.get<Result>("/datasource/full/"+project);
  }

  deleteById(id:string):Observable<Result>{
    return this.http.delete<Result>(`/env/${id}`);
  }
}
