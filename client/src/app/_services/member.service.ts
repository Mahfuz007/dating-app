import { PaginationResult } from './../_models/pagination';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Member } from "../_models/member";
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: "root",
})
export class MemberService {
  baseUrl = environment.apiUrl;
  MemberCache = new Map();

  userParams: UserParams;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user => {
      this.user = user;
      this.userParams = new UserParams(user);
    }))
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params) {
    this.userParams = params;
  }

  resetUserParams () {
    this.userParams = new UserParams(this.user);
  }

  getMembers(userParams: UserParams) {

    let response = this.MemberCache.get(Object.values(userParams).join('-'));
    
    if(response){
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());
    params = params.append('orderBy', userParams.orderBy.toString());
    
    return this.getPaginatedResult<Member[]>(this.baseUrl + "users", params)
      .pipe(map(res => {
        this.MemberCache.set(Object.values(userParams).join('-'), res);
        return res;
      }))
  }

  private getPaginatedResult<T>(url,params) {
    const paginationResult: PaginationResult<T> = new PaginationResult<T>();
    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => { 
        paginationResult.result = response.body;
        if(response.headers.get('Pagination') !== null){
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginationResult;
      })
    )
  }

  private getPaginationHeaders (pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getMember(username: string): Observable<Member> {
    const member = [...this.MemberCache.values()]
      .reduce((arr, elem: any) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    if(member) return of(member);
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
