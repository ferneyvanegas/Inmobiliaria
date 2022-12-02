import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

import { Msn } from './config/msn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inmofrontend';

  type:string;
  msn:string;

  constructor(private _global: GlobalService){
    
    this.type = '';
    this.msn = '';

    this._global.msnEmitter.subscribe((message:Msn)=>{
      this.type = message.getType();
      this.msn = message.getMsn();
      (<HTMLElement>document.getElementById('btnMsn')).click();
      
    });
  }
}
