import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(empId: string) {
    return this.http.post<any>(
      environment.url + '/user/' + 'login?empid=' + empId,
      {}
    );
  }

  isLoggedIn() {
    return localStorage.getItem('EmployeeID') != null;
  }
}
