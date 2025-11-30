import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikObavezeComponent } from './nastavnik-obaveze.component';

describe('NastavnikObavezeComponent', () => {
  let component: NastavnikObavezeComponent;
  let fixture: ComponentFixture<NastavnikObavezeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikObavezeComponent]
    });
    fixture = TestBed.createComponent(NastavnikObavezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
