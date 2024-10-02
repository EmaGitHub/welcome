import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  isSubmit = false;
  isValid = true;
  order = '';

  @Output() addOrder = new EventEmitter();


  onSubmit() {
    this.isSubmit = true;
    if (this.order !== '') {
      this.addOrder.emit(this.order);
      this.isSubmit = false;
    }
  }

  clear() {
    this.isValid = false;
    this.isSubmit = false;
  }

  onChangeValue(value) {
    this.isValid = !!value;
  }

    changeInput(event: any) {
        this.order = event.detail;
    }
}
