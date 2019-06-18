import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgTerminalComponent } from "ng-terminal"
import { NgTerminal } from 'ng-terminal/lib/ng-terminal';

import { TerminalService } from '../../services/terminal-handler/terminal.service';
import { Socket } from 'ngx-socket-io';

import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';



@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(NgTerminalComponent) child: NgTerminal;

  private currentUser: User;

  private command: String = "";

  private dirs: String[];
  private results: String[];
  private _OverSub: Subscription;
  private _ResSub: Subscription;

  

  constructor(
    private terminalService: TerminalService, 
    private socket: Socket,
    private authenticationService: AuthenticationService,
    ) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngAfterViewInit(){
    // this.invalidate();
    this.child.keyInput.subscribe((input) => {
      console.log(input.charCodeAt(0))
      if(input.charCodeAt(0) === 127) {
        // this.child.write(String.fromCharCode(38)); 
      }
      else if(input.charCodeAt(0) === 13) {
        this.child.write('\n');
        this.terminalService.sendCommand(this.command);
        // console.log(this.command)
        this.command = "";
      }
      this.child.write(input);
      this.command += input;
    })
    
  } 


  ngOnInit() {
    this.terminalService.ready();
    this._OverSub = this.terminalService.over.subscribe(dir => {
      // console.log(dir);
      this.child.write("[ " + location.hostname + " " + dir + " ]:")

    });
    this._ResSub = this.terminalService.response.subscribe(result => {
      this.child.write(result);
      this.child.write('\n');
      this.child.write(String.fromCharCode(13));
    })
    this.terminalService.sendCommand("cd " + this.currentUser.username);

  }
  ngOnDestroy() {
    this._OverSub.unsubscribe();
    this._ResSub.unsubscribe();
  }




}
