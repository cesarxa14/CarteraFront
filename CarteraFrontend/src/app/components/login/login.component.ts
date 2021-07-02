import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { GeneralService } from '../../service/general.service';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private  router: Router,
              private generalService: GeneralService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this._builderForm();
  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    }) 
    form.valueChanges.subscribe(()=>{
      // this.invalidForm = this.loginForm.invalid;
    });
    return form;
  }
     /**Getters */
     get username() { return this.loginForm.controls['username']; }
     get password() { return this.loginForm.controls['password']; }

  login(){
    console.log(this.loginForm.value)
    
    this.authService.login(this.loginForm.value).subscribe((res:any) =>{
      console.log('login', res)
      if(res && res.msj) {
        this._snackBar.open(res.msj, 'Cerrar', {
          duration:4000, 
          horizontalPosition: 'start',
          panelClass: ['my-snack-bar']  
        });
      }
      else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('metadata', JSON.stringify(res.metadata[0]));
        this.router.navigateByUrl('/home')

      }
    })
  
    
  }

}
