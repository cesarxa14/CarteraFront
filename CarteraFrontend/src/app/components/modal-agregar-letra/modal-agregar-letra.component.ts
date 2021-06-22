import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { GeneralService } from '../../service/general.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-letra',
  templateUrl: './modal-agregar-letra.component.html',
  styleUrls: ['./modal-agregar-letra.component.css']
})
export class ModalAgregarLetraComponent implements OnInit {

  @Output() letraEmitter: any = new EventEmitter();
  TODAY_DATE: Date = new Date()
  idCartera: number;
  newLetraForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private generalService: GeneralService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalAgregarLetraComponent>) { }

  ngOnInit() {
    this.newLetraForm = this._builderForm();
    this.idCartera = parseInt(this.data.idCartera)
    // console.log(this.idCartera)
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      fechaEmision: [this.TODAY_DATE, [Validators.required,this.dateValidator]],
      fechaVencimiento: [null, [Validators.required,this.dateValidator]],
      valorNominal: [null, [Validators.required]],
      retencion: [null,[Validators.required]],
      CIMotivo: [null],
      CIExpresadoEn: [null],
      CFMotivo: [null],
      CFExpresadoEn: [null,],
      // cosIniciales: this._formBuilder.array([])
    }) 

    return form;
  }

  /**Getters */
  get fechaEmision()     { return this.newLetraForm.controls['fechaEmision']; }
  get fechaVencimiento() { return this.newLetraForm.controls['fechaVencimiento']; }
  get valorNominal()     { return this.newLetraForm.controls['valorNominal']; }
  get retencion()        { return this.newLetraForm.controls['retencion']; }
  get CIMotivo()         { return this.newLetraForm.controls['CIMotivo']; }
  get CIExpresadoEn()    { return this.newLetraForm.controls['CIExpresadoEn']; }
  get CFMotivo()         { return this.newLetraForm.controls['CFMotivo']; }
  get CFExpresadoEn()    { return this.newLetraForm.controls['CFExpresadoEn']; }

  agregarCosIniciales(){
    const creds = this.newLetraForm.controls.cosIniciales as FormArray;
    creds.push(this._formBuilder.group({
      motivo: '',
      expresadoEn:''
    }))
  }

  addLetra(){
    console.log(this.newLetraForm.value)
    let obj = {
      fechaEmision: this.fechaEmision.value,
      fechaVencimiento: this.fechaVencimiento.value,
      valorNominal: this.valorNominal.value,
      retencion: this.retencion.value,
      CIMotivo: this.CIMotivo.value,
      CIExpresadoEn: this.CIExpresadoEn.value,
      CFMotivo: this.CFExpresadoEn.value,
      CFExpresadoEn: this.CFExpresadoEn.value,
      idCartera: this.idCartera 
    }
    this.generalService.insertLetraByIDCartera(obj, this.idCartera).subscribe(res=>{
      console.log('post letra', res)
      this.letraEmitter.emit(res);
      this.dialogRef.close()
    })
  }

  dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD',true).isValid()) {
      return {'dateVaidator': true};
    }
    return null;
  }

}
