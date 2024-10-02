import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DELETE, GET, POST, PUT } from '../../shared/constants/api';
import { RestResponse } from '../../shared/model/message';
import { BaseService } from '../../shared/service/base.service';
import { Attribute } from './model/attribute.model';
import { Service } from './model/service.model';
import { Category } from './model/category.model';


@Injectable({
    providedIn: 'root'
})
export class ServiceAttributeService extends BaseService {

    // tslint:disable-next-line:variable-name
    private _services: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);
    public readonly services: Observable<Service[]> = this._services.asObservable();

    // tslint:disable-next-line:variable-name
    private _attributes: BehaviorSubject<Attribute[]> = new BehaviorSubject<Attribute[]>([]);
    public readonly attributes: Observable<Attribute[]> = this._attributes.asObservable();

    // tslint:disable-next-line:variable-name
    private _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    public readonly categories: Observable<Category[]> = this._categories.asObservable();

    // tslint:disable-next-line:variable-name
    private _saveServiceAttributeDone: Subject<any> = new Subject<any>();
    public readonly saveServiceAttributeDone: Observable<any> = this._saveServiceAttributeDone.asObservable();

    constructor(http: HttpClient, private translate: TranslateService) {
        super(http);
    }

    public getAllServices(): void {
        this.dispatchRestCall(GET.allServices, {
            params: {
                lang: this.translate.currentLang.toUpperCase(),
                filter: ''
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<Service[]>) => {
                    this._services.next(response.output);
                });
    }

    public getAllAttributes(callback?: () => void, errorCallback?: () => void): void {
        this.dispatchRestCall(GET.allAttributes, {
            params: {
                lang: this.translate.currentLang.toUpperCase(),
                filter: ''
            }
        }).pipe()
            .subscribe(
                (response: RestResponse<Attribute[]>) => {
                    this._attributes.next(response.output);
                    if (callback) {
                        callback();
                    }
                },
                (error) => {
                    if (errorCallback) {
                        errorCallback();
                    }
                });
    }

    public getAllCategories() {
    this.dispatchRestCall(GET.allCategories, {
        params: {
            lang: this.translate.currentLang.toUpperCase(),
            filter: ''
        }
    }).pipe()
        .subscribe(
            (response: RestResponse<Category[]>) => {
                this._categories.next(response.output);
            });
    }

    public saveService(service: Service): void {
        this.dispatchRestCall(POST.saveService, {
            data: service
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public updateService(service: Service): void {
        this.dispatchRestCall(PUT.updateService, {
            data: service
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public deleteService(serviceId: number): Observable<RestResponse<any>> {
        return this.dispatchRestCall(DELETE.deleteService, {
            pathParams: {
                serviceId
            }
        }).pipe();
    }

    public saveAttribute(attribute: Attribute): void {
        this.dispatchRestCall(POST.saveAttribute, {
            data: attribute
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public updateAttribute(attribute: Attribute): void {
        this.dispatchRestCall(PUT.updateAttribute, {
            data: attribute
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public deleteAttribute(attributeId: number): Observable<RestResponse<any>> {
        return this.dispatchRestCall(DELETE.deleteAttribute, {
            pathParams: {
                attributeId
            }
        }).pipe();
    }


    public saveCategory(category: Category): void {
        this.dispatchRestCall(POST.saveCategory, {
            data: category
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public updateCategory(category: Category): void {
        this.dispatchRestCall(PUT.updateCategory, {
            data: category
        }).pipe()
            .subscribe(
                (response: RestResponse<string>) => {
                    this._saveServiceAttributeDone.next(response);
                });
    }

    public deleteCategory(categoryId: number): Observable<RestResponse<any>> {
        return this.dispatchRestCall(DELETE.deleteCategory, {
            pathParams: {
                categoryId
            }
        }).pipe();
    }



    public getCategoryById(serviceId: number): Observable<RestResponse<any>> {
        return this.dispatchRestCall(GET.getCategoryByServiceId, {
            pathParams: {
                serviceId
            }
        }).pipe();
    }


}
