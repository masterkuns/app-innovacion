import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../../../../../services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  private _usersList: any = [];
  searchUser: any;

  constructor(
    private _loadingController: LoadingController,
    private _userServices: UserService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  async getAll(): Promise<void> {
    const loading = await this._loadingController.create();
    await loading.present();

    await this._userServices.getAll().then(firebaseResponse => {
      firebaseResponse.subscribe(userListRef => {
        this._usersList = userListRef.map(userRef => {
          let user = userRef.payload.doc.data();
          user['id'] = userRef.payload.doc.id;
          return user;
        });
        //console.log(this._usersList);
        this.searchUser = this._usersList;
      });
    });
    await loading.dismiss();
  }

  filter(event): void {
    const keyword = event.target.value;
    this.searchUser = this._usersList;
    if (keyword && keyword.trim() != '') {
      this.searchUser = this.searchUser.filter((user: any) => {
        return (user.username.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
      });
    }
  }
}
