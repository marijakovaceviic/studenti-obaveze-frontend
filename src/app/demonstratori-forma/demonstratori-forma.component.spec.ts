import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstratoriFormaComponent } from './demonstratori-forma.component';

describe('DemonstratoriFormaComponent', () => {
  let component: DemonstratoriFormaComponent;
  let fixture: ComponentFixture<DemonstratoriFormaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemonstratoriFormaComponent]
    });
    fixture = TestBed.createComponent(DemonstratoriFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
