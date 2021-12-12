import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Member } from "../_models/member";

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem(`user`)).token,
  }),
};

@Injectable({
  providedIn: "root",
})
export class MemberService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "users", httpOptions);
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(
      this.baseUrl + "users/" + `${username}`,
      httpOptions
    );
  }
}
