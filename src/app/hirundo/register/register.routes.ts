import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    { path: '', component: RegisterComponent }
];


export const RegisterRouting: ModuleWithProviders = RouterModule.forChild(routes); 
