import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReplacemeContainerRoutingModule} from './replaceme-container-routing.module';
import {UserComponent} from './user/user.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {ListOrderComponent} from './list-order/list-order.component';
import {MenuComponent} from './menu/menu.component';
import {OrderComponent} from './order/order.component';
import {ReplacemeContainerComponent} from './replaceme-container.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [ReplacemeContainerComponent, UserComponent, AddOrderComponent,
        ListOrderComponent, MenuComponent, OrderComponent],
    imports: [
        ReplacemeContainerRoutingModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        ReplacemeContainerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReplacemeContainerModule {
}
