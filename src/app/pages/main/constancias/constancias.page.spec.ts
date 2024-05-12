import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstanciasPage } from './constancias.page';

describe('ConstanciasPage', () => {
  let component: ConstanciasPage;
  let fixture: ComponentFixture<ConstanciasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConstanciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
