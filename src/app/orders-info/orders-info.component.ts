import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss'],
})
export class OrdersInfoComponent implements OnInit {
  datasource: Order[] = [];
  orders: Order[] = [];
  ordersInfo: Order[] = [];
  paginationIndex = 0;
  noRows = 10;
  cols: string[] = [];
  first = 0;
  rows = 0;
  totalRecords: number[] = [];
  loading = true;
  errorMessage: string = '';
  selectedDist!: string;

  @ViewChild('dv') table!: Table;
  @ViewChild('filter') filter!: ElementRef;

  ref!: DynamicDialogRef;
  selectedPo = '';
  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    if (this.selectedDist) {
      this.selectedDist = this.ordersService.selectedDist;
    } else {
      const orders: any = localStorage.getItem('order-Info');
      this.selectedDist = JSON.parse(orders);
    }
    this.getOrdersInfo();
    this.ordersService.searchValue.subscribe((val) => {
      if (val !== '') {
        this.selectedPo = val;
        this.table.filter(val, 'equals', 'equals');
        this.ref.close();
      }
    });
  }

  refresh() {
    this.selectedPo = '';
    this.loading = true;
    this.getOrdersInfo();
  }
  getOrdersInfo() {
    this.ordersService.getOrders().subscribe(
      (res) => {
        this.orders = res.data;
        this.ordersInfo = this.orders.slice(
          this.paginationIndex,
          this.paginationIndex + this.noRows
        );
        if (this.orders.length > 0) {
          const col = Object.keys(this.orders[0]);
          this.cols = col;
          this.table.filter('', 'equals', 'equals');
          this.loading = false;
        }
        this.selectedPo = '';
      },
      (err: HttpErrorResponse): void => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }
  changePagination(event: any) {
    this.ordersInfo = this.orders.slice(event.first, event.first + event.rows);
    console.log(event);
  }

  logout() {
    localStorage.removeItem('EmployeeID');
    this.router.navigate(['/login']);
  }

  showSearch() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Search PO Number',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.orders ? this.first === this.orders.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.orders ? this.first === 0 : true;
  }
}
