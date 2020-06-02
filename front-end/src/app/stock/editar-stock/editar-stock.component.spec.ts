import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarStockComponent } from './editar-stock.component';

describe('EditarStockComponent', () => {
  let component: EditarStockComponent;
  let fixture: ComponentFixture<EditarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
