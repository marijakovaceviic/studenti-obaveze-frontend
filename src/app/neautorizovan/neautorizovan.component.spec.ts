import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeautorizovanComponent } from './neautorizovan.component';

describe('NeautorizovanComponent', () => {
  let component: NeautorizovanComponent;
  let fixture: ComponentFixture<NeautorizovanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeautorizovanComponent]
    });
    fixture = TestBed.createComponent(NeautorizovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
