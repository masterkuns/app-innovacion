import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersViewPage } from './users-view.page';

const routes: Routes = [
  {
    path: '',
    component: UsersViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersViewPageRoutingModule {}
