import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { GlobalService } from '../../../global.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import *  as _ from 'lodash';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public quantity: number = 0;
  private articles = {};
  // private articles = [];  
  private categoryList = [];
  public categorySearchData: any[] = [];
  protected dataService: CompleterData;
  protected searchStr: string;
  private variantList = [];
  private noteList = [];
  public showVarient: boolean = false;
  public activeTab: boolean[] = [true, false];
  public data: any;
  public articleAdd: boolean = false;
  protected subcategory: string;
  public selectedSubcategory: boolean[] = [false];
  public showAllergenIcon:boolean = false;
  public variantData = {
    quantity: 0,
    variant: [],
    notes: ''
  }
  public notes = [];
  public variantError = '';
  public articleData: any;
  public AddDataArticle = {
    name: '',
    price: '',
    category: '',
    subCategory: '',
    quantity: 0,
    variant: [],
    notes: '',
    isDeleted: true
  }
  public articleNotes = [];  
  public loader: boolean = false;
  public addArticleError = '';
  public allergens = [];
  public selectedIconImage = [];
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.data = this.orderService.getOrderData();
    if (this.data.categoryItems) {
      var steps = [];
      if (this.globalService.getStepData()) {
        steps = this.globalService.getStepData();
      }
      else {
        steps = ['Uscita 1', 'Uscita 2'];
      }
      for (let k = 0; k < steps.length; k++) {
        for (let i = 0; i < this.data.categoryItems[steps[k]].length; i++) {
          if (this.data.selectedItems[steps[k]].length) {
            let temp = 0;
            for (let j = 0; j < this.data.selectedItems[steps[k]].length; j++) {
              if (this.data.selectedItems[steps[k]][j]._id == this.data.categoryItems[steps[k]][i]._id) {
                temp = temp + this.data.selectedItems[steps[k]][j].quantity;
                this.data.categoryItems[steps[k]][i].itemTotal = temp;
              }
            }
          }
        }
      }
      this.orderService.setOrderData(this.data);
      this.articles = this.orderService.getOrderData().categoryItems;
      this.selectedSubcategory[-1] = true;
    }
  }

  increaseValue(article) {
    article.step = this.globalService.getTabData().step;
    let currentStep = this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    if (data.selectedItems[currentStep].length) {
      let isExist = true;
      let isarr = [];
      for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
        if (data.selectedItems[currentStep][i]._id == article._id) {
          if (!data.selectedItems[currentStep][i].variant) {
            data.selectedItems[currentStep][i].quantity += 1;
            isarr.push(data.selectedItems[currentStep][i]._id);
            for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
              if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
                data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal + 1;
              }
            }
          }
          if (data.selectedItems[currentStep][i].variant) {
            isExist = false;
          }
        }
        if (data.selectedItems[currentStep][i]._id != article._id) {
          isExist = false;
        }
      }
      if (!isExist && isarr.indexOf(article._id) < 0) {
        article.quantity = article.quantity + 1;
        for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
          if (data.categoryItems[currentStep][j]._id == article._id) {
            data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal + article.quantity;
          }
        }
        data.selectedItems[currentStep].push(article);
      }
    }
    else {
      article.quantity = article.quantity + 1;
      for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
        if (data.categoryItems[currentStep][j]._id == article._id) {
          data.categoryItems[currentStep][j].itemTotal = article.quantity;
        }
      }
      data.selectedItems[currentStep].push(article);
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
    this.articles = this.orderService.getOrderData().categoryItems;
  }

  decreaseValue(article) {
    article.step = this.globalService.getTabData().step;
    let currentStep = this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
      if (data.selectedItems[currentStep][i]._id == article._id && !data.selectedItems[currentStep][i].variant && data.selectedItems[currentStep][i].step == article.step) {
        if (data.selectedItems[currentStep][i].quantity > 1) {
          data.selectedItems[currentStep][i].quantity = data.selectedItems[currentStep][i].quantity - 1;
          for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
            if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
              data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal - 1;
            }
          }
        }
        else {
          article.quantity = 0;
          for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
            if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
              data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal - 1;
            }
          }
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
    this.articles = this.orderService.getOrderData().categoryItems;
  }

  viewCart() {
    this.router.navigate(['/waiter/order/:id/cart']);
  }

  allergenIcon() {
    this.showAllergenIcon = !this.showAllergenIcon;
  }

  viewVarient(article) {
    this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
      })
      .catch(error => {
      });
    this.showVarient = true;
    this.articleData = article;
    this.notes = [];
    this.activeTab[0] = true;
    this.activeTab[1] = false;
  }

  hideVarient() {
    this.showVarient = false;
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

  addArticle() {
//     this.orderService.getAllergens().then(data=>{
// console.log('data',data);
// this.allergens = data.data;
//     })
//     .catch(error=>{
//       console.log('error',error);
//     });
    this.orderService.getVariantAndNotes()
      .then(data => {
        this.variantList = data.data.variants;
        this.noteList = data.data.notes;
      })
      .catch(error => {
      });
    this.articleAdd = true;
    this.AddDataArticle = {
      name: '',
      price: '',
      category: '',
      subCategory: '',
      quantity: 0,
      variant: [],
      notes: '',
      isDeleted: true
    }
    this.articleNotes = [];
    this.activeTab[0] = true;
    this.activeTab[1] = false;
  }

  hideArticle() {
    this.articleAdd = false;
    this.AddDataArticle = {
      name: '',
      price: '',
      category: '',
      subCategory: '',
      quantity: 0,
      variant: [],
      notes: '',
      isDeleted: true
    };
    // this.selectedIconImage = [];
    // this.allergens = [];
    // this.showVarient = false;
    // this.variantData = {
    //   quantity: 0,
    //   variant: [],
    //   notes: ''
    // };
    this.articleNotes = [];
    // this.articleData = {};
  }

  filterBySubcategory(subcategory, index) {
    this.subcategory = subcategory;
    if (typeof index !== 'undefined') {
      this.selectedSubcategory[index] = true;
      this.selectedSubcategory[-1] = false;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
        if (index != i) {
          this.selectedSubcategory[i] = false;
        }
      }
    }
    else {
      this.selectedSubcategory[-1] = true;
      for (let i = 0; i < this.selectedSubcategory.length; i++) {
        this.selectedSubcategory[i] = false;
      }
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
    let currentStep = this.globalService.getTabData().step;
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
      this.articleData.step = currentStep;
      this.articleData.variantUniqueId = Math.floor(Math.random() * 10000);
      let data = this.orderService.getOrderData();
      data.selectedItems[currentStep].push(this.articleData);
      for (let i = 0; i < data.categoryItems[currentStep].length; i++) {
        if (data.categoryItems[currentStep][i]._id == this.articleData._id) {
          data.categoryItems[currentStep][i].itemTotal = data.categoryItems[currentStep][i].itemTotal + this.articleData.quantity;
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
      this.articles = this.orderService.getOrderData().categoryItems;
    }
  }

  saveAddArticleData() {
    let currentStep = this.globalService.getTabData().step;    
    if (this.AddDataArticle.name === '') {
      this.addArticleError = 'Please enter name';
      setTimeout(() => {
        this.addArticleError = '';
      }, 4000);
    }
    else if (this.AddDataArticle.quantity == 0) {
      this.addArticleError = 'Please enter quantity';
      setTimeout(() => {
        this.addArticleError = '';
      }, 4000);
    }
    else if (this.AddDataArticle.price === '') {
      this.addArticleError = 'Please enter price';
      setTimeout(() => {
        this.addArticleError = '';
      }, 4000);
    }
    else {
      let orderdata = this.orderService.getOrderData();
      this.AddDataArticle.category = this.orderService.getOrderData().selectedCategory._id;
      if (this.selectedSubcategory[-1]) {
        this.AddDataArticle.subCategory = '';
      }
      if (!this.selectedSubcategory[-1]) {
        if (this.orderService.getOrderData().selectedCategory.subCategory.length) {
          for (let i = 0; i < this.orderService.getOrderData().selectedCategory.subCategory.length; i++) {
            if (this.selectedSubcategory[i]) {
              this.AddDataArticle.subCategory = this.orderService.getOrderData().selectedCategory.subCategory[i];
            }
          }
        }
        else {
          this.AddDataArticle.subCategory = '';
        }
      }
      let opts = {
        name: this.AddDataArticle.name,
        price: Number(this.AddDataArticle.price),
        category: this.AddDataArticle.category,
        subCategory: this.AddDataArticle.subCategory,
        // quantity: this.AddDataArticle.quantity,
        // variant: this.AddDataArticle.variant,
        // notes: this.AddDataArticle.notes,
        isDeleted: this.AddDataArticle.isDeleted
        // allergens: this.selectedIconImage ? JSON.stringify(this.selectedIconImage) : '',
      }
      this.loader = true;
      this.orderService.addArticle(opts)
        .then(data => {
          let itemTemp = _.cloneDeep(data.data);
          itemTemp.step = currentStep;
          itemTemp.quantity = this.AddDataArticle.quantity;
          itemTemp.variant = this.AddDataArticle.variant;
          itemTemp.ordernote = this.AddDataArticle.notes;
          // itemTemp.quantity = 0;
          // itemTemp.itemTotal = itemTemp.quantity;
          let itemData = _.cloneDeep(itemTemp);
          this.loader = false;
          // var steps = [];
          // if (this.globalService.getStepData()) {
          //   steps = this.globalService.getStepData();
          // }
          // else {
          //   steps = ['Uscita 1', 'Uscita 2'];
          // }
          // for (let j = 0; j < steps.length; j++) {
          // orderdata.categoryItems[steps[j]][orderdata.categoryItems[steps[j]].length] = itemData;
          // }
          orderdata.selectedItems[currentStep].push(itemData);
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
            for (let i = 0; i < orderdata.selectedItems[steps[a]].length; i++) {
              itemno += orderdata.selectedItems[steps[a]][i].quantity;
              if (orderdata.selectedItems[steps[a]][i].variant) {
                for (let j = 0; j < orderdata.selectedItems[steps[a]][i].variant.length; j++) {
                  if (orderdata.selectedItems[steps[a]][i].variant[j].status == 1) {
                    varicost += orderdata.selectedItems[steps[a]][i].variant[j].price;
                  }
                }
              }
              cp += (orderdata.selectedItems[steps[a]][i].price + varicost) * orderdata.selectedItems[steps[a]][i].quantity;
              orderdata.cartTotalPrice = cp;
              orderdata.cartTotalItem = itemno;
            }
          }
          this.orderService.setOrderData(orderdata);  
          this.hideArticle();
        })
        .catch(error => {
        });
    }
  }

  inputChanged(){
    if((Number(this.AddDataArticle.price) % 1) != 0)
    {
      this.AddDataArticle.price =  parseFloat(this.AddDataArticle.price).toFixed(2);
    }
  }

  selectedIcon(icon) {
    if (this.selectedIconImage.indexOf(icon.image) === -1) {
      this.selectedIconImage.push(icon.image);
    }
    this.showAllergenIcon = false;
};

  removeAllergens(indx, item) {
  if (this.selectedIconImage.indexOf(item) > -1) {
      this.selectedIconImage.splice(indx, 1);
  }
};

decreaseArticleQty() {
  let value = this.AddDataArticle.quantity;
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  this.AddDataArticle.quantity = value;
}

increaseArticleQty() {
  let value = this.AddDataArticle.quantity;
  value = isNaN(value) ? 0 : value;
  value++;
  this.AddDataArticle.quantity = value;
}
addRemoveArticleVariant(variant, status) {
  if (status == 0) {
    variant.status = 0;
  }
  else {
    variant.status = 1;
  }
  for (let i = 0; i < this.AddDataArticle.variant.length; i++) {
    if (this.AddDataArticle.variant[i]._id == variant._id) {
      this.AddDataArticle.variant.splice(i, 1);
    }
  }
  this.AddDataArticle.variant.push(variant);
}
addArticleNote(event, note, i) {
  if (event.target.checked) {
    this.articleNotes.push(note);
  }
  else {
    for (let i = 0; i < this.articleNotes.length; i++) {
      if (this.articleNotes[i] == note) {
        this.articleNotes.splice(i, 1);
      }
    }
  }
  this.AddDataArticle.notes = this.articleNotes.toString();
}
}
