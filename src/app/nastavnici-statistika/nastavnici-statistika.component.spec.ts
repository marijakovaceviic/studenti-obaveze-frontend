import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavniciStatistikaComponent } from './nastavnici-statistika.component';

describe('NastavniciStatistikaComponent', () => {
  let component: NastavniciStatistikaComponent;
  let fixture: ComponentFixture<NastavniciStatistikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavniciStatistikaComponent]
    });
    fixture = TestBed.createComponent(NastavniciStatistikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
