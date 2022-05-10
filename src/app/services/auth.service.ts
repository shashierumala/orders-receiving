import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const AUTH_API = 'http://twshop-dev/NexGen40-Receiving/api/user/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(empId: string) {
    return this.http.post<any>(AUTH_API + 'login?empid=' + empId, {});
  }

  isLoggedIn() {
    return localStorage.getItem('EmployeeID') != null;
  }
}
