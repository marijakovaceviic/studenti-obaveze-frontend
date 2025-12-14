import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledRezervacijaLabComponent } from './pregled-rezervacija-lab.component';

describe('PregledRezervacijaLabComponent', () => {
  let component: PregledRezervacijaLabComponent;
  let fixture: ComponentFixture<PregledRezervacijaLabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledRezervacijaLabComponent]
    });
    fixture = TestBed.createComponent(PregledRezervacijaLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
