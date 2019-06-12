import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MainPageComponent } from './main-page/main-page.component';
import { servicesArray } from './../services/';
import { NgxTreeDndModule } from 'ngx-tree-dnd';
import { FileExploreComponent } from './file-explore/file-explore.component';


import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { EditorViewComponent } from './editor-view/editor-view.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CodeEditorComponent,
    FileExploreComponent,
    HomeComponent,
    LoginComponent,
    EditorViewComponent

  ],
  imports: [
    BrowserModule,
    NgxTreeDndModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    servicesArray,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
