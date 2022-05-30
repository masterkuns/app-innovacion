import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsPage } from './contracts.page';

const routes: Routes = [
  {
    path: '',
    component: ContractsPage
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/contracts-form/contracts-form.module').then( m => m.ContractsFormPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/contracts-list/contracts-list.module').then( m => m.ContractsListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsPageRoutingModule {}
