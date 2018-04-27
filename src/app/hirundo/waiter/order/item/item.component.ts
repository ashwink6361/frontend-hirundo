import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public quantity: number = 0;
  private articles = [];
  private categoryList = [];
  public categorySearchData: any[] = [];
  protected dataService: CompleterData;
  protected searchStr: string;
  private variantList = [];
  private noteList = [];
  public showVarient:  boolean = false;
  public activeTab: boolean[] = [true,false];
  public data: any;
  public articleAdd: boolean = false;
  protected subcategory: string;
  public selectedSubcategory: boolean[] = [false];
  public variantData = {
    quantity : 0,
    variant : [],
    notes: ''
  }
  public notes = [];
  public variantError = '';
  public articleData: any;
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.data = this.orderService.getOrderData();
    console.log('this.data',this.data);
    if (this.data.categoryItems) {
      for (let i = 0; i < this.data.categoryItems.length; i++) {
        if (this.data.selectedItems.length) {
          for (let j = 0; j < this.data.selectedItems.length; j++) {
            if (this.data.selectedItems[j]._id == this.data.categoryItems[i]._id) {
              this.data.categoryItems[i].quantity = this.data.selectedItems[j].quantity;
            }
          }
        }
      }
      this.orderService.setOrderData(this.data);
      this.articles = this.orderService.getOrderData().categoryItems;
      this.selectedSubcategory[-1] = true;
    }
      this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  // increaseValue(article) {
  //   let value = article.quantity;
  //   value = isNaN(value) ? 0 : value;
  //   value++;
  //   article.quantity = value;
  //   let data = this.orderService.getOrderData();
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     if (data.selectedItems[i]._id == article._id) {
  //       data.selectedItems.splice(i, 1);
  //     }
  //   }
  //   data.selectedItems.push(article);
  //   let cp = 0;
  //   let itemno = 0;                                    
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     itemno += data.selectedItems[i].quantity;                                        
  //     cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
  //     data.cartTotalPrice = cp;
  //     data.cartTotalItem = itemno;                                                        
  //   }
  //   this.orderService.setOrderData(data);
  // }

  // decreaseValue(article) {
  //   let value = article.quantity;
  //   value = isNaN(value) ? 0 : value;
  //   value < 1 ? value = 1 : '';
  //   value--;
  //   article.quantity = value;
  //   let data = this.orderService.getOrderData();
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     if (data.selectedItems[i]._id == article._id) {
  //       data.selectedItems.splice(i, 1);
  //     }
  //   }
  //   this.orderService.setOrderData(data);
  // }





  increaseValue(article) {
    console.log('article inc',article);    
    article.step = this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    if (data.selectedItems.length) {
      let isExist = true;
      let isarr = [];
      for (let i = 0; i < data.selectedItems.length; i++) {
        if (data.selectedItems[i]._id == article._id && !data.selectedItems[i].variant) {
          data.selectedItems[i].quantity += 1;
          isarr.push(data.selectedItems[i]._id);
        }
        if (data.selectedItems[i]._id != article._id) {
          isExist = false;
        }
      }
      if( !isExist && isarr.indexOf(article._id) < 0) {
        article.quantity = article.quantity + 1;
        data.selectedItems.push(article);
      }
    }
    else{
      article.quantity = article.quantity + 1;
      data.selectedItems.push(article);
    }
    let cp = 0;
    let itemno = 0;                                    
    for (let i = 0; i < data.selectedItems.length; i++) {
      itemno += data.selectedItems[i].quantity;                                        
      cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
      data.cartTotalPrice = cp;
      data.cartTotalItem = itemno;                                                        
    }
    this.orderService.setOrderData(data);
    console.log('inc this.orderService.setOrderData(this.data);.',this.orderService.getOrderData());      
  }

  decreaseValue(article) {
    console.log('article dec',article);
    article.step = this.globalService.getTabData().step;    
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems.length; i++) {
      if (data.selectedItems[i]._id == article._id && !data.selectedItems[i].variant) {
          if(data.selectedItems[i].quantity>1){
            data.selectedItems[i].quantity =  data.selectedItems[i].quantity - 1;
        }
          else{
            article.quantity = 0;
          data.selectedItems.splice(i, 1);            
        }
      }
    }
    let cp = 0;
    let itemno = 0;                                        
    if (data.selectedItems.length) {
      for (let i = 0; i < data.selectedItems.length; i++) {
        itemno += data.selectedItems[i].quantity;                                                
        cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
        data.cartTotalPrice = cp;
        data.cartTotalItem = itemno;                                                                
      }
    }
    else {
      data.cartTotalPrice = 0;
      data.cartTotalItem = 0;                                                              
    }
    this.orderService.setOrderData(data);
    console.log('dec this.orderService.setOrderData(this.data);.',this.orderService.getOrderData());          
  }

  viewCart() {
    this.router.navigate(['/waiter/order/:id/cart']);
  }

  viewVarient(article) {
    this.showVarient = true;
    this.articleData = article;
  }

  hideVarient(){
    this.showVarient = false;
    this.variantData = {
      quantity : 0,
      variant : [],
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

  addArticle(){
    this.articleAdd = true;
  }

  hideArticle(){
    this.articleAdd = false;
  }

  filterBySubcategory(subcategory, index){
    this.subcategory = subcategory;
    if(typeof index !== 'undefined'){
      this.selectedSubcategory[index] = true;
      this.selectedSubcategory[-1] = false;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
        if (index != i) {
          this.selectedSubcategory[i] = false;
        }
      }
    }
    else{
      this.selectedSubcategory[-1] = true;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
          this.selectedSubcategory[i] = false;
      }
    }
  }

  decreaseQty(){
    let value = this.variantData.quantity;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    this.variantData.quantity = value;
  }

  increaseQty(){
    let value = this.variantData.quantity;
    value = isNaN(value) ? 0 : value;
    value++;
    this.variantData.quantity = value;
  }

  addRemoveVariant(variant,status){
    if(status == 0){
      variant.status = 0;
    }
    else{
      variant.status = 1;      
    }
    for (let i = 0; i < this.variantData.variant.length; i++) {
      if (this.variantData.variant[i]._id == variant._id) {
        this.variantData.variant.splice(i, 1);
      }
    }
    this.variantData.variant.push(variant);
    console.log('this.variantData',this.variantData);
  }

  addNote(event, note, i) {
    console.log('event', event);
    console.log('note', note);
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
    console.log('this.notes', this.notes);
    this.variantData.notes = this.notes.toString();
    console.log('this.variantData.notes', this.variantData.notes);    
  }

  saveVariantData(){
    console.log('this.variantData', this.variantData);
    if(this.variantData.quantity == 0){
      this.variantError = 'Please enter quantity';
      setTimeout(() => {
        this.variantError = '';
      }, 4000);
    }
    else if(this.variantData.quantity > 0 && !this.variantData.variant.length && !this.variantData.notes){
      this.variantError = 'Please select variants/notes';
      setTimeout(() => {
        this.variantError = '';
      }, 4000);
    }
    else{
      this.articleData.quantity = this.variantData.quantity;
      this.articleData.variant = this.variantData.variant;
      this.articleData.notes = this.variantData.notes;
      this.articleData.step = this.globalService.getTabData().step;    
      let data = this.orderService.getOrderData();
      data.selectedItems.push(this.articleData);
      let cp = 0;
      let itemno = 0;                                    
      for (let i = 0; i < data.selectedItems.length; i++) {
        itemno += data.selectedItems[i].quantity;                                        
        cp += data.selectedItems[i].price * data.selectedItems[i].quantity;
        data.cartTotalPrice = cp;
        data.cartTotalItem = itemno;                                                        
      }
      this.orderService.setOrderData(data);
      this.hideVarient(); 
    console.log('variant this.orderService.setOrderData(this.data);.',this.orderService.getOrderData());            
    }        
  }
}
