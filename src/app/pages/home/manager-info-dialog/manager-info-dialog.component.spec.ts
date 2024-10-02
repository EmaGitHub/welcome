import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagerInfoDialogComponent } from './manager-info-dialog.component';

describe('ManagerInfoDialogComponent', () => {
  let component: ManagerInfoDialogComponent;
  let fixture: ComponentFixture<ManagerInfoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
