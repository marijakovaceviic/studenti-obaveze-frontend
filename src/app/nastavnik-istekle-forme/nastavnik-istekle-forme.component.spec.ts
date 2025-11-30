import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikIstekleFormeComponent } from './nastavnik-istekle-forme.component';

describe('NastavnikIstekleFormeComponent', () => {
  let component: NastavnikIstekleFormeComponent;
  let fixture: ComponentFixture<NastavnikIstekleFormeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikIstekleFormeComponent]
    });
    fixture = TestBed.createComponent(NastavnikIstekleFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
