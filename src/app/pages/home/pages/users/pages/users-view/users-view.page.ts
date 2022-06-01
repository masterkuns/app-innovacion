import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../../../../../services'; 

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.page.html',
  styleUrls: ['./users-view.page.scss'],
})
export class UsersViewPage implements OnInit {
  id: string;
  user: any;

  constructor(
    private _ar: ActivatedRoute,
    private _loadingController: LoadingController,
    private _userServices: UserService,
  ) { 
    this.user = {};
  }

  ngOnInit() {
    this.id = this._ar.snapshot.paramMap.get("id");
    this.getById();
  }

  async getById(): Promise<void> {
    const loading = await this._loadingController.create();
    await loading.present();

    await this._userServices.getById(this.id).then(firebaseResponse => {
      firebaseResponse.subscribe(userRef => {
        this.user = userRef.data();
        this.user['id'] = userRef.id;
        console.log(this.user);
      });
    });
    await loading.dismiss();
  }
}
