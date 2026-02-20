import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtvoreneObavezeComponent } from './otvorene-obaveze.component';

describe('OtvoreneObavezeComponent', () => {
  let component: OtvoreneObavezeComponent;
  let fixture: ComponentFixture<OtvoreneObavezeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtvoreneObavezeComponent]
    });
    fixture = TestBed.createComponent(OtvoreneObavezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
