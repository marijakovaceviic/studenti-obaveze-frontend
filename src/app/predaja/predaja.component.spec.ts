import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredajaComponent } from './predaja.component';

describe('PredajaComponent', () => {
  let component: PredajaComponent;
  let fixture: ComponentFixture<PredajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredajaComponent]
    });
    fixture = TestBed.createComponent(PredajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
