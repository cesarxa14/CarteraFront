import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-modal-agregar-cartera',
  templateUrl: './modal-agregar-cartera.component.html',
  styleUrls: ['./modal-agregar-cartera.component.css']
})
export class ModalAgregarCarteraComponent implements OnInit {

  constructor(private _formBuilder : FormBuilder,
              private generalService: GeneralService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalAgregarCarteraComponent>) { }

  ngOnInit() {
  }

}
