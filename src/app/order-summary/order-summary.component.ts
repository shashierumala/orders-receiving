import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';
import { AppLoadingService } from '../services/app-loading.service';
import { LocationSearchModalComponent } from '../location-search-modal/location-search-modal.component';

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
  length!: any;
  width!: any;
  pieces!: any;
  status!: string;
  loading = true;
  order: Order[] = [];
  employee: EmployeeInfo[] = [];
  display: boolean = false;
  dist!: string;
  item!: string;
  tag!: string;
  ref!: DynamicDialogRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private loadingService: AppLoadingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: Params) => {
      (this.dist = res['dist']),
        (this.item = res['item']),
        (this.tag = res['tag']);
      this.loadOrder();
    });
  }

  loadOrder() {
    this.loadingService.setLoading(true);
    this.orderService
      .selectOrder(this.dist, this.item, this.tag)
      .subscribe((res) => {
        console.log(res.data);
        this.selectedOrder = res.data[0];
        this.orderService.selectedOrder = res.data[0];
        this.loadingService.setLoading(false);
      });
  }

  
  refresh() {
    this. loadOrder();
  }

  back() {
    this.router.navigate(['order-info']);
  }

  onUpdateClick(loc:any) {
    if (loc) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.orderService.sendLocation(loc).subscribe(
        (data) => {
          this.selectedOrder = data.receiving[0];
          this.orderService.selectedOrder = data.receiving[0];
          this.loadingService.setLoading(false);
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New Racking location is added to Tag',
          });
        },
        (err: HttpErrorResponse): void => {
          this.loadingService.setLoading(false);
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

  updateLength(length: any) {
    if (length) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.orderService.sendLength(length).subscribe(
        (data) => {
          console.log(data);
          this.selectedOrder = data.receiving[0];
          this.orderService.selectedOrder = data.receiving[0];
          this.loadingService.setLoading(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Length changed successfully',
          });
        },
        (err: HttpErrorResponse): void => {
          this.loadingService.setLoading(false);
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  updateWidth(width: any) {
    if (width) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.orderService.sendWidth(width).subscribe(
        (data) => {
          console.log(data);
          this.selectedOrder = data.receiving[0];
          this.orderService.selectedOrder = data.receiving[0];
          this.loadingService.setLoading(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'width changed successfully',
          });
        },
        (err: HttpErrorResponse): void => {
          this.loadingService.setLoading(false);
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  updatePieces(pieces: any) {
    if (pieces) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.orderService.sendPieces(pieces).subscribe(
        (data) => {
          console.log(data);
          this.selectedOrder = data.receiving[0];
          this.orderService.selectedOrder = data.receiving[0];
          this.loadingService.setLoading(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pieces changed successfully',
          });
        },
        (err: HttpErrorResponse): void => {
          this.loadingService.setLoading(false);
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  changeLengthOrWidthorPieces(type: string) {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header:
        type === 'length'
          ? 'Change Length'
          : 'width'
          ? 'Change Width'
          :'pieces'
          ?'Change Pieces'
          :'Change Racking Location',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      if (type === 'length') {
        this.updateLength(val);
      } else if (type === 'width') {
        this.updateWidth(val);
      } else if(type ==='pieces') {
        this.updatePieces(val);
      } else {
        this.onUpdateClick(val);
      }
    });
  }

  changeLength() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Change Length',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      console.log('>>>>>>>>>>>>>> value ',val)
      this.updateLength(val);
    });
  }

  changeWidth() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Change Width',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      this.updateWidth(val);
    });
  }

  changePieces() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Change Pieces',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      this.updatePieces(val);
    });
  }

  changeLocation() {
    this.ref = this.dialogService.open(LocationSearchModalComponent, {
      header: 'Change Racking Location',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      this.onUpdateClick(val);
    });
  }

  updateStatus() {
    if (
      !this.selectedOrder.LOC.startsWith('IN') &&
      +this.selectedOrder.STATUS === 2
    ) 
    {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.orderService.sendStatus('1').subscribe(
        (data) => {
          console.log(data);
          this.loadingService.setLoading(false);
          this.router.navigateByUrl('order-info');
        },
        (err: HttpErrorResponse): void => {
          this.loadingService.setLoading(false);
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Please Change Racking Location',
      });
    }
  }
}
