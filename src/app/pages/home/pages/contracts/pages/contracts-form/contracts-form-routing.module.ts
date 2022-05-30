import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsFormPage } from './contracts-form.page';

const routes: Routes = [
  {
    path: '',
    component: ContractsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsFormPageRoutingModule {}
