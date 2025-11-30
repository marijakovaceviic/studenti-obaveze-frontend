import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetObavezeComponent } from './predmet-obaveze.component';

describe('PredmetObavezeComponent', () => {
  let component: PredmetObavezeComponent;
  let fixture: ComponentFixture<PredmetObavezeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredmetObavezeComponent]
    });
    fixture = TestBed.createComponent(PredmetObavezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
