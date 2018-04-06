import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseCategoryComponent } from './choose-category.component';

const routes: Routes = [
    { path: '', component: ChooseCategoryComponent }
];


export const ChooseCategoryRouting: ModuleWithProviders = RouterModule.forChild(routes); 
