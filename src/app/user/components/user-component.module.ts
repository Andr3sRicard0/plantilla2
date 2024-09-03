import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesHombreComponent } from './detalles-hombre/detalles-hombre.component';
import { DetallesMujerComponent } from './detalles-mujer/detalles-mujer.component';
import { DetallesNinosComponent } from './detalles-ninos/detalles-ninos.component';
@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    DashboardComponent,
    DetallesHombreComponent,
    DetallesMujerComponent,
    DetallesNinosComponent
  ],
  exports:[
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    HttpClientModule
  ]
})
export class UserComponentModule { }
