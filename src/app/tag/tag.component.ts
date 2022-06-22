import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() selectedOrder: any;

  constructor(private tagService: TagService, private router: Router) {}

  ngOnInit(): void {}

  selectOrder(data: any) {
    this.router.navigate(['tag-summary/api/receiving'], {
      queryParams: { dist: data.DIST, item: data.ITEM, tag: data.TAG },
    });
  }
}
