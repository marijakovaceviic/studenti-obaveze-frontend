import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikOtvaranjeFormeComponent } from './nastavnik-otvaranje-forme.component';

describe('NastavnikOtvaranjeFormeComponent', () => {
  let component: NastavnikOtvaranjeFormeComponent;
  let fixture: ComponentFixture<NastavnikOtvaranjeFormeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikOtvaranjeFormeComponent]
    });
    fixture = TestBed.createComponent(NastavnikOtvaranjeFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
