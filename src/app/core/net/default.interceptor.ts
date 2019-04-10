import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponseBase } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  baseUrl = this.getBaseUrl();
    rootPath = environment.rootPath;
    getBaseUrl():string{
        let tmpUrl = environment.SERVER_URL;
        if(tmpUrl.endsWith('/')){
            tmpUrl = tmpUrl.substring(0,tmpUrl.length-1)
        }
        return tmpUrl;
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    // let url = req.url;
    // if (!url.startsWith('https://') && !url.startsWith('http://')) {
    //   url = environment.SERVER_URL + url;
    // }

    // const newReq = req.clone({ url });

    let tmpurl = req.url;
    if(!tmpurl.startsWith("/")){
        tmpurl ="/"+tmpurl;
    }
    if(tmpurl.startsWith("/assets/")){
      tmpurl = "."+tmpurl;
    }else{
      tmpurl = this.baseUrl + "/" + this.rootPath + tmpurl
    }
    req = req.clone({
      url: tmpurl
    });
    

    return next.handle(req);
  }
}
