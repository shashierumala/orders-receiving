import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { TagService } from '../services/tag.service';
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
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
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
  myPaginationString: string = '';
  searchType = '';
  noOfPages = 20;
  printValue =1;
  pono : any;
  Tag_Comment: any;
  @ViewChild('dv') table!: Table;
  @ViewChild('filter') filter!: ElementRef;
  filteredValueLength = 0;
  ref!: DynamicDialogRef;
  selectedPo = '';
  filterdColumn = 'HEAT';
  emptyMessage = 'No Records Found'

  constructor(
    private router: Router,
    private tagService: TagService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService,
    private loadingService: AppLoadingService
  ) {}

  ngOnInit(): void {
    if (this.selectedDist) {
      this.selectedDist = this.tagService.selectedDist;
    } else {
      const orders: any = localStorage.getItem('DIST');
      this.selectedDist = JSON.parse(orders);
    }
    this.getOrdersInfo();
    this.tagService.searchValue.subscribe((val) => {
      if (val !== '') {
        this.selectedPo = val;
        if (this.table && this.orders.length > 0) {
          this.table.filter(val, 'equals', 'equals');
          this.filteredValueLength = this.table.filteredValue.length
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

  paginate(event: any) {
    window.scrollTo(0, 0);
  }

  rackPrintLabel(){
    const requestObject = {
      poNo : this.pono,
      tagComment: this.Tag_Comment,
      printValue: this.printValue
    }
    console.log(requestObject);

  }
  getOrdersInfo() {
    this.orders = [];
    this.loadingService.setLoading(true);
    this.tagService.getOrders().subscribe(
      (res) => {
        this.orders = res.data;
        this.orders.forEach((obj: any) => {
          Object.keys(obj).map(
            (k) => (obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k])
          );
        });
        this.filteredValueLength = this.orders.length
        if (this.orders.length > 0) {
          const col = Object.keys(this.orders[0]);
          this.cols = col;
          this.filterdColumn = 'PONO';
          if(  this.table){
            this.table.filter('', 'equals', 'equals');
            this.noOfPages = 20;
            this.table.filteredValue = this.orders;
            this.filteredValueLength = this.table.filteredValue.length
          }

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

  addTagRackingLocation() {
    this.ref = this.dialogService.open(LocationSearchModalComponent, {
      header: 'Enter Racking Location',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        isNewPO: true,
    },
    });
    this.ref.onClose.subscribe((val) => {
      this.pono = val;
    });
  }

  addTagComment() {
    this.ref = this.dialogService.open(LocationSearchModalComponent, {
      header: 'Tag_Comment',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        isNewPO: true,
    },
    });
    this.ref.onClose.subscribe((val) => {
      this.Tag_Comment = val;
    });
  }

  search(searchType: string) {
    this.searchType = searchType;
    this.filterdColumn = searchType === 'poNumber' ? 'PONO' : 'HEAT';
    const componnet =
      searchType === 'poNumber'
        ? SearchModalComponent
        : LocationSearchModalComponent;
    this.ref = this.dialogService.open(componnet, {
      header:
        searchType === 'poNumber' ? 'Search PO Number' : 'Search Heat Number',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        searchLength: 30,
        isPONumber: searchType === 'poNumber' ? true : false,
      },
    });
  }
}
