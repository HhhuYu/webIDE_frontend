import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../http/http.service';


@Injectable()
export class FileHandlerService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = environment.TERMINAL_AJAX_URL;
  }

  // public getUserProfile() {
  //   console.log('getUserProfile()');
  //   const queryUrl = this.baseUrl + 'shiro/profile/';
  //   return this.http.get<{ fileTree: any }>(queryUrl)
  //     .pipe(map((body) => body.fileTree));
  // }

  public getUserProfile(username: String) {
    const finalUrl = `${this.baseUrl}/filetree`;
    const requestBody = {
      username: username
    }
    return this.http.post(finalUrl, requestBody);
  }

  public getUserFile(username: String, filePath: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "READ",
      path: filePath,
      username: username
    }
    return this.http.post(finalUrl, requestBody);
  }
  
  public saveUserFile(username: String, filePath: String, content: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "SAVE",
      path: filePath,
      data: content,
      username: username
    }

    return this.http.post(finalUrl, requestBody);
  }

  public renameUserFile(username: String, filePath: String, newPath: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "MOVE",
      path: filePath,
      newPath: newPath,
      username: username
    }

    return this.http.post(finalUrl, requestBody);
  }

  public mkdirUserFile(username: String, filePath: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "MKDIR",
      path: filePath,
      username: username
    }

    return this.http.post(finalUrl, requestBody);
  }

  public deleteUserFile(username: String, filePath: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "DELETE",
      path: filePath,
      username: username
    }

    return this.http.post(finalUrl, requestBody);
  }

  public deleteUserDIR(username: String, filePath: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "RMDIR",
      path: filePath,
      username: username
    }

    return this.http.post(finalUrl, requestBody);
  }

  public generateUserPath(username: String) {
    const finalUrl = `${this.baseUrl}/fsop`;
    const requestBody = {
      type: "MKUSERROOT",
      username: username,
      path: "/"
    }

    return this.http.post(finalUrl, requestBody);
  }
}
