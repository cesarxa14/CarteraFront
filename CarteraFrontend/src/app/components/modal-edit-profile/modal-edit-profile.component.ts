import { Component, OnInit,  Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css']
})
export class ModalEditProfileComponent implements OnInit {

  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  @Output() edit:any = new EventEmitter();
  progress_bar: boolean = false;
  editForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public player: any, 
              private _formBuilder : FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>) { }

  ngOnInit() {
    this.editForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      name: [this.metadata.name, [Validators.required]],
      email: [this.metadata.email, [Validators.required, Validators.pattern(pattern)]],
      typeDocument: [this.metadata.type_document, [Validators.required, Validators.pattern(pattern)]],
      numDocument: [this.metadata.num_document, [Validators.required, Validators.pattern(pattern)]],
      username: [this.metadata.c_username, [Validators.required, Validators.pattern(pattern)]],
      password: [this.metadata.password, [Validators.required]]
    }) 
    return form;
  }

  /**Getters */
  get name() { return this.editForm.controls['name']; }
  get email() { return this.editForm.controls['email']; }
  get typeDocument() { return this.editForm.controls['typeDocument']; }
  get numDocument() { return this.editForm.controls['numDocument']; }
  get username() { return this.editForm.controls['username']; }
  get password() { return this.editForm.controls['password']; }

  editProfile(){
    this.progress_bar = true;
    console.log(this.editForm.value)

    this.userService.updateUser(this.editForm.value, this.metadata.id).subscribe((res:any) =>{
      this.edit.emit(res);
      this.progress_bar = false;
      this.dialogRef.close();
      console.log(res);
    })
  }

}
