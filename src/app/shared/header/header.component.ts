import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLan: string = 'it';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  changeLang(language: string) {
    this.currentLan = language;
    this.translate.use(language);
  }
}
