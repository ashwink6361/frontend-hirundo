import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../hirundo/global.service';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  public stepArray = ['Uscita 1', 'Uscita 2'];
  public activetab: boolean[] = [];
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    let step = this.globalService.getStepData();
    let data = this.globalService.getTabData();
    if (step && step.length) {
      this.stepArray = step;
    }
    if (data && data.tab) {
      this.activetab[data.tab] = true;
    }
    else {
      this.activetab[0] = true;
    }
    let stepdata = {
      tab: 0,
      step: this.stepArray[0]
    }
    this.globalService.setTabData(stepdata);
  }

  addStep() {
    let count = this.stepArray.length + 1;
    this.stepArray.push('Uscita ' + count);
    this.globalService.setStepData(this.stepArray);
  }

  selectedTab(step, tab) {
    this.activetab[tab] = true;
    for (let i = 0; i < this.activetab.length; i++) {
      if (i != tab) {
        this.activetab[i] = false;
      }
    }
    let data = {
      tab: tab,
      step: step
    }
    this.globalService.setTabData(data);
  }
}
