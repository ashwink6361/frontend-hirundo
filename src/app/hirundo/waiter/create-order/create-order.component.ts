import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from './create-order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service'
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  private orderForm = {};
  private roomData = {};
  private category = [];
  public stepperForm: boolean = false;
  public showItem: boolean = false;
  public room = {};
  public tableData = {};
  public numberOfPerson: number;
  public tableId: number;
  public roomId: number;

  constructor(private createOrderService: CreateOrderService, private globalService: GlobalService) { }

  ngOnInit() {
    this.roomData = JSON.parse(localStorage.getItem('roomdata'));
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    console.log(this.roomData, 'this.roomData');

    this.createOrderService.getCategory().then(data => {
      console.log('data', data);
      this.category = data.data;
      console.log('this.category', this.category);
    })
      .catch(error => {
        console.log('error', error);
      });
  }

  stepper() {
    this.stepperForm = true;
  }
  stepperback() {
    this.stepperForm = false;
  }
  showItems() {
    this.showItem = true;
  }
  hideItem() {
    this.showItem = false;
  }


  // selectRoom(room): void {
  //   console.log('room',room);
  //   this.tableId = null;
  //   this.roomId = room._id;
  //   this.tableData = room.tables;
  //   console.log('this.tableData',this.tableData);    
  //   };
}
