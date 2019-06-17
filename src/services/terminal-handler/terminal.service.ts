import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})

export class TerminalService {
  isConnect = this.socket.fromEvent<any>('connect');
  response = this.socket.fromEvent<any>('response');
  over = this.socket.fromEvent<any>('over');


  constructor(private socket: Socket) { }

  sendCommand(s){
    this.socket.emit("command", s);
  }

  ready() {
    this.socket.emit('command', 'clear');
  }





}
