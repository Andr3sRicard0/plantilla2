import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  //En Desarrollo
  /*{path:'admin/home', redirectTo:'home/notFound', pathMatch:'full'},
  {path:'admin/home', component:HomeAdminComponent, children:[
    {path:'editor', component:EditorComponent}
  ]}*/
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AdminComponentRoutingModule { }
