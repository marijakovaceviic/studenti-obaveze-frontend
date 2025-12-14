import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetStatistikaComponent } from './predmet-statistika.component';

describe('PredmetStatistikaComponent', () => {
  let component: PredmetStatistikaComponent;
  let fixture: ComponentFixture<PredmetStatistikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredmetStatistikaComponent]
    });
    fixture = TestBed.createComponent(PredmetStatistikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
