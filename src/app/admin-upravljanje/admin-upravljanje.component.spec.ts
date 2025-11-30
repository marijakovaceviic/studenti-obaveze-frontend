import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpravljanjeComponent } from './admin-upravljanje.component';

describe('AdminUpravljanjeComponent', () => {
  let component: AdminUpravljanjeComponent;
  let fixture: ComponentFixture<AdminUpravljanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUpravljanjeComponent]
    });
    fixture = TestBed.createComponent(AdminUpravljanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
