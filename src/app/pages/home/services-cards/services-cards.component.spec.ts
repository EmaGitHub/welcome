import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesCardsComponent } from './services-cards.component';

describe('ServicesCardsComponent', () => {
  let component: ServicesCardsComponent;
  let fixture: ComponentFixture<ServicesCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
