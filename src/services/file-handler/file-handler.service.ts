import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../http/http.service';


@Injectable()
export class FileHandlerService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = environment.BASE_URL;
  }

  // public getUserProfile() {
  //   console.log('getUserProfile()');
  //   const queryUrl = this.baseUrl + 'shiro/profile/';
  //   return this.http.get<{ fileTree: any }>(queryUrl)
  //     .pipe(map((body) => body.fileTree));
  // }

  public getUserProfile(userId: String) {
    const finalUrl = `${this.baseUrl}/${userId}/profile`;
    return this.http.get(finalUrl);
  }

  public getUserFile(userId: String, filePath: String) {
    const finalUrl = `${this.baseUrl}/${userId}/file`;
    const requestBody = {
      operation: "get",
      filePath: filePath
    }
    return this.http.post(finalUrl, requestBody);

  }
  

}
