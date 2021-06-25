import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { GeneralService } from '../../service/general.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ILetter } from '../../models/letter';

@Component({
  selector: 'app-modal-agregar-letra',
  templateUrl: './modal-agregar-letra.component.html',
  styleUrls: ['./modal-agregar-letra.component.css']
})
export class ModalAgregarLetraComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  newLetter: ILetter;
  PLAZO_TASA: any[] = [
    {
      value: 1,
      nombre: 'Anual'
    },
    {
      value: 2,
      nombre: 'Semestral'
    },
    {
      value: 3,
      nombre: 'Cuatrimestral'
    },
    {
      value: 4,
      nombre: 'Trimestral'
    },
    {
      value: 6,
      nombre: 'Bimestral'
    },
    {
      value: 12,
      nombre: 'Mensual'
    },
    {
      value: 24,
      nombre: 'Quincenal'
    },
    {
      value: 360,
      nombre: 'Diario'
    },

  ]
  USER_ID: number;
  @Output() letraEmitter: any = new EventEmitter();
  TODAY_DATE: Date = new Date()
  default: any = 'hola'
  idCartera: number;

  flgTipoTasa: boolean = false;
  STEP: boolean = false;
  newLetra1Form: FormGroup;
  newLetra2Form: FormGroup;

  //Datos Intermedios
  diasTrasl:number;
  descuento:number;
  tasaDescuento:number;
  valorEntregado: number;
  valorRecibido: number;
  valorNeto: number;
  TCEP:number;

  constructor(private _formBuilder : FormBuilder,
              private generalService: GeneralService,
              // @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalAgregarLetraComponent>) { }

  ngOnInit() {
    this.USER_ID = this.metadata[0].id; 
    this.newLetra1Form = this._builderForm();
    this.diasxaño.setValue('360');
    this.newLetra2Form = this._builderForm2();
    this.idCartera = parseInt(this.data.idCartera)
  }

  

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let numberPattern = /^\d{1,10}$/;
    let floatPattern = '[+-]?([0-9]*[.])?[0-9]+'
    let form = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      diasxaño: [null, [Validators.required]],
      plazoTasa: [null, [Validators.required, ]],
      tipoTasa: [null,[Validators.required]],
      tasaEfec: [null, [Validators.pattern(floatPattern)]],
      tasaNomi: [null, [Validators.pattern(floatPattern)]],
      fechaDescuento: [null,[this.dateValidator, Validators.required]],
      periodoCapi: [null]
    }) 

    return form;
  }

   /**Getters */
   get nombre()     { return this.newLetra1Form.controls['nombre']; }
   get diasxaño() { return this.newLetra1Form.controls['diasxaño']; }
   get plazoTasa()     { return this.newLetra1Form.controls['plazoTasa']; }
   get tipoTasa()        { return this.newLetra1Form.controls['tipoTasa']; }
   get tasaEfec()         { return this.newLetra1Form.controls['tasaEfec']; }
   get tasaNomi()    { return this.newLetra1Form.controls['tasaNomi']; }
   get fechaDescuento()         { return this.newLetra1Form.controls['fechaDescuento']; }
   get periodoCapi()    { return this.newLetra1Form.controls['periodoCapi']; }

  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let numberPattern = /^\d{1,10}$/;
    
    let form = this._formBuilder.group({
      fechaEmision: [this.TODAY_DATE, [Validators.required,this.dateValidator]],
      fechaVencimiento: [null, [Validators.required,this.dateValidator]],
      valorNominal: [null, [Validators.required, Validators.pattern(numberPattern)]],
      retencion: [null,[Validators.required, Validators.pattern(numberPattern)]],
      CIMotivo: [null],
      CIExpresadoEn: [null,[Validators.pattern(numberPattern)]],
      CFMotivo: [null],
      CFExpresadoEn: [null,[Validators.pattern(numberPattern)]],
      // cosIniciales: this._formBuilder.array([])
    }) 

    return form;
  }
  /**Getters */
  get fechaEmision()     { return this.newLetra2Form.controls['fechaEmision']; }
  get fechaVencimiento() { return this.newLetra2Form.controls['fechaVencimiento']; }
  get valorNominal()     { return this.newLetra2Form.controls['valorNominal']; }
  get retencion()        { return this.newLetra2Form.controls['retencion']; }
  get CIMotivo()         { return this.newLetra2Form.controls['CIMotivo']; }
  get CIExpresadoEn()    { return this.newLetra2Form.controls['CIExpresadoEn']; }
  get CFMotivo()         { return this.newLetra2Form.controls['CFMotivo']; }
  get CFExpresadoEn()    { return this.newLetra2Form.controls['CFExpresadoEn']; }

  agregarCosIniciales(){
    const creds = this.newLetra2Form.controls.cosIniciales as FormArray;
    creds.push(this._formBuilder.group({
      motivo: '',
      expresadoEn:''
    }))
  }

  addLetra(){
    // this.retencion.hasError('pattern')
    this.calcularDatosIntermedios();

    this.newLetter = {
      nombre: this.nombre.value,
      diasxaño: this.diasxaño.value,
      plazoTasa: this.plazoTasa.value,
      tipoTasa: this.tipoTasa.value,
      tasaEfect: this.tasaEfec.value,
      tasaNomi: this.tasaNomi.value,
      fechaDescuento: this.fechaDescuento.value,
      periodoCapi: this.periodoCapi.value,
      fechaEmision: this.fechaVencimiento.value,
      fechaVencimiento: this.fechaVencimiento.value,
      valorNominal: this.valorNominal.value,
      retencion: this.retencion.value,
      CIMotivo: this.CIMotivo.value,
      CIExpresadoEn: this.CIExpresadoEn.value,
      CFMotivo: this.CFMotivo.value,
      CFExpresadoEn: this.CFExpresadoEn.value,
      valorEntregado: this.valorEntregado,
      tasaDescuento: this.tasaDescuento,
      descuento: this.descuento,
      valorNeto: this.valorNeto,
      valorRecibido: this.valorRecibido,
      TCEP: this.TCEP,
      idUser: this.USER_ID
    }
    // let obj = {
    //   fechaEmision: this.fechaEmision.value,
    //   fechaVencimiento: this.fechaVencimiento.value,
    //   valorNominal: this.valorNominal.value,
    //   retencion: this.retencion.value,
    //   CIMotivo: this.CIMotivo.value,
    //   CIExpresadoEn: this.CIExpresadoEn.value,
    //   CFMotivo: this.CFExpresadoEn.value,
    //   CFExpresadoEn: this.CFExpresadoEn.value,
    //   idCartera: this.idCartera 
    // }

    console.log('nueva letra', this.newLetter)
    this.generalService.insertLetraByIDUser(this.newLetter, this.USER_ID).subscribe(res=>{
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

  nextStep(){
    this.STEP = true;
  }

  selectTipoTasa(event){
    if(event.value == 'efectiva'){
      this.flgTipoTasa = false;
    } else if(event.value == 'nominal'){
      this.flgTipoTasa = true;
    }
  }

  calcularDatosIntermedios(){
    if(this.tipoTasa.value == 'efectiva'){
      this.tasaDescuento = this.tasaEfec.value / (this.tasaEfec.value + 1);
    } else if(this.tipoTasa.value == 'nominal'){
      let tep = Math.pow((1+ (this.tasaNomi.value/this.plazoTasa.value)),this.plazoTasa.value) - 1; 
      this.tasaDescuento = tep / (tep + 1);
    }
    this.descuento = this.valorNominal.value * this.tasaDescuento;
    this.valorNeto = this.valorNominal.value - this.descuento;
    this.valorRecibido = this.valorNeto - this.CIExpresadoEn.value - this.retencion.value;
    this.valorEntregado = this.valorNominal.value + this.CFExpresadoEn.value - this.retencion.value;
    this.TCEP = Math.pow((this.valorEntregado/ this.valorRecibido),(this.diasxaño.value/this.diasTrasl))
  }

}
