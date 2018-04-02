import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class DashboardService {

  constructor(private http: Http, private globalService: GlobalService) { }
  getRooms(): Promise<any> {
    let url = '/api/rooms';
    return this.http.get(url).toPromise()
      .then(this.globalService.extractData)
      .catch(this.globalService.handleErrorPromise);
  }

}
