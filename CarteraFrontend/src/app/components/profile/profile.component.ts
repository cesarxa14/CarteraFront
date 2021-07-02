import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { ModalEditProfileComponent } from '../modal-edit-profile/modal-edit-profile.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  progress_bar: boolean = false;
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  constructor(public dialog: MatDialog,
              public userService: UserService) { }

  ngOnInit() {
    this.progress_bar = true;
    this.userService.getUserByID(this.metadata.id).subscribe((res:any)=>{
      console.log(res)
      this.progress_bar = false;
      this.user = res.data
    })
  }


  abrirModalEditar(){
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '600px',
      data: this.metadata
    })

    dialogRef.componentInstance.edit.subscribe(playerUpdate =>{
      console.log('aqui', playerUpdate)
      this.user = playerUpdate.data
    })
  }

  abrirModalConfirmacion(){
    const dialogRef = this.dialog.open(ModalConfirmacionComponent,{
      width: '500px',
      height: '200px',
      data: { msj: '¿Seguro que deseas eliminar tu cuenta?', userID: this.user.id}
    })
  }
}


