import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { OrderService } from '../order.service';
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
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService) { }

  ngOnInit() {
    this.roomData = JSON.parse(localStorage.getItem('roomdata'));
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    this.orderService.getCategory()
      .then(data => {
        this.categoryList = data.data;
        if (this.categoryList.length) {
          for (var i = 0; i < this.categoryList.length; i++) {
            this.categorySearchData.push({
              _id: this.categoryList[i]._id,
              name: this.categoryList[i].name,
            });
          }
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
    this.selectedCategory = obj;
    if (this.selectedCategory) {
      this.searchStr = this.selectedCategory["name"];
      this.dataService1 = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.orderService.getCategoryItem().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
            this.categoryItems.push(data.data[i].items[0]);
          }
        }
      })
        .catch(error => {
          console.log('error', error);
        });
      this.showItem = true;
    }
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
    this.selectedCategory = item ? item.originalObject : {};
    if (this.selectedCategory) {
      this.dataService1 = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.orderService.getCategoryItem().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category._id == this.selectedCategory["_id"]) {
            this.categoryItems.push(data.data[i].items[0]);
          }
        }
      })
        .catch(error => {
          console.log('error', error);
        });
      this.showItem = true;
    }
  }
}
