import { Component, OnInit } from '@angular/core';
import { AppService} from '../../service/app.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {

  constructor(private appservice : AppService) { }

  ngOnInit() {
  }
  sidebar(){
    this.appservice.sidebarToggle = !this.appservice.sidebarToggle;
  }

}
