import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from './create-order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  private orderForm = {};
  private roomData = {};
  private categoryList = [];
  public stepperForm: boolean = false;
  public showItem: boolean = false;
  public room = {};
  public tableData = {};
  public numberOfPerson: number;
  public tableId: number;
  public roomId: number;
  public quantity: number = 0;
  public categorySearchData: any[] = [];
  protected searchStr: string;
  protected dataService: CompleterData;
  protected selectedCategory = {};
  constructor(private createOrderService: CreateOrderService, private completerService: CompleterService, private globalService: GlobalService) {}

  ngOnInit() {
    this.roomData = JSON.parse(localStorage.getItem('roomdata'));
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    this.createOrderService.getCategory()
      .then(data => {
        console.log('data category', data);
        this.categoryList = data.data;
        if (this.categoryList.length) {
          for (var i = 0; i < this.categoryList.length; i++) {
            this.categorySearchData.push({
              _id: this.categoryList[i]._id,
              name: this.categoryList[i].name,
            });
          }
        console.log('this.categorySearchData', this.categorySearchData);
        this.dataService = this.completerService.local(this.categorySearchData, 'name', 'name');
        }
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

  increaseValue() {
    let value = this.quantity;
    value = isNaN(value) ? 0 : value;
    value++;
    this.quantity = value;
  }
  
  decreaseValue() {
    let value = this.quantity;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    this.quantity = value;
  }

  protected onSelected(item) {
    console.log('item',item);
    this.selectedCategory = item? item: {};
  }
}
