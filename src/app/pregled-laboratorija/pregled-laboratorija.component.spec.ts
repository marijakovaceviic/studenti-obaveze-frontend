import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledLaboratorijaComponent } from './pregled-laboratorija.component';

describe('PregledLaboratorijaComponent', () => {
  let component: PregledLaboratorijaComponent;
  let fixture: ComponentFixture<PregledLaboratorijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledLaboratorijaComponent]
    });
    fixture = TestBed.createComponent(PregledLaboratorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
