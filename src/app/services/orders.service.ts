import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../orders';
import { EmployeeInfo } from '../employee';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  hostUrl: string = environment.url;
  receiveUrl: string = '/receiving?dist=';
  printUrl: string = '/receiving/pit';
  selectUrl: string = 'receiving?';
  locUrl: string = '/receiving/change/loc';
  widUrl: string = '/receiving/change/wid';
  lenUrl: string = '/receiving/change/len';
  stsUrl: string = '/receiving/change/sts';
  selectedOrder!: Order;
  selectedEmployee!: EmployeeInfo;
  selectedDist!: string;
  employee!: EmployeeInfo;
  searchPo = new BehaviorSubject<string>('');

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

  selectOrder(dist: string, item: string, tag: string) {
    console.log('this should work')
    let params = new HttpParams();
    params = params.append('dist', dist);
    params = params.append('item', item);
    params = params.append('tag', tag);
    return this.http.get<any>(`${this.hostUrl}${this.selectUrl}`, { params });
  }

  printTag(dist: string, tag: string, item: string) {
    let params = new HttpParams();
    params = params.append('item', item);
    params = params.append('dist', dist);
    params = params.append('tag', tag);
    return this.http.get<any>(`${this.hostUrl}${this.printUrl}`, { params });
  }

  sendLocation(loc: string) {
    console.log('this works')
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

  sendLength(len: Number) {
    const dist = `${this.selectedEmployee.EMPDIST}`;
    const add_user = `${this.selectedEmployee.EMPID}`;
    const requestObject = {
      systemName: this.selectedEmployee.EMPSystemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_length: len,
      add_user,
    };
    return this.http.post(`${this.hostUrl}${this.lenUrl}`, {
      ...requestObject,
    });
  }

  sendWidth(wid: Number) {
    const dist = `${this.selectedEmployee.EMPDIST}`;
    const add_user = `${this.selectedEmployee.EMPID}`;
    const requestObject = {
      systemName: this.selectedEmployee.EMPSystemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_width: wid,
      add_user,
    };
    return this.http.post(`${this.hostUrl}${this.widUrl}`, {
      ...requestObject,
    });
  }

  sendStatus(sts: string) {
    const dist = `${this.selectedEmployee.EMPDIST}`;
    const add_user = `${this.selectedEmployee.EMPID}`;
    const requestObject = {
      systemName: this.selectedEmployee.EMPSystemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_status: sts,
      add_user,
    };
    return this.http.post(`${this.hostUrl}${this.stsUrl}`, {
      ...requestObject,
    });
  }
}
