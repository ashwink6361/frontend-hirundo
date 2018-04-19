import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
    { path: '', component: ListComponent }
];


export const ListRouting: ModuleWithProviders = RouterModule.forChild(routes); 
