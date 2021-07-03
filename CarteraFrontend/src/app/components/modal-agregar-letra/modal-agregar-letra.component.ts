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
      value: 120,
      nombre: 'Cuatrimestral'
    },
    {
      value: 90,
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

  data01 = {
    expensesIniciales: [{
      name: "",
      value: null
    }],
    expensesFinales: [{
      name: "",
      value: null
    }]
  };

  myForm: FormGroup;
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
              private dialogRef: MatDialogRef<ModalAgregarLetraComponent>) {
   
  }
  setExpensesIniciales() {
    let control = this.myForm.controls.expensesIniciales as FormArray;
    this.data01.expensesIniciales.forEach(x => {
      control.push(
        this._formBuilder.group({
          name: x.name,
          value: x.value
        })
      );
    });
  }
  setExpensesFinales() {
    let control = this.myForm.controls.expensesFinales as FormArray;
    this.data01.expensesFinales.forEach(x => {
      control.push(
        this._formBuilder.group({
          name: x.name,
          value: x.value
        })
      );
    });
  }

  createExpensesInicialesGroup() {
    return this._formBuilder.group({
      name: [''],
      value: ['']
    });
  }
  createExpensesFinalesGroup() {
    return this._formBuilder.group({
      name: [''],
      value: ['']
    });
  }
  addNewExpensesInicial() {
    let control = this.myForm.controls.expensesIniciales as FormArray;
    control.push(this.createExpensesInicialesGroup());
    console.log(this.myForm.controls);
  }
  addNewExpensesFinal() {
    console.log(this.data01);
    let control = this.myForm.controls.expensesFinales as FormArray;
    control.push(this.createExpensesFinalesGroup());
    console.log(this.data01);
  }

  deleteExpenseInicial(index) {
    let control = this.myForm.controls.expensesIniciales as FormArray;
    control.removeAt(index);
  }
  deleteExpenseFinal( index) {
    let control = this.myForm.controls.expensesFinales as FormArray;
    control.removeAt(index);
  }

  ngOnInit() {

    this.myForm = this._formBuilder.group({
      expensesIniciales: this._formBuilder.array([]),
      expensesFinales: this._formBuilder.array([])
    });
    this.setExpensesIniciales();
    this.setExpensesFinales();

    this.USER_ID = this.metadata.id;
    this.newLetra1Form = this._builderForm();
    this.diasxaño.setValue('360');
    this.newLetra2Form = this._builderForm2();
    this.idCartera = parseInt(this.data.idCartera);

    // console.log(this.myForm.get('expensesIniciales').value)
  }

  getControlExpensesIniciales(){
    return this.myForm.controls['expensesIniciales'].value;
  }

  get listExpensesInicial() {return this.myForm.controls.expensesIniciales; }
  get listExpensesFinales() {return this.myForm.controls.expensesFinales; }

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


  _builderForm2() {
    const pattern = '^[a-zA-Z0-9._@\-]*$';
    const numberPattern = /^\d{1,10}$/;

    // @ts-ignore
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
      cosIniciales: this._formBuilder.array([
        this._formBuilder.control({
          CIMotivo: [null],
          CIExpresadoEn: [null, [Validators.pattern(numberPattern)]],
        })
      ]),
      cosFinales: this._formBuilder.array([])
    });

    return form;
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
    // return;
    this.newLetter = {
      nombre: this.nombre.value,
      diasxaño: this.diasxaño.value,
      plazoTasa: this.plazoTasa.value,
      tipoTasa: this.tipoTasa.value,
      tasaEfect: this.tasaEfec.value,
      tasaNomi: this.tasaNomi.value,
      fechaDescuento: this.fechaDescuento.value,
      periodoCapi: this.periodoCapi.value,
      fechaEmision: this.fechaEmision.value,
      fechaVencimiento: this.fechaVencimiento.value,
      valorNominal: this.valorNominal.value,
      retencion: this.retencion.value,
      valorEntregado: this.valorEntregado,
      tasaDescuento: this.tasaDescuento,
      descuento: this.descuento,
      valorNeto: this.valorNeto,
      valorRecibido: this.valorRecibido,
      TCEP: this.TCEA,
      idUser: this.USER_ID
    };

    console.log('nueva letra', this.newLetter);
    this.letterService.insertLetterByUser(this.newLetter).subscribe((res: any) => {
      this.letraEmitter.emit(res);
      this.addExpenses(res.id);
      this.dialogRef.close();
    });

  }
  addExpenses(letterId: number) {
    let expenses: IExpense[] = [];

    this.listExpensesInicial.value.map(row => {
      const expense = {
        name: row.name,
        description: row.name,
        value: row.value,
        condition: 'initial',
        idLetter: letterId
      };
      expenses.push(expense);
    });
    this.listExpensesFinales.value.map(row => {
      const expense = {
        name: row.name,
        description: row.name,
        value: row.value,
        condition: 'final',
        idLetter: letterId
      };
      expenses.push(expense);
    });
    expenses.map(obj => {
      console.log(obj);
      let expenseCreate = this.generalService.createExpense(obj).subscribe((res:any) =>{
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
    let totalExpensesIniciales = 0;
    let totalExpensesfinales = 0;

    this.valorNominal.setValue(parseFloat(this.valorNominal.value));
    this.retencion.setValue(parseFloat(this.retencion.value));

    if ( this.tipoTasa.value === 'efectiva') {

      tasaEfecDecimal = this.tasaEfec.value / 100;
      console.log(tasaEfecDecimal)
      const fechaDescuento = new Date(this.fechaDescuento.value.toString());
      const fechaFinal = new Date(this.fechaVencimiento.value.toString());

      this.diasTrasl = Math.round((fechaFinal.getTime() - fechaDescuento.getTime()) / (1000 * 60 * 60 * 24) + 1) - 1;
      tasaEfecPeriodoDescuento = Math.pow((1 + tasaEfecDecimal), (this.diasTrasl / this.plazoTasa.value)) - 1;
      this.tasaEfec.setValue(tasaEfecPeriodoDescuento);

      this.tasaDescuento = this.tasaEfec.value / (this.tasaEfec.value + 1);
      this.descuento = this.valorNominal.value * this.tasaDescuento;

 
    } else if (this.tipoTasa.value === 'nominal') {
      tasaNomDecimal = this.tasaNomi.value / 100;
      // const fechaInicio = new Date(this.fechaEmision.value.toString());

      const fechaDescuento = new Date(this.fechaDescuento.value.toString());
      const fechaFinal = new Date(this.fechaVencimiento.value.toString());
      // console.log('Puro Fecha emision' + this.fechaEmision.value.toString());
      // console.log('Cambio Fecha emision' + fechaInicio.getDate());

      this.diasTrasl = Math.round((fechaFinal.getTime() - fechaDescuento.getTime()) / (1000 * 60 * 60 * 24) + 1);
      const nDias = Math.floor(this.diasTrasl / this.periodoCapi.value) ;
      const mDias = this.plazoTasa.value / this.periodoCapi.value;

      console.log('dias :' + this.diasTrasl );
      console.log('capitalizacion :' + this.periodoCapi.value);
      console.log('n :' + nDias  );
      console.log('m: ' + mDias);
      console.log('tasaNomDecimal: ' + tasaNomDecimal);
      const tep1 = (1 + (tasaNomDecimal / mDias));
      console.log('TEP1 :' + tep1  );
      const tep = Math.pow((1 + (tasaNomDecimal / mDias)), nDias) - 1;
      console.log('TEP :' + tep  );

      this.tasaDescuento = tep / (tep + 1);
      this.descuento = this.valorNominal.value * this.tasaDescuento;
    }

    this.listExpensesInicial.value.map(row => {
      totalExpensesIniciales = totalExpensesIniciales + parseFloat(row.value);
    });
    this.listExpensesFinales.value.map(row => {
      totalExpensesfinales = totalExpensesfinales + parseFloat(row.value);
    });


    totalExpensesIniciales = totalExpensesIniciales ? totalExpensesIniciales : 0;
    totalExpensesfinales = totalExpensesfinales ? totalExpensesfinales : 0;

 

    this.valorNeto = this.valorNominal.value - this.descuento;
    this.valorNeto = parseFloat(this.valorNeto.toFixed(2));

    this.valorRecibido = this.valorNominal.value - this.retencion.value - this.descuento - totalExpensesIniciales; // aqui falta restar los costes iniciales
    this.valorRecibido = parseFloat(this.valorRecibido.toFixed(2));

    this.valorEntregado = this.valorNominal.value - this.retencion.value + totalExpensesfinales; // aqui falta sumar los costes finales
    this.valorEntregado = parseFloat(this.valorEntregado.toFixed(2));

    this.TCEA = Math.pow((this.valorEntregado/this.valorRecibido),(360/this.diasTrasl)) - 1;
    // this.TCEA = parseFloat(this.TCEA.toFixed(7));
    this.TCEA = this.TCEA * 100;

    this.descuento = parseFloat(this.descuento.toFixed(2));

    // this.tasaEfec.setValue( this.tasaEfec.value ? parseFloat(this.tasaEfec.value.toFixed(5)):0);
    this.tasaEfec.setValue(this.tasaEfec.value * 100);

    // this.tasaNomi.setValue( this.tasaNomi.value ? parseFloat(this.tasaNomi.value.toFixed(5)):0);
    // this.tasaNomi.setValue(this.tasaNomi.value * 100);

    // this.tasaDescuento = parseFloat(this.tasaDescuento.toFixed(5));
    this.tasaDescuento = this.tasaDescuento * 100;
 
  }

  addExpenseFeature(){

  }


}
