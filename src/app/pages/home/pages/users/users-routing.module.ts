import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/users-form/users-form.module').then( m => m.UsersFormPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/users-list/users-list.module').then( m => m.UsersListPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/users-view/users-view.module').then( m => m.UsersViewPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/users-form/users-form.module').then(m => m.UsersFormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
