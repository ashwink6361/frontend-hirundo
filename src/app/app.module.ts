import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { SharedModule } from './shared/shared.module';
import { Approuting } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HirundoModule } from './hirundo/hirundo.module';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        Approuting,
        FormsModule,
        HirundoModule,
        RouterModule,
        HttpModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        SharedModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})

export class AppModule {
}
