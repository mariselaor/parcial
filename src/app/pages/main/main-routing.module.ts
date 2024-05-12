<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'estados',
        loadChildren: () => import('./estados/estados.module').then( m => m.EstadosPageModule)
      },
      {
        path: 'constancias',
        loadChildren: () => import('./constancias/constancias.module').then( m => m.ConstanciasPageModule)
      }
    ]
  },
  {
    path: 'constancias',
    loadChildren: () => import('./constancias/constancias.module').then( m => m.ConstanciasPageModule)
  },
  {
    path: 'estados',
    loadChildren: () => import('./estados/estados.module').then( m => m.EstadosPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
=======
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
