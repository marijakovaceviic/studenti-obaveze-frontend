import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavljeniIspitiComponent } from './prijavljeni-ispiti.component';

describe('PrijavljeniIspitiComponent', () => {
  let component: PrijavljeniIspitiComponent;
  let fixture: ComponentFixture<PrijavljeniIspitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavljeniIspitiComponent]
    });
    fixture = TestBed.createComponent(PrijavljeniIspitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
