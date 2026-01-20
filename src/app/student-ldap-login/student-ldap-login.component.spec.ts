import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLdapLoginComponent } from './student-ldap-login.component';

describe('StudentLdapLoginComponent', () => {
  let component: StudentLdapLoginComponent;
  let fixture: ComponentFixture<StudentLdapLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLdapLoginComponent]
    });
    fixture = TestBed.createComponent(StudentLdapLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
