import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponentModule } from './user/components/user-component.module';
import { AdminComponentModule } from './admin/components/admin-component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserComponentModule,
    AdminComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
