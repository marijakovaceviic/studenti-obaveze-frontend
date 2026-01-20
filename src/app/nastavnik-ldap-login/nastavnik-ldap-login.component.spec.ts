import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikLdapLoginComponent } from './nastavnik-ldap-login.component';

describe('NastavnikLdapLoginComponent', () => {
  let component: NastavnikLdapLoginComponent;
  let fixture: ComponentFixture<NastavnikLdapLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikLdapLoginComponent]
    });
    fixture = TestBed.createComponent(NastavnikLdapLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
