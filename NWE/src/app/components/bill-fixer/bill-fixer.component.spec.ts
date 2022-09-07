import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFixerComponent } from './bill-fixer.component';

describe('BillFixerComponent', () => {
  let component: BillFixerComponent;
  let fixture: ComponentFixture<BillFixerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillFixerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillFixerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
