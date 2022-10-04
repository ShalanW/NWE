import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConfirmationDialogComponent } from './global-confirmation-dialog.component';

describe('GlobalConfirmationDialogComponent', () => {
  let component: GlobalConfirmationDialogComponent;
  let fixture: ComponentFixture<GlobalConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
