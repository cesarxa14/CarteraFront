import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultadoTotalComponent } from './modal-resultado-total.component';

describe('ModalResultadoTotalComponent', () => {
  let component: ModalResultadoTotalComponent;
  let fixture: ComponentFixture<ModalResultadoTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResultadoTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResultadoTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
