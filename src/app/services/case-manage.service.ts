import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';

@Injectable({
  providedIn: 'root'
})
export class CaseManageService {
  constructor(private httpClient: HttpClient) {}

  getCaseList(
    pageNum: number = 1,
    pageSize: number = 0,
  ) {
    const httpOption = {
      params: new HttpParams()
        .set('pageNum', pageNum.toString())
        .set('pageSize', pageSize.toString()),
    };
    return this.httpClient.get<Result>('/caseManage', httpOption);
  }

  getCaseById(id: string) {
    return this.httpClient.get<Result>(`/caseManage/${id}`);
  }

}
