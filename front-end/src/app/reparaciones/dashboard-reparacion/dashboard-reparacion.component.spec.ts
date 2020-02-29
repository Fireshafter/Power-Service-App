import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReparacionComponent } from './dashboard-reparacion.component';

describe('DashboardReparacionComponent', () => {
  let component: DashboardReparacionComponent;
  let fixture: ComponentFixture<DashboardReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
