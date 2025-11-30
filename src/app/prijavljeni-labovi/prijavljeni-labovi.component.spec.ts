import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavljeniLaboviComponent } from './prijavljeni-labovi.component';

describe('PrijavljeniLaboviComponent', () => {
  let component: PrijavljeniLaboviComponent;
  let fixture: ComponentFixture<PrijavljeniLaboviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavljeniLaboviComponent]
    });
    fixture = TestBed.createComponent(PrijavljeniLaboviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
