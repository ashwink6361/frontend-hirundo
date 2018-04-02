import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hirundo',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>`,
})
export class HirundoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
