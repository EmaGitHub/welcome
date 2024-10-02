import {Component} from '@angular/core';
import {OrderService} from '../shared/service/order.service';
import {ActivityService} from '../shared/service/activity.service';
import {MenuService} from '../shared/service/menu.service';

@Component({
    selector: 'app-replaceme-container',
    templateUrl: './replaceme-container.component.html'
})
export class ReplacemeContainerComponent {

    menu = [];
    menuInt = [];

    saml: string;

    testApiStatus: number;

    user: string;
    index = 0;
    userData = [];

    data = [];

    isLoadedOrder = false;

    constructor(private menuService: MenuService,
                private activityService: ActivityService,
                private orderService: OrderService) {
    }

    updateUserId(value) {
        this.user = value;
        this.userData = [];
    }

    loadMenu() {

        this.menuService.menu().subscribe(menu => {
            this.menu = menu;
        });
    }

    loadMenuInternal() {
        this.menuService.menuInternal().subscribe(menuInt => {
            this.menuInt = menuInt;
        });
    }

    addOrder(data) {
        const input = {
            customerName: data
        };
        this.orderService.addOrder(input, this.user).subscribe(result => {
            if (result) {
                this.data.unshift({
                    orderId: result.orderId, customerName: result.customerName
                });
                return this.data;
            }
        });
    }

    deleteOrder(id: number) {
        this.orderService.deleteOrder(id, this.user).subscribe(result => {
            if (result) {
                const index = this.data.findIndex(order => order.orderId === id);
                if (index >= 0) {
                    this.data.splice(index, 1);
                }
            }
        });
    }

}
