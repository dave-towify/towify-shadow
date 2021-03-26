import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShadowComponent } from './shadow/shadow.component';
import {ColorSketchModule} from 'ngx-color/sketch';

@NgModule({
  declarations: [
    AppComponent,
    ShadowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ColorSketchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
