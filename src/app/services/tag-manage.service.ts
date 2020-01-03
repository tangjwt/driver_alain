import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../common/result';
import { httpOptions } from './http-option';
import { Observable } from 'rxjs';

@Injectable()
export class TagManageService {
  constructor(private http: HttpClient) {}

  getTagsList(): Observable<Result> {
    return this.http.get<Result>('/tags');
  }

  getTagsById(id: string): Observable<Result> {
    return this.http.get<Result>(`/tags/${id}`);
  }

  deleteTagsById(id: string): Observable<Result> {
    return this.http.delete<Result>(`/tags/${id}`);
  }

  addOrModify(tags: any): Observable<Result> {
    return this.http.post<Result>('/tags', tags, httpOptions);
  }
}
