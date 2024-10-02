import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrenneInputTextComponent } from './strenne-input-text.component';

describe('StrenneInputTextComponent', () => {
  let component: StrenneInputTextComponent;
  let fixture: ComponentFixture<StrenneInputTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StrenneInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenneInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
