import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicResult } from '../common/basic-result';
import { Observable } from 'rxjs';

@Injectable() 
export class RunResultService {

  constructor(private httpClient: HttpClient) { }


  deleteByRunsetId(id: string): Observable<BasicResult> {
    return this.httpClient.delete<BasicResult>('/runResult/' + id);
  }

  getRunsetById(id: string): Observable<BasicResult> {
    return this.httpClient.get<BasicResult>('/runResult/' + id);
  }


  getRunResultDetail(id: string): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult/cases/'+id);
  }

  getSubRunResultList(id: string): Observable<BasicResult> {
    let url = '/runResult/cases/'+id+'/subcases';
    return this.httpClient
      .get<BasicResult>(url);
  }

  getRunResultList(id: string,status:string,pageNum: number = 1, pageSize: number = 0): Observable<BasicResult> {
    let url = '/runResult/'+id+'/cases;pageNum='+pageNum+';pageSize='+pageSize;
    if(status){
      url = url+';status='+status;
    }
    return this.httpClient
      .get<BasicResult>(url);
  }


  getCompareRunResultList(id: string,compareId:string,originStatus:string,destinationStatus:string,pageNum: number = 1, pageSize: number = 0): Observable<BasicResult>{
    let url = '/runResult/comparedetail/'+id+'/'+compareId+';originStatus='+originStatus+';destinationStatus='+destinationStatus+';pageNum='+pageNum+';pageSize='+pageSize;
    return this.httpClient
      .get<BasicResult>(url);
  }


  getCompareRunResultStatistic(originId: string,destId:string ): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult/compare/'+originId+'/'+destId);
  }

  hasSubRunSetList(id: string): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult/hasSubRunset/'+id);
  }

  getSubRunSetList(id: string,pageNum: number = 1, pageSize: number = 0): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult/subRunset/'+id+';pageNum='+pageNum+';pageSize='+pageSize);
  }

  getRunSetList(pageNum: number = 1, pageSize: number = 0): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult;pageNum='+pageNum+';pageSize='+pageSize);
  }

  getRunSetListByTask(taskid: string,pageNum: number = 1, pageSize: number = 0): Observable<BasicResult> {
    let url = `/runResult/task/${taskid};pageNum=${pageNum};pageSize=${pageSize}`;
    return this.httpClient
      .get<BasicResult>(url);
  }

  getRunResultStatistic(id: string ): Observable<BasicResult> {
    return this.httpClient
      .get<BasicResult>('/runResult/'+id+'/statistic');
  }
}
