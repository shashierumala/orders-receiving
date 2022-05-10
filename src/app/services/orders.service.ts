import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  hostUrl: string = environment.url;
  receiveUrl: string = '/receiving?dist=';
  printUrl: string = '/receiving/pit';
  locUrl: string = '/receiving/change/loc';
  selectedOrder!: Order;
  selectedEmployee!: EmployeeInfo;
  selectedDist!: string;
  employee!: EmployeeInfo;

  constructor(private http: HttpClient) {}

  getOrders() {
    let dist;
    if (this.selectedDist) {
      dist = this.selectedDist;
    } else {
      const dists: any = localStorage.getItem('order-Info');
      dist = JSON.parse(dists);
    }
    return this.http.get<any>(`${this.hostUrl}${this.receiveUrl}${dist}`);
  }

  printTag(dist: string, tag: string, item: string) {
    let params = new HttpParams();
    params = params.append('item', item);
    params = params.append('dist', dist);
    params = params.append('tag', tag);
    return this.http.get<any>(`${this.hostUrl}${this.printUrl}`, { params });
  }

  sendLocation(loc: string) {
    const dist = `${this.selectedEmployee.EMPDIST}`;
    const add_user = `${this.selectedEmployee.EMPID}`;
    const requestObject = {
      systemName: this.selectedEmployee.EMPSystemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_location: loc,
      add_user,
    };
    return this.http.post(`${this.hostUrl}${this.locUrl}`, {
      ...requestObject,
    });
  }
}
