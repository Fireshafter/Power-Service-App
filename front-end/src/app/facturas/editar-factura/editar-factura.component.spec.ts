import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFacturaComponent } from './editar-factura.component';

describe('EditarFacturaComponent', () => {
  let component: EditarFacturaComponent;
  let fixture: ComponentFixture<EditarFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
