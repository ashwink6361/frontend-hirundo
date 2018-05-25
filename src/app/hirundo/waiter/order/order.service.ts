import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class OrderService {
  public orderData = {};
  public showElement = false;
  public categoryItems = [];
  constructor(private http: Http, private globalService: GlobalService) { }
  getCategory(): Promise<any> {
    let url = '/api/categories';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
  getCategoryItem(): Promise<any> {
    let url = '/api/categories/items';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
  
  setElement(data: any) {
    localStorage.setItem('showElement', JSON.stringify(data));
  }

  getElement() {
    let data = localStorage.getItem('showElement');
    return JSON.parse(data);
  }
  setOrderData(data: any) {
    localStorage.setItem('orderData', JSON.stringify(data));
  }

  getOrderData() {
    let data = localStorage.getItem('orderData');
    return JSON.parse(data);
  }
  getVariantAndNotes(): Promise<any> {
    let url = '/api/variantAndNotes';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
  createOrder(data): Promise<any> {
    let url = '/api/waiter/order';
    return this.http.post(url, data).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
  updateOrder(item,orderId): Promise<any> {
    let url = '/api/waiter/order';
    let opts = {
      item: item,
      orderId: orderId
    }
    return this.http.put(url, opts).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
}
