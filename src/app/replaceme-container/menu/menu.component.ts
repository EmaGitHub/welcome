import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pizza-shack',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  @Input() data = [];

  @Output() loadMenu = new EventEmitter();

  @Input() testApiStatus: number;


  menu(){
    this.loadMenu.emit();
  }
  clear() {
    this.data = [];
  }


}
