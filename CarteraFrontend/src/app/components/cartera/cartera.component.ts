import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { Location} from '@angular/common';
import { GeneralService } from '../../service/general.service';
import { LetterService } from '../../service/letter.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarLetraComponent } from '../modal-agregar-letra/modal-agregar-letra.component';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {

  cartera:any;
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  USER_ID: number;
  idCartera: number;
  // dataSource = new MatTableDataSource();
  dataSource = new BehaviorSubject<any>([]);
  letrasList: any[];
  displayedColumns: string[] = ['nombre', 'val_nominal', 'f_emision', 'f_vencimiento', 'reten', 'detalles'];
  constructor(private ruta: ActivatedRoute, private _location: Location,
              private generalService: GeneralService,
              private letterService: LetterService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar){
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
      this.letrasList.map(row=>{
        row.date_start = row.date_start.split('T')[0];
        row.date_end = row.date_end.split('T')[0];
      })
      this.dataSource.next(this.letrasList);
      this.cartera = res.data;
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

  }

  addLetra(){
    const dialogRef = this.dialog.open(ModalAgregarLetraComponent, {
      width: '900px',
      height: '650px',
      data: {idCartera: this.idCartera}
    })

    dialogRef.componentInstance.letraEmitter.subscribe(data=>{
      console.log('data emitter', data)
      data.date_start = data.date_start.split('T')[0];
      data.date_end = data.date_end.split('T')[0];
      data.date_discount = data.date_discount.split('T')[0];
      this.letrasList.push(data);
      this.dataSource.next(this.letrasList);
      this._snackBar.open(`Se agregó la Letra -> ${data.name}`, 'Cerrar', {
        duration:4000,
        horizontalPosition: 'start',
        panelClass: ['my-snack-bar']
      });
    })
  }

}
