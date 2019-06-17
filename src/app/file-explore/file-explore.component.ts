import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileHandlerService } from '../../services';
import { TreeModel } from "../../models/treeModel/treeModel"


@Component({
  selector: 'app-file-explore',
  templateUrl: './file-explore.component.html',
  styleUrls: ['./file-explore.component.css']
})
export class FileExploreComponent implements OnInit {

  @Output() contentNotify = new EventEmitter();

  private myTree: Array<TreeModel>;
  private currentEvent: string;
  private config;

  constructor(private handler: FileHandlerService) { }

  ngOnInit() {
    // this.myTree = this.pipeUserProfile();
    this.userProfile("shiro");
    this.fileTreeInit()
  }

  private fileTreeInit() {

    this.currentEvent = 'start do something';
    this.config = {
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
      setItemsAsLinks: false,
      setFontSize: 16,
      setIconSize: 8
    };
  }


  public userProfile(userId: String) {
    this.handler.getUserProfile(userId)
      .subscribe((data: Array<TreeModel>) => {
        this.myTree = data;
        // console.log(this.myTree)
      });

  }

  public fileExtensionMap: Map<String, String> = new Map([
    ["md", "markdown"],
    ["java", "java"],
    ["c", "c"],
    ["py", "python"]
  ])

  private getFileFormat(filePath: String) {
    const paramList = filePath.split('.');
    const format = paramList[paramList.length - 1];
    if (this.fileExtensionMap.has(format)) {
      const language = this.fileExtensionMap.get(format)
      console.log(language)
      return language;
    }
  }

  public getUserFile(userId: String, filePath: String) {
    this.handler.getUserFile(userId, filePath)
      .subscribe((data: any) => {
        const content = data.content
        const format = this.getFileFormat(filePath);
        this.contentNotify.emit({
          format: format,
          content: content
        })
      })
  }

  // private pipeUserProfile() {
  //   return this.handler.getUserProfile()
  //     .pipe(
  //       map((response: Array<TreeModel>) => {
  //         console.log(response);
  //         return response.;
  //       }))
  // }






  onDragStart(event) {
    const filePath = event.target.options.href

    this.getUserFile("shiro", filePath)

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
