import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPrijavaComponent } from './pregled-prijava.component';

describe('PregledPrijavaComponent', () => {
  let component: PregledPrijavaComponent;
  let fixture: ComponentFixture<PregledPrijavaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledPrijavaComponent]
    });
    fixture = TestBed.createComponent(PregledPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
