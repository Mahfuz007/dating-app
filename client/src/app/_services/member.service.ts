import { PaginationResult } from './../_models/pagination';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Member } from "../_models/member";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginationResult: PaginationResult<Member[]> = new PaginationResult<Member[]>();

  constructor(private http: HttpClient) {}

  getMembers(page?: Number, itemsPerPage?:Number) {
    let params = new HttpParams();

    if(page!==null && itemsPerPage!==null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    
    return this.http.get<Member[]>(this.baseUrl + "users", {observe: 'response', params}).pipe(
      map(response => {
        console.log("response = ", response);
        this.paginationResult.result = response.body;
        if(response.headers.get('Pagination') !== null){
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return this.paginationResult;
      })
    )
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find((member) => member.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + "users/" + `${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + "users", member);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }
}
