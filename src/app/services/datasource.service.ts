import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { httpOptions } from './http-option';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private http:HttpClient) { }

  getDataourceList():Observable<Result>{
    return this.http.get<Result>("/datasource");
  }

  getDataourceById(id:string):Observable<Result>{
    return this.http.get<Result>(`/datasource/${id}`);
  }

  addOrModifyDataource(env:any):Observable<Result>{
    return this.http.post<Result>("/datasource",env,httpOptions)
  }

  getDataourceListByProject(project:string):Observable<Result>{
    return this.http.get<Result>("/datasource/list/"+project);
  }


  deleteById(id:string):Observable<Result>{
    return this.http.delete<Result>(`/datasource/${id}`);
  }
}
