import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { httpOptions } from './http-option';

@Injectable()
export class SerManageService {

  constructor(private http:HttpClient) { }

  getServiceList():Observable<Result>{
    return this.http.get<Result>('/service');
  }

  getServiceById(id:string):Observable<Result>{
    return this.http.get<Result>(`/service/${id}`);
  }


  getServiceListByProject(project:string):Observable<Result>{
    return this.http.get<Result>(`/service/list/${project}`);
  }

  addOrModify(service:any):Observable<Result>{
    return this.http.post<Result>('/service',service,httpOptions);
  }
  deleteById(id:string):Observable<Result>{
    return this.http.delete<Result>(`/service/${id}`);
  }
}
