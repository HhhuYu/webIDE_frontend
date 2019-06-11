import { Component, ViewChild } from '@angular/core';
import { MainPageComponent } from "./main-page/main-page.component"
import { FileExploreComponent } from "./file-explore/file-explore.component"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MainPageComponent) mainPage: MainPageComponent;

  @ViewChild(FileExploreComponent) fileTree: FileExploreComponent;

  title = 'IDE';



  onContentChange(content) {
    console.log(content)
    this.mainPage.onChangeContent(content);
    // window.alert('You will be notified when the product goes on sale');
  }
}
