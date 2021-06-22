import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarLetraComponent } from './modal-agregar-letra.component';

describe('ModalAgregarLetraComponent', () => {
  let component: ModalAgregarLetraComponent;
  let fixture: ComponentFixture<ModalAgregarLetraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarLetraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
