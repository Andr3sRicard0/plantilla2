import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { EditorComponent } from './editor/editor.component';
import { RouterModule } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MenuModule } from 'src/app/user/menu/menu.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarrouselComponent,
    EditorComponent,
    HomeAdminComponent
  ],
  exports:[
    CarrouselComponent,
    EditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    FormsModule
  ]
})
export class AdminComponentModule { }
