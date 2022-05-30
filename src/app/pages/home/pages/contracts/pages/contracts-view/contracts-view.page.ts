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

  ngOnInit() {
    this.id = this._ar.snapshot.paramMap.get("id");
    this.getById();
  }

  async getById(): Promise<void> {
    const loading = await this._loadingController.create();
    await loading.present();

    await this._contractServices.getById(this.id).then(firebaseResponse => {
      firebaseResponse.subscribe(contractRef => {
        this.contract = contractRef.data();
        this.contract['id'] = contractRef.id;
        console.log(this.contract);
      });
    });
    await loading.dismiss();
    console.log(this.contract.name);
  }
}
