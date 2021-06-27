import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import { CarteraComponent } from './components/cartera/cartera.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TipoCambioComponent } from './components/tipo-cambio/tipo-cambio.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'home', canActivate:[AuthGuard], component: HomeComponent},
  { path: 'cartera', canActivate:[AuthGuard], component: CarteraComponent},
  { path: 'profile', canActivate:[AuthGuard], component: ProfileComponent},
  { path: 'tipo-de-cambio', canActivate:[AuthGuard], component: TipoCambioComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent];
