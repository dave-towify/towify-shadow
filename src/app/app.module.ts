import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {ColorSketchModule} from 'ngx-color/sketch';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShadowComponent } from './shadow/shadow.component';

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
