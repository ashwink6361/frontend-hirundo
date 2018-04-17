import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserChangePassowrdComponent } from './user-change-passowrd/user-change-passowrd.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserChangePasswordService } from './user-change-passowrd/user-change-password.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { AppService} from '../service/app.service';
import { DepartmentProfileService } from '../hirundo/department/department-profile/department-profile.service';

const NGA_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  HeaderLoginComponent,
  SidebarComponent,
  UserChangePassowrdComponent,
  FilterPipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...NGA_COMPONENTS ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    ...NGA_COMPONENTS
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        UserChangePasswordService,
        AppService,
        DepartmentProfileService
      ],
    };
  }
}
