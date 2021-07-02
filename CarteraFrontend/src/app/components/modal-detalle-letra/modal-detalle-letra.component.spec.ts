import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleLetraComponent } from './modal-detalle-letra.component';

describe('ModalDetalleLetraComponent', () => {
  let component: ModalDetalleLetraComponent;
  let fixture: ComponentFixture<ModalDetalleLetraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleLetraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
