import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from './create-order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { CompleterService, CompleterData } from 'ng2-completer';
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
  public quantity = [];
  public categorySearchData: any[] = [];
  protected searchStr: string;
  protected dataService: CompleterData;
  protected dataService1: CompleterData;
  protected selectedCategory = {};
  private categoryItems = [];
  private addToCartItems: any[] = [];
  private error: boolean = false;
  private errorMsg = '';
  private numberError: boolean = false;
  private numberErrorMsg = '';
  constructor(private createOrderService: CreateOrderService, private completerService: CompleterService, private globalService: GlobalService) { }

  ngOnInit() {
    this.roomData = JSON.parse(localStorage.getItem('roomdata'));
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    this.createOrderService.getCategory()
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
    if(this.numberOfPerson){
      this.stepperForm = true;
    }
    else{
      this.numberError = true;
      this.numberErrorMsg = 'Please choose number of person';
      setTimeout(() => {
        this.numberError = false;
        this.numberErrorMsg = '';
      }, 4000);
    }
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
      this.createOrderService.getCategoryItem().then(data => {
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

  increaseValue(i) {
    let value = this.quantity[i];
    value = isNaN(value) ? 0 : value;
    value++;
    this.quantity[i] = value;
  }

  decreaseValue(i) {
    let value = this.quantity[i];
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    this.quantity[i] = value;
  }

  onSelected(item) {
    this.selectedCategory = item ? item.originalObject : {};
    if (this.selectedCategory) {
      this.dataService1 = this.completerService.local(this.categorySearchData, 'name', 'name');
      this.categoryItems = [];
      this.createOrderService.getCategoryItem().then(data => {
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

  addToCart(article,quantity,index){
    console.log('article',article);
    console.log('quantity',quantity);
    if(quantity>0){
      if (this.addToCartItems.length) {
        for (let i = 0; i < this.addToCartItems.length; i++) {
          if (this.addToCartItems[i]._id == article._id) {
            this.addToCartItems.splice(this.addToCartItems[i], 1);
            console.log('this.addToCartItems 1',this.addToCartItems);
            break;            
          }
        }
      }
      article.quantity = quantity;
      article.priceOfQuantity = article.quantity * article.price;
      this.addToCartItems.push(article);
      console.log('this.addToCartItems',this.addToCartItems);
    }
    else {
      this.error = true;
      this.errorMsg = 'Please choose quantity';
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
      }, 4000);
    }
  }
}
