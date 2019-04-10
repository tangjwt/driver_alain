import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';

@Injectable({
  providedIn: 'root'
})
export class CaseFilepathService {

  constructor(private httpClient: HttpClient) { }

  getFilePath(project: string,forceRefresh:boolean): Observable<BasicResult> {
    return this.httpClient.get<BasicResult>(`/cases/${project};forceRefresh=${forceRefresh}`);
  }


  getFilePathBySource(project:string,dataSource:string,forceRefresh:boolean):Observable<BasicResult>{
    return this.httpClient.get<BasicResult>(`/cases/${project}/${dataSource};forceRefresh=${forceRefresh}`);
  }


  getFilePathByServiceAndSource(project:string,service:string,dataSource:string,forceRefresh:boolean):Observable<BasicResult>{
    return this.httpClient.get<BasicResult>(`/cases/${project}/${service}/${dataSource};forceRefresh=${forceRefresh}`);
  }

}
