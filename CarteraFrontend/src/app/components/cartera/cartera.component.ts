import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { Location} from '@angular/common';
import { GeneralService } from '../../service/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarLetraComponent } from '../modal-agregar-letra/modal-agregar-letra.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {

  cartera:any;
  idCartera: number;
  // dataSource = new MatTableDataSource();
  dataSource = new BehaviorSubject<any>([]);
  letrasList: any[];
  displayedColumns: string[] = ['nombre', 'val_nominal', 'f_emision', 'f_vencimiento', 'reten', 'tcea', 'detalles'];
  constructor(private ruta: ActivatedRoute, private _location: Location, private generalService: GeneralService,
              public dialog: MatDialog){
    this.ruta.params.subscribe(params =>{
      this.idCartera = params.id;
      console.log(params.id)
    })
   }

  ngOnInit() {

    this.generalService.getCarterasByID(this.idCartera).subscribe(res=>{
      this.cartera = res;
      console.log(this.cartera);
    })

    console.log('id cartera',this.idCartera)
    this.generalService.getLetrasByIDCartera(this.idCartera).subscribe((res:any)=>{
      // this.dataSource.data = res;
      this.letrasList = res;
      this.dataSource.next(res);

      console.log('letras', res)
    })
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
      this.letrasList.push(data);
      this.dataSource.next(this.letrasList);
    })
  }

}
