import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
declare function playAudio(): void;
declare function stopAudio(): void;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public Reservation: boolean = false;
  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;
  constructor(public router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
  }
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  goToLogin() {
    this.router.navigate(['/login']);
    playAudio();
    console.log('login clicked');
    setTimeout(function () {
      stopAudio();
    }, 100);
  }
  showResrvation() {
    this.Reservation = true;
  }
  hideResrvation() {
    this.Reservation = false;
  }
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
}
