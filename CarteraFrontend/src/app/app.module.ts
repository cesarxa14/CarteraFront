import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModules } from './material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CarteraComponent } from './components/cartera/cartera.component';
import { ModalAgregarLetraComponent } from './components/modal-agregar-letra/modal-agregar-letra.component';
import { ModalAgregarCarteraComponent } from './components/modal-agregar-cartera/modal-agregar-cartera.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    HeaderComponent,
    HomeComponent,
    CarteraComponent,
    ModalAgregarLetraComponent,
    ModalAgregarCarteraComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [ModalAgregarLetraComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
