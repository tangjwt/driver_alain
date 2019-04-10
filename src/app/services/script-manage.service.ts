import { Injectable } from '@angular/core';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ScriptManageService {

  constructor(private http:HttpClient) { }

  getScriptList():Observable<BasicResult>{
    return this.http.get<BasicResult>('/script');
  }

  getScriptById(id:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/script/${id}`);
  }

  deleteScriptById(id:string):Observable<BasicResult>{
    return this.http.delete<BasicResult>(`/script/${id}`);
  }

  addOrModify(script:any):Observable<BasicResult>{
    return this.http.post<BasicResult>('/script',script,httpOptions);
  }
}
