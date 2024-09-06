import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeparadorAnimadoComponent } from './separador-animado/separador-animado.component';

@NgModule({
  declarations: [
    SeparadorAnimadoComponent
  ],
  exports:[
    SeparadorAnimadoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DesignModule { }
