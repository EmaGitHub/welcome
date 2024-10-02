import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServiceAttributeType } from '../../../shared/constants/ServiceAttributeType';
import { DialogService } from '../../../shared/service/dialog.service';
import { AddServiceAttributeType } from '../add-service-attribute/service-attribute-type.model';
import { HandleServiceAttributeDialogComponent } from '../handle-service-attribute-dialog/handle-service-attribute-dialog.component';
import { Category } from '../model/category.model';
import { ServiceAttributeCard } from '../service-attribute-card/service-attribute-card.model';
import { ServiceAttributeService } from '../services-attributes-management.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {

  categories: Category[];
  filteredCategories: Category[];
  categoriesSub: Subscription;
  saveServiceAttributeDoneSub: Subscription;
  confirmDialogSub: Subscription;
  filterText: string;

  type: AddServiceAttributeType = {
    searchTitle: 'saManagement.category',
    searchPlaceholder: 'saManagement.searchCategory',
    button: 'saManagement.newCategory'
  };

  constructor(private serviceAttributeService: ServiceAttributeService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {



    this.serviceAttributeService.getAllCategories();

    this.categoriesSub = this.serviceAttributeService.categories
      .subscribe((categories) => {
        this.categories = categories;
        this.filteredCategories = categories;
        if (this.filterText) {
          this.filterList(this.filterText);
        }
      });

    this.saveServiceAttributeDoneSub = this.serviceAttributeService.saveServiceAttributeDone.subscribe(() => {
      setTimeout(() => {
        this.dialogService.openSuccessDialog('saManagement.saveCategorySuccess');
      }, 500);
      this.serviceAttributeService.getAllCategories();
    });
  }


  filterList(filter: string) {
    this.filterText = filter;
    if (this.filterText) {
      this.filteredCategories = this.categories.filter((category: Category) => {
        return category.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;
      });
    } else {
      this.filteredCategories = this.categories;
    }
  }

  addCategory() {
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute', // handle-category-attribute
      maxWidth: '800px',
      data: {
        type: ServiceAttributeType.CATEGORY
      }
    });
  }

  editCategory(serviceAttributeCard: ServiceAttributeCard) {
    // tslint:disable-next-line:variable-name
    const category: Category = this.categories.find((_category: Category) => {
      return _category.id_category === serviceAttributeCard.id;
    });
    this.dialog.open(HandleServiceAttributeDialogComponent, {
      id: 'handle-service-attribute',// handle-category-attribute
      maxWidth: '800px',
      data: {
        serviceAttribute: category,
        type: ServiceAttributeType.CATEGORY
      }
    });
  }

  deleteCategory(serviceAttributeCard: ServiceAttributeCard) {
    this.dialogService.openConfirmDialog('saManagement.confirmCategoryDelete', { category: serviceAttributeCard.name }, serviceAttributeCard);
    if (!this.confirmDialogSub || this.confirmDialogSub.closed) {
      this.confirmDialogSub = this.dialogService.confirm.subscribe((value: ServiceAttributeCard) => {
        this.serviceAttributeService.deleteCategory(value.id).subscribe(() => {
          this.dialog.closeAll();
          this.serviceAttributeService.getAllCategories();
          this.confirmDialogSub.unsubscribe();
          setTimeout(() => {
            this.dialogService.openSuccessDialog('saManagement.deleteCategorySuccess');
          }, 500);
        });
      });
    }
  }

  getCategory(category: Category): ServiceAttributeCard {

    return {
      id: category.id_category,
      
      is_deleted: category.is_deleted,
      name: category.name,
      language: category.language,
      
      type: ServiceAttributeType.CATEGORY,
    };
  }

  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe();
    this.saveServiceAttributeDoneSub?.unsubscribe();
  }

}
