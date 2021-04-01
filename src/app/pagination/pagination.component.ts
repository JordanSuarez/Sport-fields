import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {PaginatorModel} from 'src/app/models/paginator.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  // Paginator Inputs
  @Input() paginator!: PaginatorModel;

  // Paginator Output
  @Output() paginatorEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageEvent(event: PageEvent): void {
    this.paginatorEvent.emit(event);
  }
}
