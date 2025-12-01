import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountListsResponse } from '../interfaces/account-list-response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getAccountLists(accountId: string): Observable<AccountListsResponse> {
    return this.http.get<AccountListsResponse>(`${this.baseUrl}/account/${accountId}/lists`);
  }
}
