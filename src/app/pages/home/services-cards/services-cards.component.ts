import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from '../../../shared/service/user.service';
import { ServiceCardModel } from './service-card.model';

@Component({
  selector: 'app-services-cards',
  templateUrl: './services-cards.component.html',
  styleUrls: ['./services-cards.component.css']
})
export class ServicesCardsComponent implements OnInit {

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

  constructor(private userService: UserService) { }

  
  ngOnInit(): void {

    const siteManagement: ServiceCardModel = {
      icon: 'ei-building',
      iconColor: 'color-green',
      title: 'availableServiceCards.sitesManagement',
      description: 'availableServiceCards.sitesManagementDescription',
      actionLabel: 'generic.manage',
      route: 'sites-management',
      isVisible: (this.userService.getRoleForUser().isGlobalAdmin || this.userService.getRoleForUser().isCountryAdmin || this.userService.getRoleForUser().isSiteAdmin)
    };
    const saManagement: ServiceCardModel = {
      icon: 'ei-settings',
      iconColor: 'color-orange',
      title: 'availableServiceCards.servicesAttributesManagement',
      description: 'availableServiceCards.servicesAttributesManagementDescription',
      actionLabel: 'generic.manage',
      route: 'service-attribute-management',
      isVisible: this.userService.getRoleForUser().isGlobalAdmin
    };
    const adminManagement: ServiceCardModel = {
      icon: 'ei-location',
      iconColor: 'color-warn',
      title: 'availableServiceCards.adminManagement',
      description: 'availableServiceCards.adminManagementDescription',
      actionLabel: 'generic.manage',
      route: 'admins-management',
      isVisible: (this.userService.getRoleForUser().isGlobalAdmin || this.userService.getRoleForUser().isCountryAdmin)
    };

    const strenneManagement: ServiceCardModel = {
      icon: 'strenne-gift',
      iconColor: 'color-green',
      title: 'availableServiceCards.manageStrenne',
      description: 'availableServiceCards.adminStrenneDescription',
      actionLabel: 'generic.manage',
      route: 'strenne-management',
      isVisible: (this.userService.getRoleForUser().isStrenneOperator || this.userService.getRoleForUser().isStrenneAdmin)
    };

    const strenneManagementUser: ServiceCardModel = {
      icon: 'strenne-gift',
      iconColor: 'color-green',
      title: 'availableRolesCards.strenneManagementUser',
      description: 'availableRolesCards.strenneDescription',
      actionLabel: 'generic.manage',
      route: 'user-page',
      isVisible: this.userService.getRoleForUser().isStrenneUser
    };



    
    this.servicesCards.push(siteManagement, saManagement, adminManagement , strenneManagement , strenneManagementUser);
  }

}
