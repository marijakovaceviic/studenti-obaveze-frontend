import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeObavezeComponent } from './azuriranje-obaveze.component';

describe('AzuriranjeObavezeComponent', () => {
  let component: AzuriranjeObavezeComponent;
  let fixture: ComponentFixture<AzuriranjeObavezeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzuriranjeObavezeComponent]
    });
    fixture = TestBed.createComponent(AzuriranjeObavezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
