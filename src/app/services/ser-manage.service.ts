import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';

@Injectable()
export class SerManageService {

  constructor(private http:HttpClient) { }

  getServiceList():Observable<BasicResult>{
    return this.http.get<BasicResult>('/service');
  }

  getServiceById(id:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/service/${id}`);
  }


  getServiceListByProject(project:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/service/list/${project}`);
  }

  addOrModify(service:any):Observable<BasicResult>{
    return this.http.post<BasicResult>('/service',service,httpOptions);
  }
  deleteById(id:string):Observable<BasicResult>{
    return this.http.delete<BasicResult>(`/service/${id}`);
  }
}
