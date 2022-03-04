import { CommonService } from './../services/common.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( error => {

        if(error['status'] != 401){
          alert("Can not connect Api");
        }

        console.log("Error catched "+ error['status']);
        return throwError(() => error );

      })

    );
  }
}
