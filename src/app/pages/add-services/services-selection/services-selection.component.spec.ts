import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesSelectionComponent } from './services-selection.component';

describe('ServicesSelectionComponent', () => {
  let component: ServicesSelectionComponent;
  let fixture: ComponentFixture<ServicesSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
