import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Order} from '../../shared/model/message';


@Component({
  selector: 'app-list-message',
  templateUrl: './list-order.component.html'
})
export class ListOrderComponent {

  gridOptions = {
    buttons: [{
      name: 'deleteButton',
      icon: 'delete',
      tooltip: 'Delete'
    }]
  };

  @Input() data: Array<Order>;
  @Input() isLoaded = false;

  @Output() deleteTask = new EventEmitter();

  @Output() editTask = new EventEmitter();
  idEdit = null;
  dataEdit: {
    orderId: 0,
    message: ''
  };


  clickEdit(item) {
    const {orderId} = item;
    this.idEdit = orderId;
  }

  editSubmit() {
    this.editTask.emit({
      orderId: this.idEdit,
      ...this.dataEdit
    });

    this.idEdit = null;
  }

  delete(elem) {
    this.deleteTask.emit(elem);
  }

}
