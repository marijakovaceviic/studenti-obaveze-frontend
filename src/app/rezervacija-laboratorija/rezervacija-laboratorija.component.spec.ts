import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaLaboratorijaComponent } from './rezervacija-laboratorija.component';

describe('RezervacijaLaboratorijaComponent', () => {
  let component: RezervacijaLaboratorijaComponent;
  let fixture: ComponentFixture<RezervacijaLaboratorijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijaLaboratorijaComponent]
    });
    fixture = TestBed.createComponent(RezervacijaLaboratorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
