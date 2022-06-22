import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TagService } from '../services/tag.service';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchModalComponent } from '../reusable/search-modal/search-modal.component';
import { AppLoadingService } from '../services/app-loading.service';
import { LocationSearchModalComponent } from '../location-search-modal/location-search-modal.component';

@Component({
  selector: 'app-tag-summary',
  templateUrl: './tag-summary.component.html',
  styleUrls: ['./tag-summary.component.scss'],
  providers: [MessageService],
})
export class TagSummaryComponent implements OnInit {
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
    private tagService: TagService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private loadingService: AppLoadingService,
    private confirmationService: ConfirmationService
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
    this.tagService
      .selectOrder(this.dist, this.item, this.tag)
      .subscribe((res) => {
        this.selectedOrder = res.data[0];
        this.tagService.selectedOrder = res.data[0];
        this.loadingService.setLoading(false);
      });
  }

  refresh() {
    this.loadOrder();
  }

  back() {
    this.router.navigate(['tag-list']);
  }

  onUpdateClick(loc: any) {
    if (loc) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.tagService.sendLocation(loc).subscribe(
        (data) => {
          this.selectedOrder = data.receiving[0];
          this.tagService.selectedOrder = data.receiving[0];
          this.loadingService.setLoading(false);
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
    this.tagService
      .printTag(
        this.selectedOrder.DIST,
        this.selectedOrder.TAG,
        this.selectedOrder.ITEM
      )
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Printed Inventory Tag',
        });
        this.display = true;
      });
  }

  updateTag() {}

  updateLength(length: any) {
    if (length) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.tagService.sendLength(length).subscribe(
        (data) => {
          this.selectedOrder = data.receiving[0];
          this.tagService.selectedOrder = data.receiving[0];
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
      this.tagService.sendWidth(width).subscribe(
        (data) => {
          this.selectedOrder = data.receiving[0];
          this.tagService.selectedOrder = data.receiving[0];
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
      this.tagService.sendPieces(pieces).subscribe(
        (data) => {
          this.selectedOrder = data.receiving[0];
          this.tagService.selectedOrder = data.receiving[0];
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
          : 'pieces'
          ? 'Change Pieces'
          : 'loc'
          ? 'Change Racking Location'
          : ' Split Tag',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      if (type === 'length') {
        this.updateLength(val);
      } else if (type === 'width') {
        this.updateWidth(val);
      } else if (type === 'pieces') {
        this.updatePieces(val);
      } else if (type === 'loc') {
        this.onUpdateClick(val);
      } else {
        this.updateTag();
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

  splitTag() {
    this.ref = this.dialogService.open(SearchModalComponent, {
      header: 'Split Tag',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((val) => {
      this.updateTag();
    });
  }

  updateStatus() {
    if (
      !this.selectedOrder.LOC.startsWith('IN') &&
      +this.selectedOrder.STATUS === 2
    ) {
      this.loadingService.setLoading(true);
      this.selectedOrder = [];
      this.tagService.sendStatus('1').subscribe(
        (data) => {
          this.confirm();
          this.loadingService.setLoading(false);
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

  confirm(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to finish receving ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Finished Receving'});
          this.router.navigateByUrl('tag-list');
      },
      reject: () => {
          this.messageService.add({severity:'error', summary:'Rejected', detail:'Not proceeded further'});
          this.loadOrder();
      }
  });
  console.log('this is working');
  }
}
