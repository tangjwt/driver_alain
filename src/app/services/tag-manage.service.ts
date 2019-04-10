import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';
import { Observable } from 'rxjs';

@Injectable()
export class TagManageService {

  constructor(private http:HttpClient) { }

  getTagsList():Observable<BasicResult>{
    return this.http.get<BasicResult>('/tags');
  }

  getTagsById(id:string):Observable<BasicResult>{
    return this.http.get<BasicResult>(`/tags/${id}`);
  }

  deleteTagsById(id:string):Observable<BasicResult>{
    return this.http.delete<BasicResult>(`/tags/${id}`);
  }

  addOrModify(tags:any):Observable<BasicResult>{
    return this.http.post<BasicResult>('/tags',tags,httpOptions);
  }
}
