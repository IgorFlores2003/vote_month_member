import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificarPage } from './identificar.page';

describe('IdentificarPage', () => {
  let component: IdentificarPage;
  let fixture: ComponentFixture<IdentificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
