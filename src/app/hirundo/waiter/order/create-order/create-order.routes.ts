import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order.component';

const routes: Routes = [
    { path: '', component: CreateOrderComponent }
];


export const CreateOrderRouting: ModuleWithProviders = RouterModule.forChild(routes); 
