import { Injectable } from '@angular/core';
import { Result } from '../common/result';
import { httpOptions } from './http-option';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ScriptManageService {

  constructor(private http:HttpClient) { }

  getScriptList():Observable<Result>{
    return this.http.get<Result>('/script');
  }

  getScriptById(id:string):Observable<Result>{
    return this.http.get<Result>(`/script/${id}`);
  }

  deleteScriptById(id:string):Observable<Result>{
    return this.http.delete<Result>(`/script/${id}`);
  }

  addOrModify(script:any):Observable<Result>{
    return this.http.post<Result>('/script',script,httpOptions);
  }
}
