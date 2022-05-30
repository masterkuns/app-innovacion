import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsViewPage } from './contracts-view.page';

const routes: Routes = [
  {
    path: '',
    component: ContractsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsViewPageRoutingModule {}
