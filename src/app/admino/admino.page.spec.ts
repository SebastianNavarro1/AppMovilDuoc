import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminoPage } from './admino.page';

describe('AdminoPage', () => {
  let component: AdminoPage;
  let fixture: ComponentFixture<AdminoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
