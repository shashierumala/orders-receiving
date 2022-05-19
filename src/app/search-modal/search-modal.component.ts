import { Component, OnInit } from '@angular/core';
import { Order } from '../orders';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  poNumber = '';
  searchedPO!: Order;
  errorMessage!: string;
  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.searchPo.next('');
  }

  onSubmit() {
    this.orderService.searchPo.next(this.poNumber);
  }
  clear() {
    this.poNumber = '';
  }
}
