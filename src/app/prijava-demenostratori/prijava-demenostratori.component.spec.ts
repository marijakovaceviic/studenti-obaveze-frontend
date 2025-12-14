import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaDemenostratoriComponent } from './prijava-demenostratori.component';

describe('PrijavaDemenostratoriComponent', () => {
  let component: PrijavaDemenostratoriComponent;
  let fixture: ComponentFixture<PrijavaDemenostratoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavaDemenostratoriComponent]
    });
    fixture = TestBed.createComponent(PrijavaDemenostratoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
