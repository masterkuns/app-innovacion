import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContractService } from '../../../../../../services';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.page.html',
  styleUrls: ['./contracts-list.page.scss'],
})
export class ContractsListPage implements OnInit {
  private _contractsList: any = [];
  searchContract: any;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private _contractServices: ContractService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  async getAll(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    await this._contractServices.getAll().then(firebaseResponse => {
      firebaseResponse.subscribe(contractsListRef => {
        /*
        contractsListRef.forEach(contractRef => {
          console.log(contractRef.payload.doc.data());
        });
        */
        this._contractsList = contractsListRef.map(contractRef => {
          let contract = contractRef.payload.doc.data();
          contract['id'] = contractRef.payload.doc.id;
          return contract;
        });
        //console.log(this._contractsList);
        this.searchContract = this._contractsList;
      });
    });  
    await loading.dismiss();
  }

  filter(event): void{
   const keyword = event.target.value;
   this.searchContract = this._contractsList;
   if(keyword && keyword.trim() != ''){
     this.searchContract = this.searchContract.filter((contract: any) => {
       return (contract.id_contract.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
     });
   }
  }
}
