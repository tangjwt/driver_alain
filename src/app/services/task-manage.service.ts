import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Result } from '../common/result';
import { httpOptions } from './http-option';

@Injectable()
export class TaskManageService {
  constructor(private httpClient: HttpClient) {}

  getTaskList(
    pageNum: number = 1,
    pageSize: number = 0,
    taskName: string = '',
  ) {
    const httpOption = {
      params: new HttpParams()
        .set('pageNum', pageNum.toString())
        .set('pageSize', pageSize.toString()),
    };
    if (taskName) {
      httpOption.params = httpOption.params.set('taskName', taskName);
    }

    return this.httpClient.get<Result>('/task', httpOption);
  }

  getTaskById(id: string) {
    return this.httpClient.get<Result>(`/task/${id}`);
  }

  add(task: any) {
    return this.httpClient.post<Result>('/task', task, httpOptions);
  }

  pause(id: string) {
    return this.httpClient.get<Result>(`/task/${id}/pause`);
  }

  resume(id: string) {
    return this.httpClient.get<Result>(`/task/${id}/resume`);
  }

  delete(id: string) {
    return this.httpClient.delete<Result>(`/task/${id}`);
  }

  runOnce(id: string) {
    return this.httpClient.get<Result>(`/task/${id}/runOnce`);
  }
}
