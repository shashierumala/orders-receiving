import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  value = '';
  errorMessage!: string;
  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.searchValue.next('');
  }

  onSubmit() {
    this.orderService.searchValue.next(this.value);
  }
  clear() {
    this.value = '';
  }
}
