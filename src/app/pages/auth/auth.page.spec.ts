<<<<<<< HEAD
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

<<<<<<< HEAD
  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
=======
  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
