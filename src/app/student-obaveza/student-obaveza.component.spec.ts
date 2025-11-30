import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentObavezaComponent } from './student-obaveza.component';

describe('StudentObavezaComponent', () => {
  let component: StudentObavezaComponent;
  let fixture: ComponentFixture<StudentObavezaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentObavezaComponent]
    });
    fixture = TestBed.createComponent(StudentObavezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
