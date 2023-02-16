import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {delay, finalize, Observable} from "rxjs";
import {BusyService} from "../services/busy.service";
import {Injectable} from "@angular/core";

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      request.url.includes('emailexists') ||
      request.method === 'POST' && request.url.includes('Orders') ||
      request.method === 'DELETE'
    ) {
      return next.handle(request);
    }

    this.busyService.busy();
    return next.handle(request).pipe(
      delay(100),
      finalize(() => {
        this.busyService.idle();
      })
    )
  }
}
