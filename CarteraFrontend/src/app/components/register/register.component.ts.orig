import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { GeneralService } from '../../service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private  router: Router,
              private generalService: GeneralService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      nombres: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
     /**Getters */
     get nombres() { return this.registerForm.controls['nombres']; }
     get username() { return this.registerForm.controls['username']; }
     get password() { return this.registerForm.controls['password']; }

  register(){
    console.log(this.registerForm.value)
    
    this.generalService.getUserByUsername(this.username.value).subscribe((user:any)=>{
      console.log('user', user)
      if(user.length > 0){
        this._snackBar.open('Este nombre de usuario ya existe', 'Cerrar', {
          duration:4000, 
          horizontalPosition: 'start',
          panelClass: ['my-snack-bar']  
        });
      } else{
        this.generalService.register(this.registerForm.value).subscribe((res:any)=>{
          console.log(res);
          if(res) {
            localStorage.setItem('metadata', JSON.stringify([res]));
            this.router.navigateByUrl('/home')
          }
          
        })
      }
    })
   
    
  }

}
