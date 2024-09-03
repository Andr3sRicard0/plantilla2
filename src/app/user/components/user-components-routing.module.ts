import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetallesHombreComponent } from './detalles-hombre/detalles-hombre.component';
import { DetallesMujerComponent } from './detalles-mujer/detalles-mujer.component';
import { DetallesNinosComponent } from './detalles-ninos/detalles-ninos.component';

const routes : Routes = [
  {path:'', redirectTo:'home/dashboard', pathMatch:'full'},
  {path:'home', redirectTo:'home/dashboard', pathMatch:'full'},
  {path:'home', component:HomeComponent, children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'hombres/detalles/:id', component:DetallesHombreComponent},
    {path:'mujer/detalles/:id', component:DetallesMujerComponent},
    {path:'ninos/detalles/:id', component:DetallesNinosComponent},
    {path:'notFound', component:NotFoundComponent}
  ]},
  {path:'**', redirectTo:'home/notFound', pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class UserComponentsRoutingModule { }