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

  setLoading(loading: boolean): void {
    this.loadingSub.next(loading);
  }


}
