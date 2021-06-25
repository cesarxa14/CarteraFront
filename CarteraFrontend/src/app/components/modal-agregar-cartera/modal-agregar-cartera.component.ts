import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GeneralService } from '../../service/general.service';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-agregar-cartera',
  templateUrl: './modal-agregar-cartera.component.html',
  styleUrls: ['./modal-agregar-cartera.component.css']
})
export class ModalAgregarCarteraComponent implements OnInit {


  newCarteraForm: FormGroup;

  constructor(private _formBuilder : FormBuilder,
              private generalService: GeneralService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalAgregarCarteraComponent>) { }

  ngOnInit() {
    this.newCarteraForm = this._builderForm();
    console.log(this.data, 'dataaa')
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let numberPattern = /^\d{1,10}$/;
    let form = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      diasxaño: [null, [Validators.required]],
      plazoTasa: [null, [Validators.required, Validators.pattern(numberPattern)]],
      tipoTasa: [null,[Validators.required, Validators.pattern(numberPattern)]],
      tasaEfec: [null],
      tasaNomi: [null],
      fechaDescuento: [null,[this.dateValidator, Validators.required]],
      periodoCapi: [null]
    }) 

    return form;
  }

  dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD',true).isValid()) {
      return {'dateVaidator': true};
    }
    return null;
  }

}
