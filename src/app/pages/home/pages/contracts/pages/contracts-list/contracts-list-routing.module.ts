import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsListPage } from './contracts-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContractsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsListPageRoutingModule {}
