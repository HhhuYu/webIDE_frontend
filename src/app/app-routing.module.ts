import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from "./main-page/main-page.component"
import { FileExploreComponent } from "./file-explore/file-explore.component"

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'explorer', component : FileExploreComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
