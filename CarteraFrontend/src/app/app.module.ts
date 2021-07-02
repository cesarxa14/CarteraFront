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
import { ProfileComponent } from './components/profile/profile.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { ModalEditProfileComponent } from './components/modal-edit-profile/modal-edit-profile.component';
import { TipoCambioComponent } from './components/tipo-cambio/tipo-cambio.component';
import { DatePipe } from '@angular/common';
import { ModalResultadoTotalComponent } from './components/modal-resultado-total/modal-resultado-total.component';
import { ModalDetalleLetraComponent } from './components/modal-detalle-letra/modal-detalle-letra.component'
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
    ModalAgregarCarteraComponent,
    ProfileComponent,
    ModalConfirmacionComponent,
    ModalEditProfileComponent,
    TipoCambioComponent,
    ModalResultadoTotalComponent,
    ModalDetalleLetraComponent
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
  providers: [DatePipe],
  entryComponents: [ModalAgregarLetraComponent, ModalAgregarCarteraComponent, ModalEditProfileComponent,
                    ModalConfirmacionComponent, ModalResultadoTotalComponent, ModalDetalleLetraComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
