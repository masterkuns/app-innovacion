import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractsListPageRoutingModule } from './contracts-list-routing.module';

import { ContractsListPage } from './contracts-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractsListPageRoutingModule
  ],
  declarations: [ContractsListPage]
})
export class ContractsListPageModule {}
