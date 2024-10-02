import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NuovaStrennaFormComponent } from './nuova-strenna-form.component';

describe('NuovaStrennaFormComponent', () => {
  let component: NuovaStrennaFormComponent;
  let fixture: ComponentFixture<NuovaStrennaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovaStrennaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovaStrennaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
