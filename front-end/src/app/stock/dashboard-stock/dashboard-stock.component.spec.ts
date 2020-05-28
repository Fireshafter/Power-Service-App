import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStockComponent } from './dashboard-stock.component';

describe('DashboardStockComponent', () => {
  let component: DashboardStockComponent;
  let fixture: ComponentFixture<DashboardStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
