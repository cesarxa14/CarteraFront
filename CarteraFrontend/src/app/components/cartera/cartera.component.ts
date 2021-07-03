import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import {DatePipe, Location} from '@angular/common';
import { GeneralService } from '../../service/general.service';
import { LetterService } from '../../service/letter.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarLetraComponent } from '../modal-agregar-letra/modal-agregar-letra.component';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalResultadoTotalComponent } from '../modal-resultado-total/modal-resultado-total.component';
import { ModalDetalleLetraComponent } from '../modal-detalle-letra/modal-detalle-letra.component';
@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {

  TCEA_TOTAL: number;
  V_RECIBIDO_TOTAL: number = 0;
  cartera:any;
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  USER_ID: number;
  idCartera: number;
  // dataSource = new MatTableDataSource();
  dataSource = new BehaviorSubject<any>([]);
  letrasList: any[];
  displayedColumns: string[] = ['nombre', 'val_nominal','tasa','f_descuento', 'value_neto','value_reci', 'value_entre', 'detalles'];
  constructor(private ruta: ActivatedRoute, private _location: Location,
              private generalService: GeneralService,
              private letterService: LetterService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              public datepipe: DatePipe){
    this.ruta.params.subscribe(params =>{
      this.idCartera = params.id;
    })
   }

  ngOnInit() {
    this.USER_ID = this.metadata.id ;
    console.log();
    this.letterService.getLettersByIDUser(this.USER_ID).subscribe((res:any)=>{
      console.log('letras x user', res);
      this.letrasList = res.data;
      console.log('len letras', this.letrasList.length)
      this.letrasList.map(row => {
        row.date_discount = this.datepipe.transform(row.date_discount, 'yyyy/MM/dd');
        row.date_end = this.datepipe.transform(row.date_end, 'yyyy/MM/dd');
        row.rate = parseFloat(parseFloat(row.rate).toFixed(6));
        row.rate_discount = parseFloat(parseFloat(row.rate_discount).toFixed(6));
        row.value_net = parseFloat(parseFloat(row.value_net).toFixed(2));
        row.value_received = parseFloat(parseFloat(row.value_received).toFixed(2));
        row.tcea = parseFloat(parseFloat(row.tcea).toFixed(6));
        // console.log("holaaaaaa");
        // console.log(row);
      })
      this.dataSource.next(this.letrasList);
      this.cartera = res.data;
      this.resultsTotales();
    })
    // this.generalService.getLetrasByIDUser(this.USER_ID).subscribe((res:any)=>{
    //   console.log('res', res)
    //   this.letrasList = res;
    //   this.letrasList.map(row=>{
    //     row.fechaEmision = row.fechaEmision.split('T')[0];
    //     row.fechaVencimiento = row.fechaVencimiento.split('T')[0];
    //   })
    //   this.dataSource.next(this.letrasList);
    //   this.cartera = res;
    // })
    
  }

  backClicked() {
    this._location.back();
  }

  verDetalles(element) {
    const dialogRef = this.dialog.open(ModalDetalleLetraComponent, {
      width: '900px',
      height: '650px',
      data: element
    })
  }

  addLetra(){
    const dialogRef = this.dialog.open(ModalAgregarLetraComponent, {
      width: '900px',
      height: '650px',
      data: {idCartera: this.idCartera}
    })

    dialogRef.componentInstance.letraEmitter.subscribe(data=>{
      console.log('data emitter', data);
      data.date_start = data.date_start.split('T')[0];
      data.date_end = data.date_end.split('T')[0];
      data.date_discount = data.date_discount.split('T')[0];
      this.letrasList.push(data);
      this.dataSource.next(this.letrasList);
      this.resultsTotales();
      this._snackBar.open(`Se agregó la Letra -> ${data.name}`, 'Cerrar', {
        duration:4000,
        horizontalPosition: 'start',
        panelClass: ['my-snack-bar']
      });
    })
  }

  abrirModalResulTotales(){
    
    const dialogRef = this.dialog.open(ModalResultadoTotalComponent, {
      width: '500px',
      height: '300px',
      data: {value_received_total: this.V_RECIBIDO_TOTAL}
    })
  }

  resultsTotales(){
    let cant_letras = this.dataSource.value.length
    
    for(let i=0; i < cant_letras; i++){
      this.V_RECIBIDO_TOTAL += parseFloat(this.dataSource.value[i].value_received);
      console.log('valor', parseFloat(this.dataSource.value[i].value_received))
    }
    console.log(this.dataSource.value)
    console.log('v re t', this.V_RECIBIDO_TOTAL)
  }

}
