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
    project: string = '',
    dataSource: string = '',
    service: string = '',
    name: string = '',
    caseFilePath: string = '',
    priority: string = '',
  ) {
    const httpOption = {
      params: new HttpParams()
        .set('pageNum', pageNum.toString())
        .set('pageSize', pageSize.toString())
        .set('project', project)
        .set('dataSource', dataSource)
        .set('service', service)
        .set('name', name)
        .set('caseFilePath', caseFilePath)
        .set('priority', priority)
    };
    return this.httpClient.get<Result>('/caseManage', httpOption);
  }

  getCaseById(id: string) {
    return this.httpClient.get<Result>(`/caseManage/${id}`);
  }

}
