import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class OrderService {
  public orderData = {};
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

  setOrderData(data: any) {
    localStorage.setItem('orderData', JSON.stringify(data));
  }

  getOrderData() {
    let data = localStorage.getItem('orderData');
    return JSON.parse(data);
  }
  getVariants(): Promise<any> {
    let url = '/api/variant';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
  getNotes(): Promise<any> {
    let url = '/api/note';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }
}
