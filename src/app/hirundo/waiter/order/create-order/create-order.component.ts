import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  private orderForm = {};
  private roomData = {};
  public stepperForm: boolean = false;
  public showItem: boolean = false;
  public room = {};
  public tableData = {};
  public noOfPeople: number;
  public tableId: number;
  public roomId: number;
  public quantity: number = 0;
  public categorySearchData: any[] = [];
  protected searchStr: string;
  protected dataService: CompleterData;
  protected dataService1: CompleterData;
  protected selectedCategory = {};
  private categoryItems = [];
  public numberError: boolean = false;
  public numberErrorMsg: string = '';
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    localStorage.removeItem('tabData');
    localStorage.removeItem('stepData');    
    if (this.orderService.getOrderData()) {
      this.noOfPeople = this.orderService.getOrderData().noOfPeople;
    }
    this.roomData = JSON.parse(localStorage.getItem('roomdata'));
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
  }

  makeOrder() {
    if (this.noOfPeople) {
      var steps = [];
      let selectedItems = {};      
      if (this.globalService.getStepData()) {
        steps = this.globalService.getStepData();
      }
      else {
        steps = ['Uscita 1', 'Uscita 2'];
      }
      for (let j = 0; j < steps.length; j++) {
        selectedItems[steps[j]] = [];
      }
      let data = {
        roomId: this.roomData["_id"],
        tableId: this.tableData["_id"],
        noOfPeople: this.noOfPeople,
        selectedItems: selectedItems,
        cartTotalPrice : 0,
        cartTotalItem: 0
      }
      this.orderService.setOrderData(data);
      this.router.navigate(['/waiter/order/:id/choose-category']);
    }
    else {
      this.numberError = true;
      this.numberErrorMsg = 'Please choose number of person';
      setTimeout(() => {
        this.numberError = false;
        this.numberErrorMsg = '';
      }, 4000);
    }
  }
}
