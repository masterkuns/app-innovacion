import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
})
export class ContractsPage implements OnInit {
  role: string;

  constructor(
    private _loadingController: LoadingController,
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
