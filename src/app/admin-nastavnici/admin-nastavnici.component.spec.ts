import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNastavniciComponent } from './admin-nastavnici.component';

describe('AdminNastavniciComponent', () => {
  let component: AdminNastavniciComponent;
  let fixture: ComponentFixture<AdminNastavniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNastavniciComponent]
    });
    fixture = TestBed.createComponent(AdminNastavniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
