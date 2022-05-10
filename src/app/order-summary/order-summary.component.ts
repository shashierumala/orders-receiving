import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  providers: [MessageService],
})
export class OrderSummaryComponent implements OnInit {
  selectedOrder!: any;
  errorHandler: any;
  errorMessage: any;
  loc!: string;
  order: Order[] = [];
  employee: EmployeeInfo[] = [];
  display: boolean = false;

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.selectedOrder) {
      this.selectedOrder = this.orderService.selectedOrder;
    } else {
      const order: any = localStorage.getItem('order-summary');
      this.selectedOrder = JSON.parse(order);
    }
  }

  back() {
    this.router.navigate(['order-info']);
  }

  onUpdateClick() {
    if (this.loc) {
      this.orderService.sendLocation(this.loc).subscribe(
        (data) => {
          console.log(data);
          this.loc = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Racking location is added to Tag',
          });
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  onSubmit() {
    this.orderService
      .printTag(
        this.selectedOrder.DIST,
        this.selectedOrder.TAG,
        this.selectedOrder.ITEM
      )
      .subscribe((data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Printed Inventory Tag',
        });
        this.display = true;
      });
  }
}
