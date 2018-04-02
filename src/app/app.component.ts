import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './shared/guard/auth.guard';
@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isLoggedIn: boolean;
    public currentUser: any;
    constructor(private translate: TranslateService, private authGuard: AuthGuard) {
        translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('it');
        const browserLang = translate.getBrowserLang();
        this.isLoggedIn = this.authGuard.isLoggedIn();
        this.currentUser = this.authGuard.getCurrentUser();
        //translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'it');
        translate.use('it');
        
    }
}
