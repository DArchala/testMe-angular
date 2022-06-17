import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private url = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient) {
  }

  registerNewUser(user: User) {
    return this.httpClient.post<User>(this.url + `/register`, user).pipe(tap(console.log));
  }

  confirmAccountActivationByToken(tokenValue: string) {
    return this.httpClient.get<HttpResponse<any>>(this.url + `/activate/token?value=` + tokenValue).pipe(tap(console.log));
  }

  postPasswordResetEmailRequest(email: string) {
    return this.httpClient.post<any>(this.url + `/password/reset`, email).pipe(tap(console.log));
  }

  confirmResetPasswordByToken(tokenValue: string) {
    return this.httpClient.get<any>(this.url + `/password/reset/token?value=` + tokenValue).pipe(tap(console.log));
  }

}
