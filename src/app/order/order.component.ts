import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() selectedOrder: any;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {}

  selectOrder(data: any) {
    this.ordersService.selectedOrder = data;
    localStorage.setItem('order-summary', JSON.stringify(data));
    this.router.navigate(['order-summary/api/receiving'], {
      queryParams: { dist: data.DIST, item: data.ITEM, tag: data.TAG },
    });
  }
}
