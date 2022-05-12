import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoadingService {

  private loading =false; 
  private loadingSub = new BehaviorSubject<boolean>(false);

  refreshtime = new BehaviorSubject({});

  constructor() { }

  getLoading(): Observable<boolean> {
    return this.loadingSub.asObservable();
  }

  timestamp(): void {
    const d = new Date();
    this.refreshtime.next(d);
  }

  getTimestamp(): Observable<any> {
    return this.refreshtime.asObservable();
  }

  show(): void {
    this.loading = true;
    this.loadingSub.next(this.loading);
  }

  hide(): void {
    this.loading = false;
    this.loadingSub.next(this.loading);
  }
}
