import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() page = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Input() collectionSize: number;
  @Input() pageSize = 10;
  @Input() maxSize = 4;
  @Input() ellipses = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChangePage(page: number): void {
    this.pageChange.emit(page);
  }

}
