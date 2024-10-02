import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpansionPanelFiltersComponent } from './expansion-panel-filters.component';

describe('ExpansionPanelFiltersComponent', () => {
  let component: ExpansionPanelFiltersComponent;
  let fixture: ComponentFixture<ExpansionPanelFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionPanelFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
