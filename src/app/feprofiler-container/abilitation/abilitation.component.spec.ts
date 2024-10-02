import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AbilitationComponent } from './abilitation.component';

describe('AbilitationComponent', () => {
  let component: AbilitationComponent;
  let fixture: ComponentFixture<AbilitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
