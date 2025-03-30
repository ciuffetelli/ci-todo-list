import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent)
  }
];
