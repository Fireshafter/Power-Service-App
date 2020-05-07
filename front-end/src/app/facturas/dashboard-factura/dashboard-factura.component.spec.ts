import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFacturaComponent } from './dashboard-factura.component';

describe('DashboardFacturaComponent', () => {
  let component: DashboardFacturaComponent;
  let fixture: ComponentFixture<DashboardFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
