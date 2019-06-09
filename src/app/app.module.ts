import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule }from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MainPageComponent } from './main-page/main-page.component';
import { servicesArray } from './../services/';
import { NgxTreeDndModule } from 'ngx-tree-dnd';
import { FileExploreComponent } from './file-explore/file-explore.component';




@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CodeEditorComponent,
    FileExploreComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTreeDndModule,
    HttpClientModule,
  ],
  providers: [
    servicesArray,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
