import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorViewComponent } from "../editor-view/editor-view.component"
import { FileExploreComponent } from "../file-explore/file-explore.component"
import { ServerHandlerService } from './../../services';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
}) 
export class MainPageComponent implements OnInit {
    @ViewChild(EditorViewComponent) editorView: EditorViewComponent;

    @ViewChild(FileExploreComponent) fileTree: FileExploreComponent;
  

    constructor(private handler: ServerHandlerService) { }

    ngOnInit() {
       
    }

    
  onContentChange(content) {
    console.log(content)
    this.editorView.onChangeContent(content);
    // window.alert('You will be notified when the product goes on sale');
  }
}
