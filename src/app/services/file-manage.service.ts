import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Result } from '../common/result';
import { Observable } from 'rxjs';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class FileManageService {
  constructor(private httpClient: HttpClient) {}

  getFileList(): Observable<Result> {
    return this.httpClient.get<Result>('/storage/list');
  }

  filterFileList(
    project: string,
    service: string,
    prefix: string,
  ): Observable<Result> {
    let params = new HttpParams();
    if (prefix) {
      params.append('prefix', prefix);
    }
    return this.httpClient.get<Result>(`/storage/list/${project}/${service}`, {
      params,
    });
  }

  deleteFile(project: string, service: string, objName: string) {
    let params = new HttpParams().set('name', objName);
    return this.httpClient.delete<Result>(
      `/storage/${project}/${service}/${objName}/delete`,
    );
  }

  getFileDownloadUrl(project: string, service: string, objName: string) {
    let params = new HttpParams().set('name', objName);
    return this.httpClient.get<Result>(
      `/storage/${project}/${service}/${objName}/download`,
    );
  }

  getFileUploadUrl(project: string, service: string, objName: string) {
    let params = new HttpParams().set('name', objName);
    return this.httpClient.get<Result>(
      `/storage/${project}/${service}/${objName}/upload`,
    );
  }

  uploadFile(item: UploadXHRArgs, uploadUrl: string) {
    // console.log(uploadUrl);

    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('PUT', uploadUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    return this.httpClient.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      (err) => {
        item.onError!(err, item.file!);
      },
    );
  }
}
