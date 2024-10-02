import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditStennaComponent } from './edit-stenna.component';

describe('EditStennaComponent', () => {
  let component: EditStennaComponent;
  let fixture: ComponentFixture<EditStennaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
