import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';

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
  status!:string;
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
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: Params) => {
     this.dist = res['dist'], this.item = res['item'], this.tag=res['tag'];
    this.loadOrder();
    })
  }

  loadOrder(){
    this.orderService.selectOrder(this.dist, this.item, this.tag).subscribe(res => {
      console.log(res.data)
      this.selectedOrder = res.data[0];
      this.orderService.selectedOrder = res.data[0]
    });
  }
  back() {
    this.router.navigate(['order-info']);
  }

  onUpdateClick() {
    if (this.loc) {
      this.orderService.sendLocation(this.loc).subscribe(
        (data) => {
          this.loadOrder();
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

  updateLength(length:any) {
    if (length) {
      this.orderService.sendLength(length).subscribe(
        (data) => {
          console.log(data);
          this.loadOrder();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Length changed successfully',
          });
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  updateWidth(width:any) {
    if (width) {
      this.orderService.sendWidth(width).subscribe(
        (data) => {
          this.loadOrder();
          console.log(data);
          this.width = '';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'width changed successfully',
          });
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  changeLengthOrWidth(type: string) {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: type === 'length' ? 'Change Length' : 'Change Width',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
   this.ref.onClose.subscribe(val=>{
     if(type === 'length' ){
      this.updateLength(val)
     }else{
      this.updateWidth(val)
     }
    
   })
  
  }

  changeLength() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header:  'Change Length',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
   this.ref.onClose.subscribe(val=>{
      this.updateLength(val)
     })
  
  }

  changeWidth() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Change Width',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
   this.ref.onClose.subscribe(val=>{
      this.updateWidth(val)
     })
  
  }

  updateStatus() {
    if ((!this.selectedOrder.LOC.startsWith('IN')) && +this.selectedOrder.STATUS === 2 ) {
      this.orderService.sendStatus('1').subscribe(
        (data) => {
          console.log(data);
        this.router.navigateByUrl('order-info');
        },
        (err: HttpErrorResponse): void => {
          this.errorMessage = err.error.message;
          this.errorHandler.handleError(err);
        }
      );
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Please Change Racking Location',
      });
    }
  }
}
