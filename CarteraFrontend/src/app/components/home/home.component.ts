import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarCarteraComponent } from '../modal-agregar-cartera/modal-agregar-cartera.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  USER_NAME: string;
  USER_ID: number;
  carteras: any[];
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  items = ['tretr','543543','543','4','fdfd', 'fdfds']
  constructor(private router: Router,
              private generalService: GeneralService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.USER_NAME = this.metadata.nombres; 
    this.USER_ID = this.metadata.id; 

    // this.generalService.getCarterasByUser(this.metadata.id).subscribe((res:any)=>{
    //   console.log(res);
    //   this.carteras = res;
    // })
  }


  goToCard(){
    
    this.router.navigateByUrl(`/cartera`)
  }

  abrirModalNuevaCartera(){
    const dialogRef = this.dialog.open(ModalAgregarCarteraComponent, {
      width: '900px',
      height: '650px',
      data: {idUser: this.USER_ID}
    })
  }

}
