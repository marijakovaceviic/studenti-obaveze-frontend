import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikAktivneFormeComponent } from './nastavnik-aktivne-forme.component';

describe('NastavnikAktivneFormeComponent', () => {
  let component: NastavnikAktivneFormeComponent;
  let fixture: ComponentFixture<NastavnikAktivneFormeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikAktivneFormeComponent]
    });
    fixture = TestBed.createComponent(NastavnikAktivneFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
