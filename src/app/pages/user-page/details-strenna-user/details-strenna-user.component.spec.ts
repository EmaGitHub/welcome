import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsStrennaUserComponent } from './details-strenna-user.component';

describe('DetailsStrennaUserComponent', () => {
  let component: DetailsStrennaUserComponent;
  let fixture: ComponentFixture<DetailsStrennaUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStrennaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStrennaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
