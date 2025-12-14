import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikPromenaLozinkeComponent } from './nastavnik-promena-lozinke.component';

describe('NastavnikPromenaLozinkeComponent', () => {
  let component: NastavnikPromenaLozinkeComponent;
  let fixture: ComponentFixture<NastavnikPromenaLozinkeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikPromenaLozinkeComponent]
    });
    fixture = TestBed.createComponent(NastavnikPromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
