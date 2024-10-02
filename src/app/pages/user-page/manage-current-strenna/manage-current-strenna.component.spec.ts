import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageCurrentStrennaComponent } from './manage-current-strenna.component';

describe('ManageCurrentStrennaComponent', () => {
  let component: ManageCurrentStrennaComponent;
  let fixture: ComponentFixture<ManageCurrentStrennaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCurrentStrennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCurrentStrennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
