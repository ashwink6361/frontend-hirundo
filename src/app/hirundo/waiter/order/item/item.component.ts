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
            for (let j = 0; j < this.data.selectedItems[steps[k]].length; j++) {
              if (this.data.selectedItems[steps[k]][j]._id == this.data.categoryItems[steps[k]][i]._id ) {
                this.data.categoryItems[steps[k]][i].itemTotal = this.data.selectedItems[steps[k]][j].quantity;
              }
            }
          }
        }
      }
      // for (let i = 0; i < this.data.categoryItems.length; i++) {
      //   this.data.categoryItems[i].itemTotal = 0;
      //   if (this.data.selectedItems.length) {
      //     for (let j = 0; j < this.data.selectedItems.length; j++) {
      //       if (this.data.selectedItems[j]._id == this.data.categoryItems[i]._id) {
      //         this.data.categoryItems[i].quantity = this.data.selectedItems[j].quantity;
      //         this.data.categoryItems[i].itemTotal = this.data.categoryItems[i].itemTotal + this.data.selectedItems[j].quantity;
      //       }
      //     }
      //   }
      // }
    console.log('this.data++++++++++++++++++++++++++++++++++++++++++++', this.data);      
      this.orderService.setOrderData(this.data);
      this.articles = this.orderService.getOrderData().categoryItems;
      this.selectedSubcategory[-1] = true;
    }
  }

  // increaseValue(article) {
  //   article.step = this.globalService.getTabData().step;
  //   let data = this.orderService.getOrderData();
  //   if (data.selectedItems.length) {
  //     let isExist = true;
  //     let isarr = [];
  //     for (let i = 0; i < data.selectedItems.length; i++) {
  //       if (data.selectedItems[i]._id == article._id) {
  //         if (!data.selectedItems[i].variant) {
  //           data.selectedItems[i].quantity += 1;
  //           isarr.push(data.selectedItems[i]._id);
  //           for (let j = 0; j < data.categoryItems.length; j++) {
  //             if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
  //               data.categoryItems[j].itemTotal = data.selectedItems[i].quantity;
  //             }
  //           }
  //         }
  //         else {
  //           for (let j = 0; j < data.categoryItems.length; j++) {
  //             if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
  //               data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal + data.selectedItems[i].quantity;
  //             }
  //           }
  //         }
  //       }
  //       if (data.selectedItems[i]._id != article._id) {
  //         isExist = false;
  //       }
  //     }
  //     if (!isExist && isarr.indexOf(article._id) < 0) {
  //       article.quantity = article.quantity + 1;
  //       for (let j = 0; j < data.categoryItems.length; j++) {
  //         if (data.categoryItems[j]._id == article._id) {
  //           data.categoryItems[j].itemTotal = article.quantity;
  //         }
  //       }
  //       data.selectedItems.push(article);
  //     }
  //   }
  //   else {
  //     article.quantity = article.quantity + 1;
  //     for (let j = 0; j < data.categoryItems.length; j++) {
  //       if (data.categoryItems[j]._id == article._id) {
  //         data.categoryItems[j].itemTotal = article.quantity;
  //       }
  //     }
  //     data.selectedItems.push(article);
  //   }
  //   let cp = 0;
  //   let itemno = 0;
  //   let varicost = 0;
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     itemno += data.selectedItems[i].quantity;
  //     if (data.selectedItems[i].variant) {
  //       for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
  //         if (data.selectedItems[i].variant[j].status == 1) {
  //           varicost += data.selectedItems[i].variant[j].price;
  //         }
  //       }
  //     }
  //     cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
  //     data.cartTotalPrice = cp;
  //     data.cartTotalItem = itemno;
  //   }
  //   this.orderService.setOrderData(data);
  //   console.log('inc this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
  //   this.articles = this.orderService.getOrderData().categoryItems;
  // }

  // decreaseValue(article) {
  //   console.log('article dec', article);
  //   article.step = this.globalService.getTabData().step;
  //   let data = this.orderService.getOrderData();
  //   for (let i = 0; i < data.selectedItems.length; i++) {
  //     if (data.selectedItems[i]._id == article._id && !data.selectedItems[i].variant) {
  //       if (data.selectedItems[i].quantity > 1) {
  //         data.selectedItems[i].quantity = data.selectedItems[i].quantity - 1;
  //         for (let j = 0; j < data.categoryItems.length; j++) {
  //           if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
  //             data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
  //           }
  //         }
  //       }
  //       else {
  //         article.quantity = 0;
  //         for (let j = 0; j < data.categoryItems.length; j++) {
  //           if (data.categoryItems[j]._id == data.selectedItems[i]._id) {
  //             data.categoryItems[j].itemTotal = data.categoryItems[j].itemTotal - 1;
  //           }
  //         }
  //         data.selectedItems.splice(i, 1);
  //       }
  //     }
  //   }
  //   let cp = 0;
  //   let itemno = 0;
  //   let varicost = 0;
  //   if (data.selectedItems.length) {
  //     for (let i = 0; i < data.selectedItems.length; i++) {
  //       itemno += data.selectedItems[i].quantity;
  //       if (data.selectedItems[i].variant) {
  //         for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
  //           if (data.selectedItems[i].variant[j].status == 1) {
  //             varicost += data.selectedItems[i].variant[j].price;
  //           }
  //         }
  //       }
  //       cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
  //       data.cartTotalPrice = cp;
  //       data.cartTotalItem = itemno;
  //     }
  //   }
  //   else {
  //     data.cartTotalPrice = 0;
  //     data.cartTotalItem = 0;
  //   }
  //   this.orderService.setOrderData(data);
  //   console.log('dec this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
  //   this.articles = this.orderService.getOrderData().categoryItems;
  // }

//new code
  increaseValue(article) {
    article.step = this.globalService.getTabData().step;
    let currentStep =  this.globalService.getTabData().step;
    let data = this.orderService.getOrderData();
    if (data.selectedItems[currentStep].length) {
      let isExist = true;
      let isarr = [];
      for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
        if (data.selectedItems[currentStep][i]._id == article._id) {
          if(data.selectedItems[currentStep][i].step == article.step){
            if (!data.selectedItems[currentStep][i].variant) {
              data.selectedItems[currentStep][i].quantity += 1;
              isarr.push(data.selectedItems[currentStep][i]._id);
              for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
                if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
                  data.categoryItems[currentStep][j].itemTotal = data.selectedItems[currentStep][i].quantity;
                }
              }
            }
            if (data.selectedItems[currentStep][i].variant) {
              console.log('data.selectedItems[currentStep][i].quantity',data.selectedItems[currentStep][i].quantity);
              for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
                if (data.categoryItems[currentStep][j]._id == data.selectedItems[currentStep][i]._id) {
              console.log('data.categoryItems[currentStep][j].itemTotal',data.categoryItems[currentStep][j].itemTotal);
                  data.categoryItems[currentStep][j].itemTotal = data.categoryItems[currentStep][j].itemTotal + data.selectedItems[currentStep][i].quantity;
                }
              }
            }
          }
          if(data.selectedItems[currentStep][i].step != article.step){
            isExist = false;
          }
          // if (!data.selectedItems[i].variant) {
          //   data.selectedItems[i].quantity += 1;
          //   isarr.push(data.selectedItems[i]._id);
          //   for (let j = 0; j < data.categoryItems[this.globalService.getTabData().step].length; j++) {
          //     if (data.categoryItems[this.globalService.getTabData().step][j]._id == data.selectedItems[i]._id) {
          //       data.categoryItems[this.globalService.getTabData().step][j].itemTotal = data.selectedItems[i].quantity;
          //     }
          //   }
          // }
          // else {
          //   for (let j = 0; j < data.categoryItems[this.globalService.getTabData().step].length; j++) {
          //     if (data.categoryItems[this.globalService.getTabData().step][j]._id == data.selectedItems[i]._id) {
          //       data.categoryItems[this.globalService.getTabData().step][j].itemTotal = data.categoryItems[this.globalService.getTabData().step][j].itemTotal + data.selectedItems[i].quantity;
          //     }
          //   }
          // }
        }
        if (data.selectedItems[currentStep][i]._id != article._id) {
          isExist = false;
        }
      }
      if (!isExist && isarr.indexOf(article._id) < 0) {
        article.quantity = article.quantity + 1;
        for (let j = 0; j < data.categoryItems[currentStep].length; j++) {
          if (data.categoryItems[currentStep][j]._id == article._id) {
            data.categoryItems[currentStep][j].itemTotal = article.quantity;
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
    for(let a=0;a<steps.length;a++){
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
    // for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
    //   itemno += data.selectedItems[currentStep][i].quantity;
    //   if (data.selectedItems[currentStep][i].variant) {
    //     for (let j = 0; j < data.selectedItems[currentStep][i].variant.length; j++) {
    //       if (data.selectedItems[currentStep][i].variant[j].status == 1) {
    //         varicost += data.selectedItems[currentStep][i].variant[j].price;
    //       }
    //     }
    //   }
    //   cp += (data.selectedItems[currentStep][i].price + varicost) * data.selectedItems[currentStep][i].quantity;
    //   data.cartTotalPrice = cp;
    //   data.cartTotalItem = itemno;
    // }
    this.orderService.setOrderData(data);
    console.log('inc this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
    this.articles = this.orderService.getOrderData().categoryItems;
  }

  decreaseValue(article) {
    console.log('article dec', article);
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
    for(let a=0;a<steps.length;a++){     
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
        if(emptyArray.indexOf(steps[a])<0){
          emptyArray.push(steps[a]);
        }
      }
      if(emptyArray.length == steps.length){
        data.cartTotalPrice = 0;
        data.cartTotalItem = 0;
      }
    }
    // if (data.selectedItems[currentStep].length) {
    //   for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
    //     itemno += data.selectedItems[currentStep][i].quantity;
    //     if (data.selectedItems[currentStep][i].variant) {
    //       for (let j = 0; j < data.selectedItems[currentStep][i].variant.length; j++) {
    //         if (data.selectedItems[currentStep][i].variant[j].status == 1) {
    //           varicost += data.selectedItems[currentStep][i].variant[j].price;
    //         }
    //       }
    //     }
    //     cp += (data.selectedItems[currentStep][i].price + varicost) * data.selectedItems[currentStep][i].quantity;
    //     data.cartTotalPrice = cp;
    //     data.cartTotalItem = itemno;
    //   }
    // }
    // else {
    //   data.cartTotalPrice = 0;
    //   data.cartTotalItem = 0;
    // }
    this.orderService.setOrderData(data);
    console.log('dec this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
    this.articles = this.orderService.getOrderData().categoryItems;
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

  // saveVariantData() {
  //   if (this.variantData.quantity == 0) {
  //     this.variantError = 'Please enter quantity';
  //     setTimeout(() => {
  //       this.variantError = '';
  //     }, 4000);
  //   }
  //   else if (this.variantData.quantity > 0 && !this.variantData.variant.length && !this.variantData.notes) {
  //     this.variantError = 'Please select variants/notes';
  //     setTimeout(() => {
  //       this.variantError = '';
  //     }, 4000);
  //   }
  //   else {
  //     this.articleData.quantity = this.variantData.quantity;
  //     this.articleData.variant = this.variantData.variant;
  //     this.articleData.ordernote = this.variantData.notes;
  //     this.articleData.step = this.globalService.getTabData().step;
  //     let data = this.orderService.getOrderData();
  //     data.selectedItems.push(this.articleData);
  //     for (let i = 0; i < data.categoryItems.length; i++) {
  //       if (data.categoryItems[i]._id == this.articleData._id) {
  //         data.categoryItems[i].itemTotal = data.categoryItems[i].itemTotal + this.articleData.quantity;
  //       }
  //     }
  //     let cp = 0;
  //     let itemno = 0;
  //     let varicost = 0;
  //     for (let i = 0; i < data.selectedItems.length; i++) {
  //       itemno += data.selectedItems[i].quantity;
  //       if (data.selectedItems[i].variant) {
  //         for (let j = 0; j < data.selectedItems[i].variant.length; j++) {
  //           if (data.selectedItems[i].variant[j].status == 1) {
  //             varicost += data.selectedItems[i].variant[j].price;
  //           }
  //         }
  //       }
  //       cp += (data.selectedItems[i].price + varicost) * data.selectedItems[i].quantity;
  //       data.cartTotalPrice = cp;
  //       data.cartTotalItem = itemno;
  //     }
  //     this.orderService.setOrderData(data);
  //     this.hideVarient();
  //     console.log('variant this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
  //     this.articles = this.orderService.getOrderData().categoryItems;
  //   }
  // }

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
      for(let a=0;a<steps.length;a++){
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
      // for (let i = 0; i < data.selectedItems[currentStep].length; i++) {
      //   itemno += data.selectedItems[currentStep][i].quantity;
      //   if (data.selectedItems[currentStep][i].variant) {
      //     for (let j = 0; j < data.selectedItems[currentStep][i].variant.length; j++) {
      //       if (data.selectedItems[currentStep][i].variant[j].status == 1) {
      //         varicost += data.selectedItems[currentStep][i].variant[j].price;
      //       }
      //     }
      //   }
      //   cp += (data.selectedItems[currentStep][i].price + varicost) * data.selectedItems[currentStep][i].quantity;
      //   data.cartTotalPrice = cp;
      //   data.cartTotalItem = itemno;
      // }
      this.orderService.setOrderData(data);
      this.hideVarient();
      console.log('variant this.orderService.setOrderData(this.data);.', this.orderService.getOrderData());
      this.articles = this.orderService.getOrderData().categoryItems;
    }
  }
}
