import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private roomData = [];

  constructor(public router: Router, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getRooms().then(data => {
      console.log('data', data);
      this.roomData = data.data;
      console.log('this.roomData', this.roomData);
    })
      .catch(error => {
        console.log('error', error);
      });
  }




createOrder(table, room) {
  localStorage.setItem('roomdata', JSON.stringify(room));
  localStorage.setItem('tabledata', JSON.stringify(table));
  this.router.navigate(['/waiter/order', room._id]);
}

}
