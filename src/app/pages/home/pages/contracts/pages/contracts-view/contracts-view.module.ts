import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractsViewPageRoutingModule } from './contracts-view-routing.module';

import { ContractsViewPage } from './contracts-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractsViewPageRoutingModule
  ],
  declarations: [ContractsViewPage]
})
export class ContractsViewPageModule {}
