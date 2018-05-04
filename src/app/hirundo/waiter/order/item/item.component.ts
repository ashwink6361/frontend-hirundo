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
  // private step1 = [];
  // private step2 = [];
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
  public variantData = {
    quantity: 0,
    variant: [],
    notes: ''
  }
  public notes = [];
  public variantError = '';
  public articleData: any;
  constructor(private orderService: OrderService, private completerService: CompleterService, private globalService: GlobalService, public router: Router) { }

  ngOnInit() {
    this.data = this.orderService.getOrderData();
    console.log('this.data', this.data);
    if (this.data.categoryItems) {
      // for (let i = 0; i < this.data.step1.length; i++) {
      //   this.data.step1[i].itemTotal = 0;
      //   if (this.data.selectedItems.length) {
      //     for (let j = 0; j < this.data.selectedItems.length; j++) {
      //       if (this.data.selectedItems[j]._id == this.data.step1[i]._id) {
      //         this.data.step1[i].quantity = this.data.selectedItems[j].quantity;
      //         this.data.step1[i].itemTotal = this.data.step1[i].itemTotal + this.data.selectedItems[j].quantity;
      //       }
      //     }
      //   }
      // }
      // for (let i = 0; i < this.data.step2.length; i++) {
      //   this.data.step2[i].itemTotal = 0;
      //   if (this.data.selectedItems.length) {
      //     for (let j = 0; j < this.data.selectedItems.length; j++) {
      //       if (this.data.selectedItems[j]._id == this.data.step2[i]._id) {
      //         this.data.step2[i].quantity = this.data.selectedItems[j].quantity;
      //         this.data.step2[i].itemTotal = this.data.step2[i].itemTotal + this.data.selectedItems[j].quantity;
      //       }
      //     }
      //   }
      // }
      for (let i = 0; i < this.data.categoryItems.length; i++) {
        this.data.categoryItems[i].itemTotal = 0;
        if (this.data.selectedItems.length) {
          for (let j = 0; j < this.data.selectedItems.length; j++) {
            if (this.data.selectedItems[j]._id == this.data.categoryItems[i]._id) {
              this.data.categoryItems[i].quantity = this.data.selectedItems[j].quantity;
              this.data.categoryItems[i].itemTotal = this.data.categoryItems[i].itemTotal + this.data.selectedItems[j].quantity;
            }
          }
        }
      }
      this.orderService.setOrderData(this.data);
      this.articles = this.orderService.getOrderData().categoryItems;
      // this.step1 = this.orderService.getOrderData().step1;
      // this.step2 = this.orderService.getOrderData().step2;
      this.selectedSubcategory[-1] = true;
    }
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
    article.step = this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    if (data.selectedItems.length) {
      let isExist = true;
      let isarr = [];
      for (let i = 0; i < data.selectedItems.length; i++) {
        if (data.selectedItems[i]._id == article._id) {
          if (!data.selectedItems[i].variant) {
            data.selectedItems[i].quantity += 1;
            isarr.push(data.selectedItems[i]._id);
            // if(article.step == 'Uscita 1'){
            //   for (let j = 0; j < data.step1.length; j++) {
            //     if (data.step1[j]._id == data.selectedItems[i]._id) {
            //       data.step1[j].itemTotal = data.selectedItems[i].quantity;
            //     }
            //   }
            // }
            // else if(article.step == 'Uscita 2'){
            //   for (let j = 0; j < data.step2.length; j++) {
            //     if (data.step2[j]._id == data.selectedItems[i]._id) {
            //       data.step2[j].itemTotal = data.selectedItems[i].quantity;
            //     }
            //   }
            // }
            for (let j = 0; j < data.categoryItems.length; j++) {
              if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                data.categoryItems[j].itemTotal = data.selectedItems[i].quantity;
              }
            }
          }
          else {
            for (let j = 0; j < data.categoryItems.length; j++) {
              if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
                data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal + data.selectedItems[i].quantity;
              }
            }
            // if(article.step == 'Uscita 1'){
            //   for (let j = 0; j < data.step1.length; j++) {
            //     if (data.step1[j]._id == data.selectedItems[i]._id) {
            //       data.step1[j].itemTotal = data.step1[j].itemTotal + data.selectedItems[i].quantity;
            //     }
            //   }
            // }
            // else if(article.step == 'Uscita 2'){
            //   for (let j = 0; j < data.step2.length; j++) {
            //     if (data.step2[j]._id == data.selectedItems[i]._id) {
            //       data.step2[j].itemTotal = data.step2[j].itemTotal + data.selectedItems[i].quantity;
            //     }
            //   }
            // }
          }
        }
        if (data.selectedItems[i]._id != article._id) {
          isExist = false;
        }
      }
      if (!isExist && isarr.indexOf(article._id) < 0) {
        article.quantity = article.quantity + 1;
        for (let j = 0; j < data.categoryItems.length; j++) {
          if (data.categoryItems[j]._id == article._id) {
            data.categoryItems[j].itemTotal = article.quantity;
          }
        }
        // if(article.step == 'Uscita 1'){
        //   for (let j = 0; j < data.step1.length; j++) {
        //     if (data.step1[j]._id == article._id) {
        //       data.step1[j].itemTotal = article.quantity;
        //     }
        //   }
        // }
        // else if(article.step == 'Uscita 2'){
        //   for (let j = 0; j < data.step2.length; j++) {
        //     if (data.step2[j]._id == article._id) {
        //       data.step2[j].itemTotal = article.quantity;
        //     }
        //   }
        // }
        data.selectedItems.push(article);
      }
    }
    else {
      article.quantity = article.quantity + 1;
      for (let j = 0; j < data.categoryItems.length; j++) {
        if (data.categoryItems[j]._id == article._id) {
          data.categoryItems[j].itemTotal = article.quantity;
        }
      }
      // if(article.step == 'Uscita 1'){
      //   for (let j = 0; j < data.step1.length; j++) {
      //     if (data.step1[j]._id == article._id) {
      //       data.step1[j].itemTotal = article.quantity;
      //     }
      //   }
      // }
      // else if(article.step == 'Uscita 2'){
      //   for (let j = 0; j < data.step2.length; j++) {
      //     if (data.step2[j]._id == article._id) {
      //       data.step2[j].itemTotal = article.quantity;
      //     }
      //   }
      // }
      data.selectedItems.push(article);
    }
    let cp = 0;
    let itemno = 0;
    let varicost = 0;
    for (let i = 0; i < data.selectedItems.length; i++) {
      itemno += data.selectedItems[i].quantity;
      if (data.selectedItems[i].variant) {
        for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
          if (data.selectedItems[i].variant[j].status == 1) {
            varicost += data.selectedItems[i].variant[j].price;
          }
        }
      }
      cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
      data.cartTotalPrice = cp;
      data.cartTotalItem = itemno;
    }
    this.orderService.setOrderData(data);
    console.log('inc this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
    this.articles = this.orderService.getOrderData().categoryItems;
    // this.step1 = this.orderService.getOrderData().step1;
    // this.step2 = this.orderService.getOrderData().step2;
  }

  decreaseValue(article) {
    console.log('article dec', article);
    article.step = this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    for (let i = 0; i < data.selectedItems.length; i++) {
      if (data.selectedItems[i]._id == article._id && !data.selectedItems[i].variant) {
        if (data.selectedItems[i].quantity > 1) {
          data.selectedItems[i].quantity = data.selectedItems[i].quantity - 1;
          for (let j = 0; j < data.categoryItems.length; j++) {
            if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
              data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
            }
          }
          // if(article.step == 'Uscita 1'){
          //   for (let j = 0; j < data.step1.length; j++) {
          //     if (data.step1[j]._id == data.selectedItems[i]._id) {
          //       data.step1[j].itemTotal = data.step1[j].itemTotal - 1;
          //     }
          //   }
          // }
          // else if(article.step == 'Uscita 2'){
          //   for (let j = 0; j < data.step2.length; j++) {
          //     if (data.step2[j]._id == data.selectedItems[i]._id) {
          //       data.step2[j].itemTotal = data.step2[j].itemTotal - 1;
          //     }
          //   }
          // }
        }
        else {
          article.quantity = 0;
          for (let j = 0; j < data.categoryItems.length; j++) {
            if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
              data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
            }
          }
          // if(article.step == 'Uscita 1'){
          //   for (let j = 0; j < data.step1.length; j++) {
          //     if (data.step1[j]._id == data.selectedItems[i]._id) {
          //       data.step1[j].itemTotal = data.step1[j].itemTotal - 1;
          //     }
          //   }
          // }
          // else if(article.step == 'Uscita 2'){
          //   for (let j = 0; j < data.step2.length; j++) {
          //     if (data.step2[j]._id == data.selectedItems[i]._id) {
          //       data.step2[j].itemTotal = data.step2[j].itemTotal - 1;
          //     }
          //   }
          // }
          data.selectedItems.splice(i, 1);
        }
      }
    }
    let cp = 0;
    let itemno = 0;
    let varicost = 0;
    if (data.selectedItems.length) {
      for (let i = 0; i < data.selectedItems.length; i++) {
        itemno += data.selectedItems[i].quantity;
        if (data.selectedItems[i].variant) {
          for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
            if (data.selectedItems[i].variant[j].status == 1) {
              varicost += data.selectedItems[i].variant[j].price;
            }
          }
        }
        cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
        data.cartTotalPrice = cp;
        data.cartTotalItem = itemno;
      }
    }
    else {
      data.cartTotalPrice = 0;
      data.cartTotalItem = 0;
    }
    this.orderService.setOrderData(data);
    console.log('dec this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
    this.articles = this.orderService.getOrderData().categoryItems;
    // this.step1 = this.orderService.getOrderData().step1;
    // this.step2 = this.orderService.getOrderData().step2;
  }

  viewCart() {
    this.router.navigate(['/waiter/order/:id/cart']);
  }

  viewVarient(article) {
    this.orderService.getVariantAndNotes()
    .then(data => {
      this.variantList = data.data.variants;
      this.noteList = data.data.notes;
    })
    .catch(error => {
      console.log('error', error);
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
    this.articleAdd = true;
  }

  hideArticle() {
    this.articleAdd = false;
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
    console.log('this.variantData', this.variantData);
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
      this.articleData.step = this.globalService.getTabData().step;
      let data = this.orderService.getOrderData();
      data.selectedItems.push(this.articleData);
      for (let i = 0; i < data.categoryItems.length; i++) {
        if (data.categoryItems[i]._id == this.articleData._id) {
          data.categoryItems[i].itemTotal = data.categoryItems[i].itemTotal + this.articleData.quantity;
        }
      }
      // if(this.articleData.step == 'Uscita 1'){
      //   for (let i = 0; i < data.step1.length; i++) {
      //     if (data.step1[i]._id == this.articleData._id) {
      //       data.step1[i].itemTotal = data.step1[i].itemTotal + this.articleData.quantity;
      //     }
      //   }
      // }
      // else if(this.articleData.step == 'Uscita 2'){
      //   for (let i = 0; i < data.step2.length; i++) {
      //     if (data.step2[i]._id == this.articleData._id) {
      //       data.step2[i].itemTotal = data.step2[i].itemTotal + this.articleData.quantity;
      //     }
      //   }
      // }
      let cp = 0;
      let itemno = 0;
      let varicost = 0;
      for (let i = 0; i < data.selectedItems.length; i++) {
        itemno += data.selectedItems[i].quantity;
        if (data.selectedItems[i].variant) {
          for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
            if (data.selectedItems[i].variant[j].status == 1) {
              varicost += data.selectedItems[i].variant[j].price;
            }
          }
        }
        cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
        data.cartTotalPrice = cp;
        data.cartTotalItem = itemno;
      }
      this.orderService.setOrderData(data);
      this.hideVarient();
      console.log('variant this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
      this.articles = this.orderService.getOrderData().categoryItems;
      // this.step1 = this.orderService.getOrderData().step1;
      // this.step2 = this.orderService.getOrderData().step2;
    }
  }
}
