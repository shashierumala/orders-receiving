import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppLoadingService } from '../services/app-loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  showLoading = false;
  constructor(private app: AppLoadingService, private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.app.getLoading().subscribe((status: boolean) => {
      this.showLoading = status;
      this.cdf.detectChanges();
    });
  }

}
