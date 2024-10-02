import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SolutionVersion } from './solution-info.component';

describe('SolutionVersion', () => {
  let component: SolutionVersion;
  let fixture: ComponentFixture<SolutionVersion>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionVersion ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
