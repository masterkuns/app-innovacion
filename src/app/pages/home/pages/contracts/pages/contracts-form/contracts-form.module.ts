import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractsFormPageRoutingModule } from './contracts-form-routing.module';

import { ContractsFormPage } from './contracts-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractsFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ContractsFormPage]
})
export class ContractsFormPageModule {}
