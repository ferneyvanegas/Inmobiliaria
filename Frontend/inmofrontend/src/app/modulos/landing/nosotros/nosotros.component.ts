import { Component, OnInit } from '@angular/core';

import * as data from '../../../../assets/json/xForceTeam.json';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  team:any;

  constructor() { 
    this.team = data;
    this.team = this.team.default;
  }

  ngOnInit(): void {
  }

}
