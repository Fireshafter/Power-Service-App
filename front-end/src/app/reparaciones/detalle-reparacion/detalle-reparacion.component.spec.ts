import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReparacionComponent } from './detalle-reparacion.component';

describe('DetalleReparacionComponent', () => {
  let component: DetalleReparacionComponent;
  let fixture: ComponentFixture<DetalleReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
