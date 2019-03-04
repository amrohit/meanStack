import { AuthService } from "./auth.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable() //to inject service into service
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    console.log(authToken);
    const authRequest = req.clone({
      //we are extracting req.headers.authorization at node side, non-case-sensitive but should be of same name
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest); //lets forward the authRequest
  }
}
