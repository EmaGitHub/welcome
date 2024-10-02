import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStrenneManagementService {
  private isAllSelectedSubject = new BehaviorSubject<boolean>(false);

  public isAllSelected: boolean;

  public setIsAllSelected(valore: boolean) {
    this.isAllSelected = valore;
    this.isAllSelectedSubject.next(valore);
  }

  public getIsAllSelected() {
    return this.isAllSelected;

  }

  constructor() { }
}
