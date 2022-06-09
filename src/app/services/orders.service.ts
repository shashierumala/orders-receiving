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
  selectUrl: string = '/receiving/detail?';
  locUrl: string = '/receiving/change/loc';
  widUrl: string = '/receiving/change/wid';
  lenUrl: string = '/receiving/change/len';
  stsUrl: string = '/receiving/change/sts';
  pcsUrl: string = '/receiving/change/pcs';
  selectedOrder!: Order;
  selectedEmployee!: EmployeeInfo;
  selectedDist!: string;
  employee!: EmployeeInfo;
  searchValue = new BehaviorSubject<string>('');
  searchValue1 = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getOrders() {
    let dist;
    if (this.selectedDist) {
      dist = this.selectedDist;
    } else {
      const dists: any = localStorage.getItem('DIST');
      dist = JSON.parse(dists);
    }
    return this.http.get<any>(`${this.hostUrl}${this.receiveUrl}${dist}`);
  }

  selectOrder(dist: string, item: string, tag: string) {
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
    const dist = localStorage.getItem('DIST');
    const add_user = localStorage.getItem('EmployeeID');
    const systemName = localStorage.getItem('EMPSystemName');
    const requestObject = {
      systemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_location: loc,
      add_user,
    };
    return this.http.post<any>(`${this.hostUrl}${this.locUrl}`, {
      ...requestObject,
    });
  }


  savePO(requestObject: any) {
   
    return this.http.post<any>(`${this.hostUrl}${this.locUrl}`, {
      ...requestObject,
    });
  }

  sendLength(len: Number) {
    const dist = localStorage.getItem('DIST');
    const add_user = localStorage.getItem('EmployeeID');
    const systemName = localStorage.getItem('EMPSystemName');
    const requestObject = {
      systemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_length: len,
      add_user,
    };
    return this.http.post<any>(`${this.hostUrl}${this.lenUrl}`, {
      ...requestObject,
    });
  }

  sendWidth(wid: Number) {
    const dist = localStorage.getItem('DIST');
    const add_user = localStorage.getItem('EmployeeID');
    const systemName = localStorage.getItem('EMPSystemName');
    const requestObject = {
      systemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_width: wid,
      add_user,
    };
    return this.http.post<any>(`${this.hostUrl}${this.widUrl}`, {
      ...requestObject,
    });
  }

  sendPieces(pcs: Number) {
    const dist = localStorage.getItem('DIST');
    const add_user = localStorage.getItem('EmployeeID');
    const systemName = localStorage.getItem('EMPSystemName');
    const requestObject = {
      systemName,
      dist,
      item: this.selectedOrder.ITEM,
      tag: this.selectedOrder.TAG?.trim(),
      new_pcs: pcs,
      add_user,
    };
    return this.http.post<any>(`${this.hostUrl}${this.pcsUrl}`, {
      ...requestObject,
    });
  }

  sendStatus(sts: string) {
    const dist = localStorage.getItem('DIST');
    const add_user = localStorage.getItem('EmployeeID');
    const systemName = localStorage.getItem('EMPSystemName');
    const requestObject = {
      systemName,
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
