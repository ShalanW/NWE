import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulerContactComponent } from './hauler-contact.component';

describe('HaulerContactComponent', () => {
  let component: HaulerContactComponent;
  let fixture: ComponentFixture<HaulerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaulerContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaulerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
