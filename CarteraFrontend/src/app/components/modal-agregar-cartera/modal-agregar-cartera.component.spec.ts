import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarCarteraComponent } from './modal-agregar-cartera.component';

describe('ModalAgregarCarteraComponent', () => {
  let component: ModalAgregarCarteraComponent;
  let fixture: ComponentFixture<ModalAgregarCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
