import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';
import { AppLoadingService } from '../services/app-loading.service';

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
  //selectedHeat ='';
  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService,
    private loadingService: AppLoadingService
  ) {}

  ngOnInit(): void {
    if (this.selectedDist) {
      this.selectedDist = this.ordersService.selectedDist;
    } else {
      const orders: any = localStorage.getItem('DIST');
      this.selectedDist = JSON.parse(orders);
    }
    this.getOrdersInfo();
    this.ordersService.searchValue.subscribe((val) => {
      if (val !== '') {
        this.selectedPo = val;
        if (this.table) {
          this.table.filter(val, 'equals', 'equals');
        }
        if (this.ref) {
          this.ref.close();
        }
      }
    });

    // this.ordersService.searchValue1.subscribe((val1) => {
    //   if (val1 !== '') {
    //     this.selectedHeat = val1;
    //     if (this.table) {
    //       this.table.filter(val1, 'equals', 'equals');
    //     }
    //     if (this.ref) {
    //       this.ref.close();
    //     }
    //   }
    // });
  }

  refresh() {
    this.selectedPo = '';
    //this.selectedHeat ='';
    this.loading = true;
    this.getOrdersInfo();
  }
  getOrdersInfo() {
    this.orders = [];
    this.loadingService.setLoading(true);
    this.ordersService.getOrders().subscribe(
      (res) => {
        this.orders = res.data;
        if (this.orders.length > 0) {
          const col = Object.keys(this.orders[0]);
          this.cols = col;
          this.table.filter('', 'equals', 'equals');
          this.loading = false;
        }
        this.selectedPo = '';
        //this.selectedHeat = '';
        this.loadingService.setLoading(false);
      },
      (err: HttpErrorResponse): void => {
        this.loadingService.setLoading(false);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

  logout() {
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('DIST');
    this.router.navigate(['/login']);
  }

  showPOSearch() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Search PO Number',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  // showHeatSearch() {
  //   this.ref = this.dialogService.open(SearchModalComponent, {
  //     header: 'Search Heat Number',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 10000,
  //   });
  // }


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
