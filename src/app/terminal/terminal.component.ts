import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgTerminalComponent } from "ng-terminal"
import { NgTerminal } from 'ng-terminal/lib/ng-terminal';

import { TerminalService } from '../../services/terminal-handler/terminal.service';
import { Socket } from 'ngx-socket-io';




@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(NgTerminalComponent) child: NgTerminal;

  dirs: String[];
  results: String[];
  private _OverSub: Subscription;
  private _ResSub: Subscription;


  constructor(private terminalService: TerminalService, private socket: Socket) { }

  ngAfterViewInit(){
    // this.invalidate();
    this.child.keyInput.subscribe((input) => {
      if(input.charCodeAt(0) === 13) {
        this.child.write('\n')
      }
      this.child.write(input);
    })
    
  } 


  ngOnInit() {
    this._OverSub = this.terminalService.over.subscribe(dir => {
      console.log(dir);
      this.child.write("[ " + location.hostname + " " + dir + " ]:")
      
    });
    this._ResSub = this.terminalService.response.subscribe(result => this.results)

  }
  ngOnDestroy() {
    this._OverSub.unsubscribe();
    this._ResSub.unsubscribe();
  }




}
