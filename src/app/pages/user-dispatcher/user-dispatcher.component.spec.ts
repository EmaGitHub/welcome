import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDispatcherComponent } from './user-dispatcher.component';

describe('UserDispatcherComponent', () => {
  let component: UserDispatcherComponent;
  let fixture: ComponentFixture<UserDispatcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDispatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
