import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {tap} from "rxjs";
import {PasswordChangeRequest} from "../models/password-change-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/users";

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    return this.httpClient.get<User[]>(this.url).pipe(tap(console.log));
  }

  findUserByUsername(username: any) {
    return this.httpClient.post<User>(this.url + `/findBy/username`, username).pipe(tap(console.log));
  }

  putUserWithNewRole(user: User) {
    return this.httpClient.put<User>(this.url + `/role`, user).pipe(tap(console.log));
  }

  putUserWithNewPassword(user: User) {
    return this.httpClient.put<User>(this.url + `/password`, user).pipe(tap(console.log));
  }

  deleteUser(userID: any) {
    return this.httpClient.delete<any>(this.url + `/delete/` + userID).pipe(tap(console.log));
  }

  getRoles() {
    return this.httpClient.get<string[]>(this.url + `/roles`).pipe(tap(console.log));
  }

  postPasswordChangeRequest(passwordRequest: PasswordChangeRequest) {
    return this.httpClient.post<User>(this.url + `/password/change`, passwordRequest).pipe(tap(console.log));
  }
}
