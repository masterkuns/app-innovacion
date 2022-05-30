import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ContractService } from '../../../../../../services';

@Component({
  selector: 'app-contracts-view',
  templateUrl: './contracts-view.page.html',
  styleUrls: ['./contracts-view.page.scss'],
})
export class ContractsViewPage implements OnInit {
  id: string;
  contract: any;
  constructor(
    private _ar: ActivatedRoute,
    private _loadingController: LoadingController,
    private _alertController: AlertController,
    private _contractServices: ContractService,
    ) { }
    //traer los contracts por id de firebase

  ngOnInit() {
    this.id = this._ar.snapshot.paramMap.get('id');
    this.getContractById(this.id);
  }

  async getContractById(id) {
    const loading = await this._loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    (await this._contractServices.getById(id)).subscribe(
      (data) => {
        this.contract = data.data();
        loading.dismiss();
        
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }
}
