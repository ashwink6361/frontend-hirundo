import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', redirectTo: 'thankyooh', pathMatch: 'full' },
    { path: '**', redirectTo: 'thankyooh' },
];

export const Approuting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
