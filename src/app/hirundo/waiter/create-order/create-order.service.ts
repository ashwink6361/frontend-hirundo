import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class CreateOrderService {

  constructor(private http: Http, private globalService: GlobalService) { }

  getCategory(): Promise<any> {
    let url = '/api/categories';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }

  
}
