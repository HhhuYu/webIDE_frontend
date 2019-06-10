// src/services/index.ts
import { HttpService } from './http/http.service';
import { ServerHandlerService } from './server-handler/server-handler.service';
import { FileHandlerService } from "./file-handler/file-handler.service"
export const servicesArray = [
   HttpService,
   ServerHandlerService,
   FileHandlerService
];
export { HttpService } from './http/http.service';
export { ServerHandlerService } from './server-handler/server-handler.service';
export { FileHandlerService } from './file-handler/file-handler.service';