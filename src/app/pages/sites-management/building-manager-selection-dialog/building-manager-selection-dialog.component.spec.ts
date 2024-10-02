import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuildingManagerSelectionDialogComponent } from './building-manager-selection-dialog.component';

describe('BuildingManagerSelectionDialogComponent', () => {
  let component: BuildingManagerSelectionDialogComponent;
  let fixture: ComponentFixture<BuildingManagerSelectionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingManagerSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingManagerSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
