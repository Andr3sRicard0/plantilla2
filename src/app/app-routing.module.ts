import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponentsRoutingModule } from './user/components/user-components-routing.module';

const routes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UserComponentsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
