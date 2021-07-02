import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { LetterService } from '../../service/letter.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private letterService: LetterService,
              private  router: Router,
              public dialogRef: MatDialogRef<ModalConfirmacionComponent>) { }

  ngOnInit() {
    console.log(this.data)
  }

  cancelar(){
    this.dialogRef.close();
  }

  eliminar(){

    // this.letterService.deleteLettersByUser(this.data.userID).subscribe((res:any)=>{
    //   console.log('res', res);
    // })
    // this.userService.deleteUser(this.data.userID).subscribe((res:any) =>{
    //   console.log('user deleted',res);
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('metadata')
    //   this.router.navigateByUrl('/login')

    // }) 
  }

}
