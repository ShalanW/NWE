import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCallAccountDialogComponent } from './on-call-account-dialog.component';

describe('OnCallAccountDialogComponent', () => {
  let component: OnCallAccountDialogComponent;
  let fixture: ComponentFixture<OnCallAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnCallAccountDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnCallAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
