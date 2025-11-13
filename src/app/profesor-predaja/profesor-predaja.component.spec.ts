import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorPredajaComponent } from './profesor-predaja.component';

describe('ProfesorPredajaComponent', () => {
  let component: ProfesorPredajaComponent;
  let fixture: ComponentFixture<ProfesorPredajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorPredajaComponent]
    });
    fixture = TestBed.createComponent(ProfesorPredajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
