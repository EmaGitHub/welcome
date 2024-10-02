import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceAttributeType } from '../../../shared/constants/ServiceAttributeType';
import { HttpClient } from '@angular/common/http';
import { ServiceAttributeService } from '../services-attributes-management.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Category } from '../model/category.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-handle-service-attribute-dialog',
  templateUrl: './handle-service-attribute-dialog.component.html',
  styleUrls: ['./handle-service-attribute-dialog.component.scss']
})
export class HandleServiceAttributeDialogComponent implements OnInit, OnDestroy ,  AfterViewInit{

  type: ServiceAttributeType;
  icons: any;
  selectedIcon: string;
  toggleIcon = false;
  serviceName: string;
  isEditing: boolean;
  isAttachment: boolean = false;
  saveServiceAttributeDoneSub: Subscription;

  selectedCategoryOption: Category;
  categoryOptions: Category[];
  categoriesSub: Subscription;

  myC: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private serviceAttributeService: ServiceAttributeService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.type = this.data.type;

    this.httpClient.get('assets/styles/fonts/icons/selection.json').subscribe((data: any) => {
      if (this.type !== 'CATEGORY')
        this.icons = data.icons;
    });


    console.log("this.data.serviceAttribute", this.data.serviceAttribute)

    if (this.data.serviceAttribute) {
      this.serviceName = this.data.serviceAttribute.name;
      this.selectedIcon = this.data.serviceAttribute.icon;
      this.isEditing = true;
      this.selectedCategoryOption = this.data.serviceAttribute.category;
      if (!(this.type === 'SERVICE')) {
        this.isAttachment = this.data.serviceAttribute.is_attachment;
      }
    }


    this.categoriesSub = this.serviceAttributeService.categories
      .subscribe((categories) => {
        this.categoryOptions = categories;
        this.categoryOptions = this.categoryOptions.map(category => category);
      });

    this.saveServiceAttributeDoneSub = this.serviceAttributeService.saveServiceAttributeDone
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }


  saveServiceAttribute() {
    if (this.type === 'SERVICE') {
      console.log("assegno", this.selectedCategoryOption);
      if (this.isEditing) {
        this.serviceAttributeService.updateService({
          icon: this.selectedIcon,
          name: this.serviceName,
          id_service: this.data.serviceAttribute.id_service,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: this.data.serviceAttribute.is_deleted,
          is_disabled: this.data.serviceAttribute.is_disabled,
          position: this.data.serviceAttribute.position,
          category: this.selectedCategoryOption ? this.selectedCategoryOption : this.data.serviceAttribute.category
        });
      } else {
        this.serviceAttributeService.saveService({
          icon: this.selectedIcon,
          name: this.serviceName,
          id_service: 0,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: false,
          is_disabled: false,
          position: 0,
          category: this.selectedCategoryOption

        });
      }
    }
    if (this.type === 'ATTRIBUTE') {
      if (this.isEditing) {
        this.serviceAttributeService.updateAttribute({
          icon: this.selectedIcon,
          name: this.serviceName,
          id_att_service: this.data.serviceAttribute.id_att_service,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: this.data.serviceAttribute.is_deleted,
          is_attachment: this.isAttachment,
          position: this.data.serviceAttribute.position
        });
      } else {
        this.serviceAttributeService.saveAttribute({
          icon: this.selectedIcon,
          name: this.serviceName,
          id_att_service: 0,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: false,
          is_attachment: this.isAttachment,
          position: 0
        });
      }
    }
    if (this.type === 'CATEGORY') {
      if (this.isEditing) {

        this.serviceAttributeService.updateCategory({
          name: this.serviceName,
          id_category: this.data.serviceAttribute.id_category,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: this.data.serviceAttribute.is_deleted,
          is_disabled: this.data.serviceAttribute.is_disabled,
          position: this.data.serviceAttribute.position
        });
      } else {
        this.serviceAttributeService.saveCategory({
          name: this.serviceName,
          id_category: 0,
          language: this.translate.currentLang.toUpperCase(),
          is_deleted: false,
          is_disabled: false,
          position: 0
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.categoryOptions.forEach(element => {
      if (element.id_category === this.data.serviceAttribute.category.id_category) {
        this.selectedCategoryOption = element ; 
        this.cdr.detectChanges() ; 
        return ;
      }
      
    });
  }
  getTitle() {
    if (this.type === 'SERVICE') {
      return this.isEditing ? 'saManagement.editService' : 'saManagement.newService';
    }
    if (this.type === 'ATTRIBUTE') {
      return this.isEditing ? 'saManagement.editAttribute' : 'saManagement.newAttribute';
    }
    if (this.type === 'CATEGORY') {
      return this.isEditing ? 'saManagement.editCategory' : 'saManagement.newCategory';
    }
  }

  selectIcon(icon) {
    this.selectedIcon = icon;
    this.toggleIcon = false;
  }

  ngOnDestroy(): void {
    this.saveServiceAttributeDoneSub.unsubscribe();
  }

}
