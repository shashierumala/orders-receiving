import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss'],
})
export class LocationSearchModalComponent implements OnInit {
  value = '';
  errorMessage!: string;
  lengthValue = 7;
  constructor(
    private tagService: TagService,
    private ref: DynamicDialogRef,
   private  config: DynamicDialogConfig
  ) {
    const length = config?.data?.searchLength;
    if (length) {
      this.lengthValue = length;
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.config?.data?.isNewPO){
      this.tagService.searchValue.next(this.value);
    }
    this.ref.close(this.value);
  }
  clear() {
    this.value = '';
  }
}
