import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './order.component.html',
  providers: []
})
export class OrderComponent {

  @Output() createClick = new EventEmitter();

  @Output() handleFilter = new EventEmitter();

  @Input() control: {
    name: string;
  };


  changeSearch(key, value) {
    this.handleFilter.emit({key, value});
  }

}
