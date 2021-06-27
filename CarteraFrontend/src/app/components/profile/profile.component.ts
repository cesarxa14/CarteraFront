import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { ModalEditProfileComponent } from '../modal-edit-profile/modal-edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  abrirModalEditar(){
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '600px',
      data: this.metadata
    })

    // dialogRef.componentInstance.edit.subscribe(playerUpdate =>{
    //   console.log('aqui', playerUpdate)
    //   this.player = playerUpdate
    // })
  }

  abrirModalConfirmacion(){
    const dialogRef = this.dialog.open(ModalConfirmacionComponent,{
      width: '500px',
      height: '200px',
      data: { msj: '¿Seguro que deseas eliminar tu cuenta?'}
    })
  }
}


