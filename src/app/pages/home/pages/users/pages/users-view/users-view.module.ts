import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersViewPageRoutingModule } from './users-view-routing.module';

import { UsersViewPage } from './users-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersViewPageRoutingModule
  ],
  declarations: [UsersViewPage]
})
export class UsersViewPageModule {}
