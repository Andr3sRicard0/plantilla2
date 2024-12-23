import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetallesComponent } from './detalles/detalles.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes : Routes = [
  {path:'', redirectTo:'home/dashboard', pathMatch:'full'},
  {path:'home', redirectTo:'home/dashboard', pathMatch:'full'},
  {path:'home', component:HomeComponent, children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'dashboard/detalles/:id', component:DetallesComponent},
    {path:'dashboard/nosotros', component:NosotrosComponent},
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
