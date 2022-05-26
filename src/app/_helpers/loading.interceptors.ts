import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AppLoadingService } from '../services/app-loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequest = 0;
  constructor(private app: AppLoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.totalRequest++;
    return next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          this.decreaseRequest();
        }
      }),
      catchError((err) => {
        this.decreaseRequest();
        throw err;
      })
    );
  }
  private decreaseRequest() {
    this.totalRequest--;
    if (this.totalRequest === 0) {
     
    }
  }
}