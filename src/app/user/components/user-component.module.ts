import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuModule } from '../menu/menu.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesComponent } from './detalles/detalles.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { DesignModule } from '../design/design.module';
@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    DashboardComponent,
    DetallesComponent,
    NosotrosComponent
  ],
  exports:[
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    HttpClientModule,
    DesignModule
  ]
})
export class UserComponentModule { }
