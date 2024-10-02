import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrennaDetailsComponent } from './strenna-details.component';

describe('StrennaDetailsComponent', () => {
  let component: StrennaDetailsComponent;
  let fixture: ComponentFixture<StrennaDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrennaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrennaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
