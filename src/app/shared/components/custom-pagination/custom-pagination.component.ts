import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  selectedPage: number;
  pageOptions: number[] = [];

  selectedPageSize: number;
  pageSizeOptions: number[] = [6, 12, 24];

  ngOnInit() {
    this.selectedPage = this.currentPage.valueOf();
    this.selectedPageSize = this.pageSizeOptions[1];
    this.generatePageOptions();
  }

  generatePageOptions(): void {
    this.pageOptions = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  changePageSize(pageSize: number): void {
    this.pageSizeChange.emit(pageSize)
  }




  firstTime : boolean = true ;



}
