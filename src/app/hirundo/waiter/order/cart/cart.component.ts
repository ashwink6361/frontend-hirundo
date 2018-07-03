import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private items = [];
  private orderItems = [];
  private orderId;
  private variantList = [];
  private noteList = [];
  public tableData: any;
  public showVarient: boolean = false;
  public activeTab: boolean[] = [true, false];
  public variantData = {
    quantity: 0,
    variant: [],
    notes: ''
  }
  public notes = [];
  public variantError = '';
  public showElement = 0;
  public articleData: any;
  public nonVariantData: boolean = false;  
  public orderItemsTotalPrice = 0;
  public orderItemsTotalItem = 0;         
  constructor(private orderService: OrderService, private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    this.tableData = JSON.parse(localStorage.getItem('tabledata'));
    if (this.tableData.orderId.length) {
      var cp = 0;
      var itemno = 0;
      var varicost = 0;
      this.orderItemsTotalPrice = 0;
      this.orderItemsTotalItem = 0;
      for (var k = 0; k < this.tableData.orderId.length; k++) {
        for (var i = 0; i < this.tableData.orderId[k].item.length; i++) {
          varicost = 0;
          itemno += this.tableData.orderId[k].item[i].quantity;
          if (this.tableData.orderId[k].item[i].variant) {
            for (var j = 0; j < this.tableData.orderId[k].item[i].variant.length; j++) {
              if (this.tableData.orderId[k].item[i].variant[j].status == 1) {
                varicost += this.tableData.orderId[k].item[i].variant[j].price;
              }
            }
          }
          cp += (this.tableData.orderId[k].item[i].price + varicost) * this.tableData.orderId[k].item[i].quantity;
          this.orderItemsTotalPrice = cp + (this.tableData.orderId[0].seatCost * this.tableData.orderId[0].noOfPeople);
          this.orderItemsTotalItem = itemno;
        }
      }
    }      
  }

  createOrder() {
    let data = this.orderService.getOrderData();
    console.log('data',data);
    var itemarray = [];
    var steps = [];
    if (this.globalService.getStepData()) {
      steps = this.globalService.getStepData();
    }
    else {
      steps = ['Uscita 1', 'Uscita 2'];
    }
    for (let a = 0; a < steps.length; a++) {
      for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
        var vararray = [];
        if (data.selectedItems[steps[a]][i].variant) {
          for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
            var catarray = [];
            for (let k = 0; k < data.selectedItems[steps[a]][i].variant[j].category.length; k++) {
              catarray.push(data.selectedItems[steps[a]][i].variant[j].category[k]._id);
            }
            var vari = {
              name: data.selectedItems[steps[a]][i].variant[j].name,
              category: catarray,
              price: data.selectedItems[steps[a]][i].variant[j].price,
              status: data.selectedItems[steps[a]][i].variant[j].status,
              id: data.selectedItems[steps[a]][i].variant[j]._id
            }
            vararray.push(vari);
          }
        }
        var item = {
          id: data.selectedItems[steps[a]][i]._id,
          category: data.selectedItems[steps[a]][i].category._id,
          quantity: data.selectedItems[steps[a]][i].quantity,
          price: data.selectedItems[steps[a]][i].price,
          notes: data.selectedItems[steps[a]][i].ordernote ? data.selectedItems[steps[a]][i].ordernote : '',
          variant: vararray,
          step: data.selectedItems[steps[a]][i].step,
          department: data.selectedItems[steps[a]][i].category.department,
          preparationTime: data.selectedItems[steps[a]][i].preparationTime          
        }
        itemarray.push(item);
      }
    }
    let createorder = {
      room: data.roomId,
      table: data.tableId,
      noOfPeople: data.noOfPeople,
      item: itemarray
    }
    this.orderService.createOrder(createorder)
      .then(data => {
        this.router.navigate(['/waiter/list']);
        this.orderService.showElement = false;
      })
      .catch(error => {
      });
  }

  deleteItemFromCart(article) {
    let data = this.orderService.getOrderData();
    let currentStep = this.globalService.getTabData().step;
    for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
      if (data.selectedItems[currentStep][i]._id == article._id && !article.variant) {
        //non variant type data
        for (let m = 0; m < data.categoryItems[currentStep].length; m++) {
          if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
            data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
          }
        }
        if (!data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
          data.selectedItems[currentStep].splice(i, 1);
        }
      }
      else if (data.selectedItems[currentStep][i]._id == article._id && article.variant) {
        //variant type data
        for (let m = 0; m < data.categoryItems[currentStep].length; m++) {
          if (data.categoryItems[currentStep][m]._id == data.selectedItems[currentStep][i]._id) {
            data.categoryItems[currentStep][m].itemTotal = data.categoryItems[currentStep][m].itemTotal - data.selectedItems[currentStep][i].quantity;
          }
        }
        if (data.selectedItems[currentStep][i].variant && currentStep == data.selectedItems[currentStep][i].step) {
          data.selectedItems[currentStep].splice(i, 1);
        }
      }
    }
    let cp = 0;
    let itemno = 0;
    let varicost = 0;
    var steps = [];
    if (this.globalService.getStepData()) {
      steps = this.globalService.getStepData();
    }
    else {
      steps = ['Uscita 1', 'Uscita 2'];
    }
    let emptyArray = [];
    for (let a = 0; a < steps.length; a++) {
      if (data.selectedItems[steps[a]].length) {
        for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
          itemno += data.selectedItems[steps[a]][i].quantity;
          if (data.selectedItems[steps[a]][i].variant) {
            for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
              if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                varicost += data.selectedItems[steps[a]][i].variant[j].price;
              }
            }
          }
          cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
          data.cartTotalPrice = cp;
          data.cartTotalItem = itemno;
        }
      }
      if (data.selectedItems[steps[a]].length == 0) {
        if (emptyArray.indexOf(steps[a]) < 0) {
          emptyArray.push(steps[a]);
        }
      }
      if (emptyArray.length == steps.length) {
        data.cartTotalPrice = 0;
        data.cartTotalItem = 0;
      }
    }
    this.orderService.setOrderData(data);
  }

  gotToCategoryList() {
    this.router.navigate(['/waiter/order/:id/choose-category']);
    this.orderService.showElement = true;
  }

  viewVarient(article) {
    this.nonVariantData = false;             
    this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
        this.articleData = article;
        if (!article.variant) {
          this.nonVariantData = true;
          this.variantData.quantity = article.quantity;
        }
        else {
          this.nonVariantData = false;          
          this.variantData.quantity = article.quantity;
          this.variantData.variant = article.variant;
          this.variantData.notes = article.ordernote;
          if (article.ordernote) {
            let note = article.ordernote.split(',');
            this.notes = note;
          }
          for (let i = 0; i < this.variantData.variant.length; i++) {
            if (this.variantList.length) {
              for (let j = 0; j < this.variantList.length; j++) {
                if (this.variantData.variant[i]._id == this.variantList[j]._id) {
                  this.variantList[j].status = this.variantData.variant[i].status;
                }
              }
            }
          }
        }
        if (this.articleData) {
          this.showVarient = true;
          this.activeTab[0] = true;
          this.activeTab[1] = false;
        }
      })
      .catch(error => {
      });
  }

  hideVarient() {
    this.showVarient = false;
    this.nonVariantData = false;              
    this.variantData = {
      quantity: 0,
      variant: [],
      notes: ''
    };
    this.notes = [];
    this.articleData = {};
  }

  tabActive(tab) {
    if (tab == 1) {
      this.activeTab[0] = true;
      this.activeTab[1] = false;
    }
    else {
      this.activeTab[1] = true;
      this.activeTab[0] = false;
    }
  }

  decreaseQty() {
    let value = this.variantData.quantity;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    this.variantData.quantity = value;
  }

  increaseQty() {
    let value = this.variantData.quantity;
    value = isNaN(value) ? 0 : value;
    value++;
    this.variantData.quantity = value;
  }

  addRemoveVariant(variant, status) {
    if (status == 0) {
      variant.status = 0;
    }
    else {
      variant.status = 1;
    }
    for (let i = 0; i < this.variantData.variant.length; i++) {
      if (this.variantData.variant[i]._id == variant._id) {
        this.variantData.variant.splice(i, 1);
      }
    }
    this.variantData.variant.push(variant);
  }

  addNote(event, note, i) {
    if (event.target.checked) {
      this.notes.push(note);
    }
    else {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i] == note) {
          this.notes.splice(i, 1);
        }
      }
    }
    this.variantData.notes = this.notes.toString();
  }

  saveVariantData() {
    if (!this.articleData.variant) {
      if (this.variantData.quantity == 0) {
        this.variantError = 'Please enter quantity';
        setTimeout(() => {
          this.variantError = '';
        }, 4000);
      }
      else {
        this.articleData.quantity = this.variantData.quantity;
        let data = this.orderService.getOrderData();
        for (let i = 0; i < data.selectedItems[this.articleData.step].length; i++) {
          if (data.selectedItems[this.articleData.step][i]._id == this.articleData._id && !data.selectedItems[this.articleData.step][i].variant) {
            data.selectedItems[this.articleData.step][i].quantity = this.articleData.quantity;
          }
        }
        for (let i = 0; i < data.categoryItems[this.articleData.step].length; i++) {
          if (data.categoryItems[this.articleData.step][i]._id == this.articleData._id) {
            data.categoryItems[this.articleData.step][i].itemTotal = data.categoryItems[this.articleData.step][i].itemTotal + this.articleData.quantity;
          }
        }
        let cp = 0;
        let itemno = 0;
        let varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
          steps = this.globalService.getStepData();
        }
        else {
          steps = ['Uscita 1', 'Uscita 2'];
        }
        for (let a = 0; a < steps.length; a++) {
          for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
            itemno += data.selectedItems[steps[a]][i].quantity;
            if (data.selectedItems[steps[a]][i].variant) {
              for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                  varicost += data.selectedItems[steps[a]][i].variant[j].price;
                }
              }
            }
            cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
            data.cartTotalPrice = cp;
            data.cartTotalItem = itemno;
          }
        }
        this.orderService.setOrderData(data);
        this.hideVarient();
      }
    }
    else {
      if (this.variantData.quantity == 0) {
        this.variantError = 'Please enter quantity';
        setTimeout(() => {
          this.variantError = '';
        }, 4000);
      }
      else if (this.variantData.quantity > 0 && !this.variantData.variant.length && !this.variantData.notes) {
        this.variantError = 'Please select variants/notes';
        setTimeout(() => {
          this.variantError = '';
        }, 4000);
      }
      else {
        this.articleData.quantity = this.variantData.quantity;
        this.articleData.variant = this.variantData.variant;
        this.articleData.ordernote = this.variantData.notes;
        let data = this.orderService.getOrderData();
        for (let i = 0; i < data.selectedItems[this.articleData.step].length; i++) {
          if (data.selectedItems[this.articleData.step][i]._id == this.articleData._id && data.selectedItems[this.articleData.step][i].variant && data.selectedItems[this.articleData.step][i].variantUniqueId == this.articleData.variantUniqueId) {
            data.selectedItems[this.articleData.step][i].quantity = this.articleData.quantity;
            data.selectedItems[this.articleData.step][i].variant = this.articleData.variant;
            data.selectedItems[this.articleData.step][i].ordernote = this.articleData.ordernote;
          }
        }
        for (let i = 0; i < data.categoryItems[this.articleData.step].length; i++) {
          if (data.categoryItems[this.articleData.step][i]._id == this.articleData._id) {
            data.categoryItems[this.articleData.step][i].itemTotal = data.categoryItems[this.articleData.step][i].itemTotal + this.articleData.quantity;
          }
        }
        let cp = 0;
        let itemno = 0;
        let varicost = 0;
        var steps = [];
        if (this.globalService.getStepData()) {
          steps = this.globalService.getStepData();
        }
        else {
          steps = ['Uscita 1', 'Uscita 2'];
        }
        for (let a = 0; a < steps.length; a++) {
          for (let i = 0; i < data.selectedItems[steps[a]].length; i++) {
            itemno += data.selectedItems[steps[a]][i].quantity;
            if (data.selectedItems[steps[a]][i].variant) {
              for (let j = 0; j < data.selectedItems[steps[a]][i].variant.length; j++) {
                if (data.selectedItems[steps[a]][i].variant[j].status == 1) {
                  varicost += data.selectedItems[steps[a]][i].variant[j].price;
                }
              }
            }
            cp += (data.selectedItems[steps[a]][i].price + varicost) * data.selectedItems[steps[a]][i].quantity;
            data.cartTotalPrice = cp;
            data.cartTotalItem = itemno;
          }
        }
        this.orderService.setOrderData(data);
        this.hideVarient();
      }
    }
  }

  hideStep(){
    this.orderService.showElement = false;
    this.router.navigate(['/waiter']);
  }
}
