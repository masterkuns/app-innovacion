import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ContractService, AuthService,UserService } from '../../../../../../services';

@Component({
  selector: 'app-contracts-view',
  templateUrl: './contracts-view.page.html',
  styleUrls: ['./contracts-view.page.scss'],
})
export class ContractsViewPage implements OnInit {
  id: string;
  contract: any;
  role: string;

  constructor(
    private _ar: ActivatedRoute,
    private _loadingController: LoadingController,
    private _contractServices: ContractService,
    private _userServices: UserService,
    private _authServices: AuthService,
    ) {
      this.contract = {};
      this._authServices.stateUser().then(resState => {
        resState.subscribe(res => {
          if (res) {
            this.getDataUser(res.uid);
          }
        });
      }); 
    }

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
