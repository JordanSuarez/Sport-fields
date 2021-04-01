import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  // Paginator Inputs
  @Input() length!: number;
  @Input() pageSize!: number;

  // Paginator Output
  @Output() paginatorEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageEvent(event: PageEvent): void {
    this.paginatorEvent.emit(event);
  }
}
