import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MainPageComponent } from './main-page/main-page.component';
import { servicesArray } from './../services/';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    servicesArray
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
