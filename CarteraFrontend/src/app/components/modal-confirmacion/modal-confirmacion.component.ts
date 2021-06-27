import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              public dialogRef: MatDialogRef<ModalConfirmacionComponent>) { }

  ngOnInit() {
    console.log(this.data)
  }

  cancelar(){
    this.dialogRef.close();
  }

  eliminar(){
    this.userService.deleteUser(this.metadata.id).subscribe((res:any) =>{
      console.log(res);
    }) 
  }

}
