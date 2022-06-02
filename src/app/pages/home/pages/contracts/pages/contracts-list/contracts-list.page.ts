import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContractService, UserService, AuthService } from '../../../../../../services';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.page.html',
  styleUrls: ['./contracts-list.page.scss'],
})
export class ContractsListPage implements OnInit {
  private _contractsList: any = [];
  searchContract: any;
  role: string;

  constructor(
    private _loadingController: LoadingController,
    private _alertController: AlertController,
    private _contractServices: ContractService,
    private _userServices: UserService,
    private _authServices: AuthService,
  ) {
    this._authServices.stateUser().then(resState => {
      resState.subscribe(res => {
        if (res) {
          this.getDataUser(res.uid);
        }
      });
    });
   }

  ngOnInit() {
    this.getAll();
  }

  async getAll(): Promise<void> {
    const loading = await this._loadingController.create();
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

  async cancel(id: string) {
    console.clear();
    console.log(id);
    let contract: any;

    const loading = await this._loadingController.create();
    await loading.present();

    await this._contractServices.getById(id).then(firebaseResponse => {
      firebaseResponse.subscribe(contractRef => {
        contract = contractRef.data();
        contract['id'] = contractRef.id;
        contract.state = 'Anulado';
      });
    }); 
    loading.dismiss();
    
    await loading.present();
    this._contractServices.update(id, contract).then(() => {
      loading.dismiss();
      this.showAlert('', 'Contrato Anulado');
    });
  }

  public async showAlert(header, message) {
    const alert = await this._alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async getDataUser(uid: string) {
    const loading = await this._loadingController.create();
    await loading.present();
    this._userServices.getById(uid).then(firebaseResponse => {
      firebaseResponse.subscribe(userRef => {
        this.role = userRef.data()['role'];
        loading.dismiss();
      }, () => {
        loading.dismiss();
      });
    });
  }

  getRole(): boolean {
    if (this.role == "Usuario") {
      return true;
    } else {
      return false;
    }
  }
}
