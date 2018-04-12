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
  private tables = [];
  private activeRoom: boolean[] = [false];
  constructor(public router: Router, private dashboardService: DashboardService) { }

  ngOnInit() {
    localStorage.removeItem('orderData');
    this.dashboardService.getRooms().then(data => {
      console.log('data', data);
      this.roomData = data.data;
      this.activeRoom[0] = true;
      this.tables = this.roomData[0].tables;
      localStorage.setItem('roomdata', JSON.stringify(this.roomData[0]));
    })
      .catch(error => {
        console.log('error', error);
      });
  }

  createOrder(table) {
    localStorage.setItem('tabledata', JSON.stringify(table));
    let room = JSON.parse(localStorage.getItem('roomdata'));
    this.router.navigate(['/waiter/order', room._id]);
  }

  getTables(room, index) {
    localStorage.setItem('roomdata', JSON.stringify(room));
    this.tables = room.tables;
    this.activeRoom[index] = true;
    for (let i = 0; i < this.activeRoom.length; i++) {
      if (index != i) {
        this.activeRoom[i] = false;
      }
    }
  }
}
