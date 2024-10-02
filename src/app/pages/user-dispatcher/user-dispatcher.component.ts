import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ServiceCardModel } from '../home/services-cards/service-card.model';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-user-dispatcher',
  templateUrl: './user-dispatcher.component.html',
  styleUrls: ['./user-dispatcher.component.css'] 

})
export class UserDispatcherComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<div class="material-icons color-primary display-2" role="button" aria-label="Precedente">chevron_left</div>',
      '<div class="material-icons color-primary display-2" role="button" aria-label="Successivo">chevron_right</div>'
    ],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: true
  };

  servicesCards: ServiceCardModel[] = [];

  constructor(private userService: UserService) {}


  ngOnInit(): void {

    const sdsManagement: ServiceCardModel = {
      icon: 'ei-building',
      iconColor: 'color-green',
      title: 'availableRolesCards.sdsManagement',
      description: 'availableRolesCards.sdsDescription',
      actionLabel: 'generic.manage',
      route: 'home',
      isVisible: (
        (this.userService.getRoleForUser().isGlobalAdmin || this.userService.getRoleForUser().isCountryAdmin || this.userService.getRoleForUser().isSiteAdmin) 
        || this.userService.getRoleForUser().isStrenneOperator || this.userService.getRoleForUser().isStrenneAdmin)
    };


    const strenneManagement: ServiceCardModel = {
      icon: 'ei-info-o',
      iconColor: 'color-orange',
      title: 'availableRolesCards.strenneManagementUser',
      description: 'availableRolesCards.strenneDescription',
      actionLabel: 'generic.manage',
      route: 'user-page',
      isVisible: this.userService.getRoleForUser().isStrenneUser
    };

    this.servicesCards.push(sdsManagement , strenneManagement);
  }

}
