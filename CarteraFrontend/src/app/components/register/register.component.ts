import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { GeneralService } from '../../service/general.service';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  placeholderType: string;
  registerForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private  router: Router,
              private generalService: GeneralService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      nombres: ['', [Validators.required]],
      typeDocument: [null, [Validators.required]],
      numDocument: [{value: '', disabled: true}, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
     get email() { return this.registerForm.controls['email']; }
     get typeDocument() { return this.registerForm.controls['typeDocument']; }
     get numDocument() { return this.registerForm.controls['numDocument']; }


  selectTypeDocument(event){
    this.numDocument.enable()
    console.log('event', event)
    if(event.value == 'dni'){
      this.placeholderType = 'Ingrese el nro de DNI';
    } else{
      this.placeholderType = 'Ingrese el nro de RUC';
    }
  }
  register(){
    console.log(this.registerForm.value)
    
    this.authService.register(this.registerForm.value).subscribe((res:any)=>{
      console.log('register', res)
      if(res && res.msj) {
        this._snackBar.open(res.msj, 'Cerrar', {
          duration:4000, 
          horizontalPosition: 'start',
          panelClass: ['my-snack-bar']  
        });
      }
      else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('metadata', JSON.stringify(res.metadata));
        this.router.navigateByUrl('/home')

      }
    })


    // this.generalService.getUserByUsername(this.username.value).subscribe((user:any)=>{
    //   console.log('user', user)
    //   if(user.length > 0){
    //     this._snackBar.open('Este nombre de usuario ya existe', 'Cerrar', {
    //       duration:4000, 
    //       horizontalPosition: 'start',
    //       panelClass: ['my-snack-bar']  
    //     });
    //   } else{
    //     this.generalService.register(this.registerForm.value).subscribe((res:any)=>{
    //       console.log(res);
    //       if(res) {
    //         localStorage.setItem('metadata', JSON.stringify([res]));
    //         this.router.navigateByUrl('/home')
    //       }
          
    //     })
    //   }
    // })
   
    
  }

}
