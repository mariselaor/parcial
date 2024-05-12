import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPage } from './main.page';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

<<<<<<< HEAD
  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
=======
  beforeEach(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
