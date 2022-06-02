import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  value = '';
  errorMessage!: string;
  isPoNumber = false;
  constructor(private orderService: OrdersService, private  ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    const poNum = config?.data?.isPONumber;
    if(poNum){
      this.isPoNumber = true;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.orderService.searchValue.next(this.value);
    this.ref.close(this.value)
  }
  clear() {
    this.value = '';
  }
}
