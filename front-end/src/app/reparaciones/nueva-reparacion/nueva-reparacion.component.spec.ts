import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReparacionComponent } from './nueva-reparacion.component';

describe('NuevaReparacionComponent', () => {
  let component: NuevaReparacionComponent;
  let fixture: ComponentFixture<NuevaReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
