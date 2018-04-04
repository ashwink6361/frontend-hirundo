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
  protected dataService1: CompleterData;  
  protected selectedCategory = {};
  private categoryItems = [];  
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
  showItems(id, name) {
    let obj = {
      _id: id,
      name: name
    }
    console.log('this.selectedCategory before click', this.selectedCategory);    
    this.selectedCategory = obj;
    console.log('this.selectedCategory on click', this.selectedCategory);
    if (this.selectedCategory) {
      this.searchStr = this.selectedCategory["name"];
      this.dataService1 = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.createOrderService.getCategoryItem().then(data => {
        console.log('data onSelected', data);
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
              this.categoryItems.push(data.data[i].items[0]);
          }
        }
        console.log('this.categoryItems', this.categoryItems);
      })
        .catch(error => {
          console.log('error', error);
        });
      this.showItem = true;
    }
    // this.createOrderService.getCategoryItem().then(data => {
    //   console.log('data onSelected', data);
    // })
    // .catch(error => {
    //   console.log('error', error);
    // });
    // this.showItem = true;
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

  onSelected(item) {
    console.log('item', item);
    // if (item) {
    //   this.selectedCategory = item.originalObject;
    // }
    this.selectedCategory = item ? item.originalObject : {};
    console.log('this.selectedCategory', this.selectedCategory);
    if (this.selectedCategory) {
      this.dataService1 = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.createOrderService.getCategoryItem().then(data => {
        console.log('data onSelected', data);
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
              this.categoryItems.push(data.data[i].items[0]);
          }
        }
        console.log('this.categoryItems', this.categoryItems);
      })
        .catch(error => {
          console.log('error', error);
        });
      this.showItem = true;
    }
  }
}
