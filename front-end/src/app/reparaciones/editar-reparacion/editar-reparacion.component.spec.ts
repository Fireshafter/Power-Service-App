import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReparacionComponent } from './editar-reparacion.component';

describe('EditarReparacionComponent', () => {
  let component: EditarReparacionComponent;
  let fixture: ComponentFixture<EditarReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
