import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  value = '';
  errorMessage!: string;
  isPoNumber = false;
  constructor(
    private tagService: TagService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    const poNum = config?.data?.isPONumber;
    if (poNum) {
      this.isPoNumber = true;
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.isPoNumber ? this.value.length >= 7 : this.value) {
      this.tagService.searchValue.next(this.value);
      this.ref.close(this.value);
    }
    {
      this.errorMessage = 'Provide valid PO Number';
    }
  }
  clear() {
    this.value = '';
    this.errorMessage = '';
  }
}
