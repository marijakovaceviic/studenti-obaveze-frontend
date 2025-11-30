import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikLoginComponent } from './nastavnik-login.component';

describe('NastavnikLoginComponent', () => {
  let component: NastavnikLoginComponent;
  let fixture: ComponentFixture<NastavnikLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikLoginComponent]
    });
    fixture = TestBed.createComponent(NastavnikLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
