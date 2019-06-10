import { Component, OnInit } from '@angular/core';
import { FileHandlerService } from '../../services';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-explore',
  templateUrl: './file-explore.component.html',
  styleUrls: ['./file-explore.component.css']
})
export class FileExploreComponent implements OnInit {

  private myTree

  constructor(private handler: FileHandlerService) { }

  ngOnInit() {
    this.myTree = this.pipeUserProfile();
    console.log("mytree", this.myTree);
  }

  private pipeUserProfile() {
    return this.handler.getUserProfile()
    .pipe(
        map((response) => {
          console.log("Hello",response);
        }))
  }

  currentEvent: string = 'start do something';
  config = {
      showActionButtons: true,
      showAddButtons: true,
      showRenameButtons: true,
      showDeleteButtons: true,
      showRootActionButtons: true, // set false to hide root action buttons.
      enableExpandButtons: true,
      enableDragging: true,
      rootTitle: 'Company Tree',
      validationText: 'Enter valid company',
      minCharacterLength: 5,
      setItemsAsLinks: true,
      setFontSize: 16,
      setIconSize: 8
  };
  

  onDragStart(event) {
     this.currentEvent = ' on drag start';
     console.log(event);
  }
  onDrop(event) {
    this.currentEvent = 'on drop';
    console.log(event);
  }
  onAllowDrop(event) {
    this.currentEvent = 'on allow drop';
  }
  onDragEnter(event) {
    this.currentEvent = 'on drag enter';
  }
  onDragLeave(event) {
    this.currentEvent = 'on drag leave';
  }
  onAddItem(event) {
    this.currentEvent = 'on add item';
    console.log(event);
  }
  onStartRenameItem(event) {
    this.currentEvent = 'on start edit item';
  }
  onFinishRenameItem(event) {
    this.currentEvent = 'on finish edit item';
  }
  onStartDeleteItem(event) {
    console.log('start delete');
    this.currentEvent = 'on start delete item';
  }
  onFinishDeleteItem(event) {
    console.log('finish delete');
    this.currentEvent = 'on finish delete item';
  }
  onCancelDeleteItem(event) {
    console.log('cancel delete');
    this.currentEvent = 'on cancel delete item';
  }

}
