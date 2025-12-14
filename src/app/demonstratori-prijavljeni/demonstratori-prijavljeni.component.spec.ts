import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstratoriPrijavljeniComponent } from './demonstratori-prijavljeni.component';

describe('DemonstratoriPrijavljeniComponent', () => {
  let component: DemonstratoriPrijavljeniComponent;
  let fixture: ComponentFixture<DemonstratoriPrijavljeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemonstratoriPrijavljeniComponent]
    });
    fixture = TestBed.createComponent(DemonstratoriPrijavljeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
