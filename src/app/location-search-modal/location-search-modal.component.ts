import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent implements OnInit {
   
  value = '';
  errorMessage!: string;
  
  constructor(private orderService: OrdersService, private  ref: DynamicDialogRef) { }

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
