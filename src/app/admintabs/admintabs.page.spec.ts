import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmintabsPage } from './admintabs.page';

describe('AdmintabsPage', () => {
  let component: AdmintabsPage;
  let fixture: ComponentFixture<AdmintabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
