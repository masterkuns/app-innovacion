import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  role: string;

  constructor(
    private _loadingController: LoadingController,
    private alertController: AlertController,
    private _authServices: AuthService,
    private _userServices: UserService,
    private _router: Router
  ) { 
      this._authServices.stateUser().then(resState => {
        resState.subscribe(res => {
          if (res) {
            //console.log("logueado");
            //console.log(res);
            this.getDataUser(res.uid);
          } else {
            //console.log("no logueado");
          }
        });
      });
  }
  

  ngOnInit() {
  }

  async logout(){
    await this._authServices.logout();
    this._router.navigateByUrl('/', { replaceUrl: true });
  }

  async getDataUser(uid: string){
    const loading = await this._loadingController.create();
    await loading.present();
    await this._userServices.getById(uid).then(firebaseResponse => {
      firebaseResponse.subscribe(userRef => {
        this.role = userRef.data()['role'];
      });
    });
    await loading.dismiss();
  }

   getRole(): boolean {
    if(this.role == "Usuario"){
      return true;
    } else { 
      return false;
    }
  }

}
