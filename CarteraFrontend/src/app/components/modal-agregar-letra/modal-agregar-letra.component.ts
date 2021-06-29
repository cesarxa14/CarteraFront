import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { GeneralService } from '../../service/general.service';
import { LetterService } from '../../service/letter.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ILetter } from '../../models/letter';
import {IExpense} from '../../models/expense';

@Component({
  selector: 'app-modal-agregar-letra',
  templateUrl: './modal-agregar-letra.component.html',
  styleUrls: ['./modal-agregar-letra.component.css']
})
export class ModalAgregarLetraComponent implements OnInit {

  metadata: any = JSON.parse(localStorage.getItem('metadata'));
  newLetter: ILetter;
  newExpenses: IExpense[];
  PLAZO_TASA: any[] = [
    {
      value: 360,
      nombre: 'Anual'
    },
    {
      value: 180,
      nombre: 'Semestral'
    },
    {
      value: 90,
      nombre: 'Cuatrimestral'
    },
    {
      value: 120,
      nombre: 'Trimestral'
    },
    {
      value: 60,
      nombre: 'Bimestral'
    },
    {
      value: 30,
      nombre: 'Mensual'
    },
    {
      value: 15,
      nombre: 'Quincenal'
    },
    {
      value: 1,
      nombre: 'Diario'
    },

  ];

  COSTES: any[] = [
    {name: 'Portes'},
    {name: 'Fotocopias'},
    {name: 'Comisión de estudio'},
    {name: 'Comisión de desembolso'},
    {name: 'Comisión de intermediación'},
    {name: 'Gastos de administración'},
    {name: 'Gatos notariales'},
    {name: 'Gatos registrales'},
    {name: 'Seguro'},
    {name: 'Otros gastos'}
  ]

  //Costes
  CI: any[] = [
    {
      motivo: 'alguno',
      vExpre: 11,
    }
  ]

  CF: any[] = [
    {
      motivo: 'alguno',
      vExpre: 11,
    }
  ]


  // Fechas
  FEmi: Date = new Date();
  FVenci: Date;


  USER_ID: number;
  @Output() letraEmitter: any = new EventEmitter();
  TODAY_DATE: Date = new Date();
  default: any = 'hola';
  idCartera: number;

  flgTipoTasa = false; // si la tasa es nominal o efectiva
  STEP = false;
  newLetra1Form: FormGroup;
  newLetra2Form: FormGroup;

  // Datos Intermedios
  diasTrasl: number;
  descuento: number;
  tasaDescuento: number;
  valorEntregado: number;
  valorRecibido: number;
  valorNeto: number;
  TCEA: number;

  constructor(private _formBuilder: FormBuilder,
              private generalService: GeneralService,
              private letterService: LetterService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalAgregarLetraComponent>) { }

  ngOnInit() {
    this.USER_ID = this.metadata.id;
    this.newLetra1Form = this._builderForm();
    this.diasxaño.setValue('360');
    this.newLetra2Form = this._builderForm2();
    this.idCartera = parseInt(this.data.idCartera);
  }



  _builderForm() {
    const pattern = '^[a-zA-Z0-9._@\-]*$';
    const numberPattern = /^\d{1,10}$/;
    const floatPattern = '[+-]?([0-9]*[.])?[0-9]+';
    const form = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      diasxaño: [null, [Validators.required]],
      plazoTasa: [null, [Validators.required, ]],
      tipoTasa: [null, [Validators.required]],
      tasaEfec: [null, [Validators.pattern(floatPattern)]],
      tasaNomi: [null, [Validators.pattern(floatPattern)]],
      periodoCapi: [null]
    });

    return form;
  }

   /*Getters */
   get nombre()     { return this.newLetra1Form.controls.nombre; }
   get diasxaño() { return this.newLetra1Form.controls.diasxaño; }
   get plazoTasa()     { return this.newLetra1Form.controls.plazoTasa; }
   get tipoTasa()        { return this.newLetra1Form.controls.tipoTasa; }
   get tasaEfec()         { return this.newLetra1Form.controls.tasaEfec; }
   get tasaNomi()    { return this.newLetra1Form.controls.tasaNomi; }

   get periodoCapi()    { return this.newLetra1Form.controls.periodoCapi; }

  /*Getters */
  get fechaEmision()     { return this.newLetra2Form.controls.fechaEmision; }
  get fechaVencimiento() { return this.newLetra2Form.controls.fechaVencimiento; }
  get fechaDescuento()   { return this.newLetra2Form.controls.fechaDescuento; }
  get valorNominal()     { return this.newLetra2Form.controls.valorNominal; }
  get retencion()        { return this.newLetra2Form.controls.retencion; }
  get CIMotivo()         { return this.newLetra2Form.controls.CIMotivo; }
  get CIExpresadoEn()    { return this.newLetra2Form.controls.CIExpresadoEn; }
  get CFMotivo()         { return this.newLetra2Form.controls.CFMotivo; }
  get CFExpresadoEn()    { return this.newLetra2Form.controls.CFExpresadoEn; }

  _builderForm2() {
    const pattern = '^[a-zA-Z0-9._@\-]*$';
    const numberPattern = /^\d{1,10}$/;

    const form = this._formBuilder.group({
      fechaEmision: [this.TODAY_DATE, [Validators.required, this.dateValidator]],
      fechaVencimiento: [null, [Validators.required, this.dateValidator]],
      fechaDescuento: [null, [this.dateValidator, Validators.required]],
      valorNominal: [null, [Validators.required, Validators.pattern(numberPattern)]],
      retencion: [null, [Validators.required, Validators.pattern(numberPattern)]],
      CIMotivo: [null],
      CIExpresadoEn: [null, [Validators.pattern(numberPattern)]],
      CFMotivo: [null],
      CFExpresadoEn: [null, [Validators.pattern(numberPattern)]],
      // cosIniciales: this._formBuilder.array([])
    });

    return form;
  }
  agregarCosIniciales() {
    const creds = this.newLetra2Form.controls.cosIniciales as FormArray;
    creds.push(this._formBuilder.group({
      motivo: '',
      expresadoEn: ''
    }));
  }

  FEmisionChanged(event){
    this.FEmi = event.value
    console.log(event)
  }

  FVenciChanged(event){
    this.FVenci = event.value
    console.log(event)
  }

  addLetra() {
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
      TCEP: this.TCEA,
      idUser: this.USER_ID
    };

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

    console.log('nueva letra', this.newLetter);

    this.letterService.insertLetterByUser(this.newLetter).subscribe((res: any) => {
      this.letraEmitter.emit(res);
      this.addExpenses(res.id);
      this.dialogRef.close();
    });
    // this.generalService.insertLetraByIDUser(this.newLetter, this.USER_ID).subscribe(res=>{
    //   console.log('post letra', res)
    //   this.letraEmitter.emit(res);
    //   // this.dialogRef.close()
    // })
  }
  addExpenses(letterId: number) {
    let expenses: IExpense[] = [];
    this.CI.map(row => {
      const expense = {
        name: row.motivo,
        description: row.motivo,
        value: row.vExpre,
        condition: 'initial',
        id_letter: letterId
      };
      expenses.push(expense);
    });
    this.CF.map(row => {
      const expense = {
        name: row.motivo,
        description: row.motivo,
        value: row.vExpre,
        condition: 'final',
        id_letter: letterId
      };
      expenses.push(expense);
    });
    //console.log("EXPENSESSSSSSSSS");
    //console.log(expenses);
    expenses.map(obj => {
      console.log(obj);
      let expenseCreate = this.generalService.createExpense(obj).subscribe((res:any) =>{
        console.log("EXPENSES CREADOS");
        console.log(res);
      });
      console.log(expenseCreate);
    });
  }
  dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
      return {dateVaidator: true};
    }
    return null;
  }

  nextStep() {
    this.STEP = true;
  }

  selectTipoTasa(event) {
    if (event.value === 'efectiva') {
      this.flgTipoTasa = false;
    } else if (event.value === 'nominal') {
      this.flgTipoTasa = true;
    }
  }

  calcularDatosIntermedios() {
    let tasaEfecDecimal: number;
    let tasaEfecPeriodoDescuento: number;
    let tasaNomDecimal: number;
    let diffDias: number;
    let tcea: number;
    if ( this.tipoTasa.value === 'efectiva') {

      tasaEfecDecimal = this.tasaEfec.value / 100;

      const fechaInicio = new Date(this.fechaEmision.value.toString());
      const fechaFinal = new Date(this.fechaVencimiento.value.toString());
      console.log('Puro Fecha emision' + this.fechaEmision.value.toString());
      console.log('Cambio Fecha emision' + fechaInicio.getDate());
      diffDias = Math.round((fechaFinal.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24) + 1);
      tasaEfecPeriodoDescuento = Math.pow((1 + tasaEfecDecimal), (diffDias / this.plazoTasa.value)) - 1;
      console.log('diffDias: ' + diffDias);
      console.log('tasaEfecPeriodoDescuento: ' + tasaEfecPeriodoDescuento);
      console.log('n :' + diffDias  );
      console.log('plazoTasa :' + this.plazoTasa.value  );

      this.tasaDescuento = tasaEfecPeriodoDescuento / (tasaEfecPeriodoDescuento + 1);
    } else if (this.tipoTasa.value === 'nominal') {
      tasaNomDecimal = this.tasaNomi.value / 100;
      const fechaInicio = new Date(this.fechaEmision.value.toString());
      const fechaFinal = new Date(this.fechaVencimiento.value.toString());
      console.log('Puro Fecha emision' + this.fechaEmision.value.toString());
      console.log('Cambio Fecha emision' + fechaInicio.getDate());

      diffDias = Math.round((fechaFinal.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24) + 1);
      const nDias = Math.floor(diffDias / this.periodoCapi.value) ;
      const mDias = this.plazoTasa.value / this.periodoCapi.value;
      console.log('dias :' + diffDias );
      console.log('capitalizacion :' + this.periodoCapi.value  );
      console.log('n :' + nDias  );
      console.log('m: ' + mDias);
      console.log('tasaNomDecimal: ' + tasaNomDecimal);
      const tep1 = (1 + (tasaNomDecimal / mDias));
      console.log('TEP1 :' + tep1  );
      const tep = Math.pow((1 + (tasaNomDecimal / mDias)), nDias) - 1;
      console.log('TEP :' + tep  );
      this.tasaDescuento = tep / (tep + 1);
    }
    this.diasTrasl = diffDias;
    this.descuento = this.valorNominal.value * this.tasaDescuento;
    this.valorNeto = this.valorNominal.value - this.descuento;
    this.valorRecibido = this.valorNeto - parseInt(this.CIExpresadoEn.value) - parseInt(this.retencion.value);
    this.valorEntregado = parseInt(this.valorNominal.value) + parseInt(this.CFExpresadoEn.value) - parseInt(this.retencion.value);
    console.log('costos finales: ' + this.CFExpresadoEn.value);
    this.TCEA = Math.pow((this.valorEntregado / this.valorRecibido), (this.diasxaño.value / this.diasTrasl)) - 1;
    tcea = Math.pow((this.valorEntregado / this.valorRecibido), (this.diasxaño.value / this.diasTrasl)) - 1;
    console.log('TCEAAAAAAAAA: ' + tcea);
    console.log('Ve/Vr: ' + (this.valorEntregado / this.valorRecibido));
    console.log('Ve: ' + this.valorEntregado );
    console.log('Vr: '  + this.valorRecibido);

    console.log('dA/dT: ' + (this.diasxaño.value / this.diasTrasl));
  }

  addCI(){
    this.CI.push({motivo: 'alguno', vExpre: 10})
    console.log('CIs', this.CI)
  }

  addCF(){
    this.CF.push({motivo: 'alguno', vExpre: 10})
  }

}
