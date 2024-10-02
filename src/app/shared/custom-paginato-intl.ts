import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  
  constructor( private translateService : TranslateService) {
    super();
  }

  itemsPerPageLabel = this.translateService.instant("paginator.itemsPerPageLabel");
  nextPageLabel = this.translateService.instant("paginator.nextPageLabel") ;
  previousPageLabel =this.translateService.instant("paginator.previousPageLabel") ;
  firstPageLabel = this.translateService.instant("paginator.firstPageLabel");
  lastPageLabel = this.translateService.instant("paginator.lastPageLabel");
  








}