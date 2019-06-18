import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileHandlerService } from '../../services';
import { TreeModel } from "../../models/treeModel/treeModel"
import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-file-explore',
  templateUrl: './file-explore.component.html',
  styleUrls: ['./file-explore.component.css']
})
export class FileExploreComponent implements OnInit {

  @Output() contentNotify = new EventEmitter();


  private currentUser: User;

  private myTree: Array<TreeModel>;
  private currentEvent: string;
  private config;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private handler: FileHandlerService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  ngOnInit() {

    this.fileTreeInit()
    // this.myTree = this.pipeUserProfile();
    this.userProfile(this.currentUser.username);

  }

  private fileTreeInit() {

    // this.currentEvent = 'start do something';
    this.config = {
      showActionButtons: true,
      showAddButtons: true,
      showRenameButtons: true,
      showDeleteButtons: true,
      showRootActionButtons: true, // set false to hide root action buttons.
      enableExpandButtons: true,
      enableDragging: true,
      // rootTitle: 'Company Tree',
      validationText: '请输入有效字符',
      minCharacterLength: 1,
      setItemsAsLinks: false,
      setFontSize: 16,
      setIconSize: 8
    };
  }


  public userProfile(userId: String) {
    this.handler.getUserProfile(userId)
      .subscribe((data: Array<TreeModel>) => {
        // console.log(data);
        this.config.rootTitle = userId;
        this.myTree = data;
        console.log(this.myTree)
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
      .subscribe((rep: any) => {

        const content = rep.data
        const format = this.getFileFormat(filePath);
        this.contentNotify.emit({
          format: format,
          content: content,
          path: filePath
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

    if (filePath.split('.').length !== 1) {
      this.getUserFile(this.currentUser.username, filePath)
    }

    // this.currentEvent = ' on drag start';
    // console.log(event);
  }
  onDrop(event) {
    // this.currentEvent = 'on drop';
    // console.log(event);
  }
  onAllowDrop(event) {
    // this.currentEvent = 'on allow drop';
  }
  onDragEnter(event) {
    // this.currentEvent = 'on drag enter';
  }
  onDragLeave(event) {
    // this.currentEvent = 'on drag leave';
  }
  onAddItem(event) {
    // this.currentEvent = 'on add item';
    console.log(event)
    if (event.parent !== 'root') {
      const paramList = event.parent.options.href.split(".");

      if (paramList.length !== 1) {
        alert("此处无法添加文件");
      }
      console.log(event);
    }
  }
  onStartRenameItem(event) {
    // this.currentEvent = 'on start edit item';
    console.log(event)
  }
  onFinishRenameItem(event) {
    // this.currentEvent = 'on finish edit item';
    if (event.element.options.href !== '#') {
      const paramList = event.element.options.href.split("/");
      const origin = paramList[paramList.length - 1];
      paramList.pop()

      const newPath = event.element.name
      if (newPath && newPath !== origin) {
        paramList.push(newPath)
        const originFilePath = event.element.options.href;
        this.handler.renameUserFile(this.currentUser.username, originFilePath, paramList.join('/'))
          .subscribe((rep: any) => {
            alert("修改成功");
          })
        console.log(paramList.join("/"))
      }
    }
    else {

      const newFileName = event.element.name;
      const paramList = newFileName.split('.');

      var parentUrl = ""
      if (event.parent !== 'root') {
        parentUrl = event.parent.options.href;
      }

      const newFilePath = `${parentUrl}/${newFileName}`;

      event.element.options.href = newFilePath;
      if (paramList.length !== 1) {
        this.handler.saveUserFile(this.currentUser.username, newFilePath, "")
          .subscribe((req: any) => {
            alert("new file");
          })
      } else {
        this.handler.mkdirUserFile(this.currentUser.username, newFilePath)
          .subscribe((rep: any) => {
            alert("new dir");
          })
      }

    }
    console.log(event)
  }
  onStartDeleteItem(event) {
    // console.log('start delete');
    // console.log(event)
    // this.currentEvent = 'on start delete item';
  }
  onFinishDeleteItem(event) {
    const fileName = event.element.name;
    const paramList = fileName.split('.');
    const filePath = event.element.options.href;

    if (paramList.length !== 1) {
      this.handler.deleteUserFile(this.currentUser.username, filePath)
        .subscribe((rep: any) => {
          alert("delete file")
        })
    } else {
      this.handler.deleteUserDIR(this.currentUser.username, filePath)
        .subscribe((rep: any) => {
          alert("delete dir");
        })
    }
    // this.currentEvent = 'on finish delete item';
  }
  onCancelDeleteItem(event) {
    // console.log('cancel delete');
    // this.currentEvent = 'on cancel delete item';
  }

}
