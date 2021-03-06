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

import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AdminComponent } from './admin';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { RegisterComponent } from './register/register.component';
import { TerminalComponent } from './terminal/terminal.component';

import { NgTerminalModule } from 'ng-terminal';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CodeEditorComponent,
    FileExploreComponent,
    HomeComponent,
    LoginComponent,
    EditorViewComponent,
    AdminComponent,
    RegisterComponent,
    TerminalComponent

  ],
  imports: [
    BrowserModule,
    NgxTreeDndModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    SocketIoModule.forRoot(config),
    NgTerminalModule
  ],
  providers: [
    servicesArray,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
