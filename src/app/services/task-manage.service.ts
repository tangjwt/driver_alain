import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicResult } from '../common/basic-result';
import { httpOptions } from './http-option';

@Injectable()
export class TaskManageService {

  constructor(private httpClient: HttpClient) { }

  getTaskList(pageNum: number = 1, pageSize: number = 0, taskName: string = "") {
    if (taskName) {
      return this.httpClient.get<BasicResult>(`/task;pageNum=${pageNum};pageSize=${pageSize};taskName=${taskName}`);
    } else {
      return this.httpClient.get<BasicResult>("/task;pageNum=" + pageNum + ";pageSize=" + pageSize);
    }
  }

  getTaskById(id: string) {
    return this.httpClient.get<BasicResult>(`/task/${id}`);
  }

  add(task: any) {
    return this.httpClient.post<BasicResult>('/task', task, httpOptions);
  }

  pause(id: string) {
    return this.httpClient.get<BasicResult>(`/task/${id}/pause`);
  }

  resume(id: string) {
    return this.httpClient.get<BasicResult>(`/task/${id}/resume`);
  }

  delete(id: string) {
    return this.httpClient.delete<BasicResult>(`/task/${id}`);
  }

  runOnce(id: string) {
    return this.httpClient.get<BasicResult>(`/task/${id}/runOnce`);
  }
}
