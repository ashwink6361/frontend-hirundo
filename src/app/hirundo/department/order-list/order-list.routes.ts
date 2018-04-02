import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list.component';

const routes: Routes = [
    { path: '', component: OrderListComponent }
];


export const OrderListRouting: ModuleWithProviders = RouterModule.forChild(routes); 
