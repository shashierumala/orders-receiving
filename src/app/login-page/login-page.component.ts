import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  empId: string = '';

  empList: any[] = [];
  selectedDist!: string;
  errorHandler: any;
  errorMessage: any;
  isShown: boolean = false;
  window: any = Window;
  isLoading = false;

  constructor(
    private idle: Idle,
    private router: Router,
    private orderService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.timeOutConfiguartions();
  }

  onSubmit() {
    if (this.empId) {
      this.isLoading = true;
      this.authService.login(this.empId).subscribe(
        (res) => {
          this.isLoading = false;
          this.idle.watch();
          this.empList = res.employeeInfo;
          this.isShown = true;
          localStorage.setItem('EmployeeID', this.empId);
        },
        (err: HttpErrorResponse): void => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  timeOutConfiguartions() {
    this.idle.setIdle(3600);
    this.idle.setTimeout(3600);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => {
      console.log('Idle End');
    });
    this.idle.onTimeout.subscribe(() => {
      this.router.navigateByUrl('');
    });
    this.idle.onIdleStart.subscribe(() => {
      console.log('Idle Start');
    });
  }
  navigateToMain() {
    this.orderService.selectedEmployee = this.empList.filter(
      (val) => val.EMPDIST === this.selectedDist
    )[0];
    this.orderService.selectedDist = this.selectedDist;
    localStorage.setItem('order-Info', this.selectedDist);
    this.router.navigateByUrl('order-info');
  }

  clear() {
    this.empId = '';
    this.isShown = false;
  }
}
