import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';
import { AppLoadingService } from '../services/app-loading.service';
import { LocationSearchModalComponent } from '../location-search-modal/location-search-modal.component';

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
  myPaginationString:string ='';
  searchType = '';
  noOfPages = 20;
  @ViewChild('dv') table!: Table;
  @ViewChild('filter') filter!: ElementRef;

  ref!: DynamicDialogRef;
  selectedPo = '';
  filterdColumn = 'HEAT';
  
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
  }

  refresh() {
    this.selectedPo = '';
    this.loading = true;
    this.getOrdersInfo();

  }

  paginate(event:any) {
    window.scrollTo(0,0);
}
  getOrdersInfo() {
    this.orders = [];
    this.loadingService.setLoading(true);
    this.ordersService.getOrders().subscribe(
      (res) => {
        this.orders = res.data;
        this.orders.forEach((obj: any)=>{
          Object.keys(obj).map(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k]);
        })
        if (this.orders.length > 0) {
          const col = Object.keys(this.orders[0]);
          this.cols = col;
          this.filterdColumn = 'PONO'
          this.table.filter('', 'equals', 'equals');
          this.noOfPages = 20;
          this.table.filteredValue = this.orders
          this.loading = false;

          
        }
        this.selectedPo = '';
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

  search(searchType: string){
    this.searchType = searchType;
    this.filterdColumn = searchType === 'poNumber' ?  'PONO' : 'HEAT';
    const componnet = searchType === 'poNumber' ?  SearchModalComponent : LocationSearchModalComponent;
    this.ref = this.dialogService.open(componnet, {
      header: searchType === 'poNumber' ? 'Search PO Number' : 'Search Heat Number',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {searchLength: 30 , isPONumber: searchType === 'poNumber' ?  true : false}
    });
  }
}
