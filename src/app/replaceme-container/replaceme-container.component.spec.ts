import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplacemeContainerComponent } from './replaceme-container.component';

describe('ReplacemeContainerComponent', () => {
  let component: ReplacemeContainerComponent;
  let fixture: ComponentFixture<ReplacemeContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacemeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacemeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
