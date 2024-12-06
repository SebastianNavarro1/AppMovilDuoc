import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminhPage } from './adminh.page';

describe('AdminhPage', () => {
  let component: AdminhPage;
  let fixture: ComponentFixture<AdminhPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
