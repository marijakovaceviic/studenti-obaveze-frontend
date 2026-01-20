import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatistikaGodineComponent } from './admin-statistika-godine.component';

describe('AdminStatistikaGodineComponent', () => {
  let component: AdminStatistikaGodineComponent;
  let fixture: ComponentFixture<AdminStatistikaGodineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatistikaGodineComponent]
    });
    fixture = TestBed.createComponent(AdminStatistikaGodineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
